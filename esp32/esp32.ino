#include <Arduino.h>
#include "src/utils/wifi.h"
#include "src/services/speed.h"
#include "src/utils/math.h"
#include "src/utils/io.h"
#include <ReactESP.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <esp_task_wdt.h>

#define WIFI_SSID "UFSM"
#define WIFI_PASSWORD ""

#define FIREBASE_SYNC_DELAY 100
#define PPR 823.1

#define ANTICLOCKWISE_PIN 23
#define CLOCKWISE_PIN 22
#define ENCODER_PIN 15
#define VCC_3V3_PIN 2

#define ANTICLOCKWISE_CHANNEL 0
#define CLOCKWISE_CHANNEL 1

#define PWM_TIMER_BITS_RESOLUTION 13
#define PWM_FREQUENCY 60
#define MAX_PWM_VALUE 8000

using namespace reactesp;

ReactESP appReactESP;
ReactESP proReactESP;

unsigned long firebaseSyncPreviousMillis = 0;
unsigned long encoderPreviousMillis = 0;
float speed = 0;
float realSpeed = 0;
int pulses = 0;
float pwmOutput = 0;

void firebaseSync() {
	Serial.println("Synchronizing with Firebase...");
	speed = SpeedService::getSpeed();
	SpeedService::setRealSpeed(realSpeed);
}

void encoderInterrupt() {
	pulses++;
}

void calculateRealSpeed() {
	float deltaTime = (millis() - encoderPreviousMillis) / 1000.0;
	if (deltaTime > 0) {
		detachInterrupt(ENCODER_PIN);
		float pulsesPerSecond = pulses / deltaTime;
		realSpeed = 60.0 * pulsesPerSecond / PPR;
		encoderPreviousMillis = millis();
		pulses = 0;
		attachInterrupt(digitalPinToInterrupt(ENCODER_PIN), encoderInterrupt, RISING);
		Serial.println("realSpeed: " + String(realSpeed, 10));
	}
}

void adjustPwmOutput() {
	float error = abs(speed) - realSpeed;
	pwmOutput += absPower(error, 2);
	pwmOutput = lowestHighest(pwmOutput, 0, MAX_PWM_VALUE);
}

void writePwmOutput() {
	if (speed == 0) {
		pwmWrite(ANTICLOCKWISE_CHANNEL, 0, MAX_PWM_VALUE);
		pwmWrite(CLOCKWISE_CHANNEL, 0, MAX_PWM_VALUE);
	} else if (speed > 0) {
		pwmWrite(ANTICLOCKWISE_CHANNEL, 0, MAX_PWM_VALUE);
		pwmWrite(CLOCKWISE_CHANNEL, pwmOutput, MAX_PWM_VALUE);
	} else if (speed < 0) {
		pwmWrite(ANTICLOCKWISE_CHANNEL, pwmOutput, MAX_PWM_VALUE);
		pwmWrite(CLOCKWISE_CHANNEL, 0, MAX_PWM_VALUE);
	} else {
		pwmWrite(ANTICLOCKWISE_CHANNEL, 0, MAX_PWM_VALUE);
		pwmWrite(CLOCKWISE_CHANNEL, 0, MAX_PWM_VALUE);
	}
}

void pinModeInit() {
	pinMode(VCC_3V3_PIN, OUTPUT);
	pwmPinOutputSetup(ANTICLOCKWISE_CHANNEL, PWM_FREQUENCY, PWM_TIMER_BITS_RESOLUTION, ANTICLOCKWISE_PIN);
	pwmPinOutputSetup(CLOCKWISE_CHANNEL, PWM_FREQUENCY, PWM_TIMER_BITS_RESOLUTION, CLOCKWISE_PIN);
	attachInterrupt(digitalPinToInterrupt(ENCODER_PIN), encoderInterrupt, RISING);
}

void TaskAppCPU(void* arg) {
	for (;;) {
		appReactESP.tick();
	}
}

void TaskProCPU(void* arg) {
	esp_task_wdt_init(30, false);
	for (;;) {
		proReactESP.tick();
	}
}

void setup() {
	Serial.begin(9600);
	wifiConnect(WIFI_SSID, WIFI_PASSWORD);
	firebaseInit();
	pinModeInit();

	digitalWrite(VCC_3V3_PIN, HIGH);

	appReactESP.onTick(adjustPwmOutput);
	appReactESP.onTick(calculateRealSpeed);
	appReactESP.onTick(writePwmOutput);

	proReactESP.onTick(assertReady);
	proReactESP.onRepeat(FIREBASE_SYNC_DELAY, firebaseSync);

	xTaskCreatePinnedToCore(TaskAppCPU, "TaskAppCPU", 10000, NULL, 1, NULL, APP_CPU_NUM);
	xTaskCreatePinnedToCore(TaskProCPU, "TaskProCPU", 10000, NULL, 1, NULL, PRO_CPU_NUM);
}

void loop() {
}

#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define API_KEY "AIzaSyBBIdGkAtPxXs50k8Yxq7gUR3h4atct5QY"
#define DATABASE_URL "https://dc-motor-speed-control-39ad9-default-rtdb.firebaseio.com"

FirebaseData fbdo;
FirebaseAuth firebaseAuth;
FirebaseConfig firebaseConfig;
bool signupOk = false;

void signUp() {
	if (Firebase.signUp(&firebaseConfig, &firebaseAuth, "", "")) {
		Serial.println("ok");
		signupOk = true;
	} else {
		Serial.printf("%s\n", firebaseConfig.signer.signupError.message.c_str());
	}
}

bool ready() {
	return Firebase.ready() && signupOk && WiFi.status() == WL_CONNECTED;
}

void assertReady() {
	while (!ready()) {
		delay(100);
	}
}

void streamCallback(FirebaseStream data) {
	Serial.println("Stream Data...");
	Serial.println(data.streamPath());
	Serial.println(data.dataPath());
	Serial.println(data.dataType());

	float speed = data.floatData();
	Serial.println(speed);
}

void firebaseInit() {
	firebaseConfig.api_key = API_KEY;
	firebaseConfig.database_url = DATABASE_URL;
	signUp();
	firebaseConfig.token_status_callback = tokenStatusCallback;
	Firebase.begin(&firebaseConfig, &firebaseAuth);
	Firebase.reconnectWiFi(true);
}
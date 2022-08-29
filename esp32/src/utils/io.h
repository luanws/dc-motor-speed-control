void pwmPinOutputSetup(uint8_t channel, double frequency, uint8_t resolution, uint8_t pin) {
	ledcSetup(channel, frequency, resolution);
	ledcAttachPin(pin, channel);
}

void pwmWrite(uint8_t channel, uint32_t value, uint32_t valueMax = 100) {
	uint32_t duty = (8191 / valueMax) * min(value, valueMax);
	ledcWrite(channel, duty);
}
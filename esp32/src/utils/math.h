float highest(float a, float b) {
	return a > b ? a : b;
}

float lowest(float a, float b) {
	return a < b ? a : b;
}

float lowestHighest(float x, float min, float max) {
	return highest(lowest(x, max), min);
}

float absPower(float x, float power) {
	float y = pow(abs(x), power);
	y = x < 0 ? -y : y;
	return y;
}
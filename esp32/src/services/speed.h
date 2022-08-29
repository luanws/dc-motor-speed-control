#include "../utils/firebase.h"

struct SpeedService {
	static float getSpeed();
	static void setRealSpeed(float real_speed);
};

float SpeedService::getSpeed() {
	Firebase.RTDB.getFloat(&fbdo, "speed");
	return fbdo.floatData();
}

void SpeedService::setRealSpeed(float speed) {
	Firebase.RTDB.setFloat(&fbdo, "real_speed", speed);
}
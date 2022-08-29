class PID {
private:
	double pid;
	double kP, kI, kD;
	double P, I, D;
	double setPoint;
	double sample;
	double lastSample;
	double error;
	long lastProcess;

public:
	PID(double _kP, double _kI, double _kD) {
		kP = _kP;
		kI = _kI;
		kD = _kD;
	}

	void setSample(double _sample) {
		sample = _sample;
	}

	void setSetPoint(double _setPoint) {
		setPoint = _setPoint;
	}

	double process() {
		error = setPoint - sample;
		float deltaTime = (millis() - lastProcess) / 1000.0;
		lastProcess = millis();

		P = error * kP;
		I = I + (error * kI) * deltaTime;
		D = (lastSample - sample) * kD / deltaTime;
		lastSample = sample;

		pid = P + I + D;
		return pid;
	}
};
import time

from serial import Serial

serial = Serial('COM3', 9600, timeout=0)

while True:
    try:
        line = serial.readline()
        if line:
            print(line)
        time.sleep(1)
    except serial.SerialTimeoutException:
        print('Data could not be read')
        time.sleep(1)

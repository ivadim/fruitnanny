#!/usr/bin/python

import time
import adafruit_dht
import board
from pushbullet import Pushbullet
import configparser

# parsing configuration file
config = configparser.RawConfigParser()
config.read('/opt/fruitnanny/bin/configuration')

# set up temperature sensor
dhtDevice = adafruit_dht.DHT22(board.D24)

#set up identification and other variables
pb = Pushbullet(config.get('NOTIFICATION','Pushbullet_API_Key'))
monitor_url = config.get('NOTIFICATION','url')
frequence_notification = 1200
temp_min = float(config.get('TEMPERATURE','temp_min'))
temp_max = float(config.get('TEMPERATURE','temp_max'))

#print(temp_min)
#print(temp_max)


while True:
	try:
		# Print the values to the serial port
		temperature_c = dhtDevice.temperature
		message = ("Rpi-Nanny : {}°C !".format(temperature_c))
		print(message)
		if temperature_c > temp_max or temperature_c < temp_min :
			#push = pb.push_note("Rpi-Nanny", message)
			push = pb.push_link(message, monitor_url)
			time.sleep(frequence_notification)
	except RuntimeError as error:
		# Errors happen fairly often, DHT's are hard to read, just keep going
		print(error.args[0])

	time.sleep(5.0)

#print(message)
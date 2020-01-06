#!/usr/bin/python

import time
import board
import digitalio
from pushbullet import Pushbullet
import configparser

# parsing configuration file
config = configparser.RawConfigParser()
config.read('/opt/fruitnanny/bin/configuration')

# set up motion sensor
pir_sensor = digitalio.DigitalInOut(board.D23)
pir_sensor.direction = digitalio.Direction.INPUT

#set up identification and other variables
pb = Pushbullet(config.get('NOTIFICATION','Pushbullet_API_Key'))
monitor_url = config.get('NOTIFICATION','url')
frequence_notification = 1200

while True:
	try:
		message = ("Rpi-Nanny : Motion detected!")
		print(pir_sensor.value)
		if pir_sensor.value:
			print("Motion detected")
			push = pb.push_link(message, monitor_url)
			time.sleep(frequence_notification)
		time.sleep(1)
	except RuntimeError as error:
		# Errors happen fairly often, DHT's are hard to read, just keep going
		print(error.args[0])

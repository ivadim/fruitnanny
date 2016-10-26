#!/bin/bash
light_pin=2
gpio -g mode $light_pin out

function on {
	gpio -g write $light_pin 1
}

function off {
        gpio -g write $light_pin 0
}

function status {
	gpio -g read $light_pin
}

case $1 in  
  on) on ;; 
  off) off ;; 
  status) status ;; 
esac

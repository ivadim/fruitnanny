#!/bin/bash
light_pin=2
current=`gpio -g read $light_pin`
if [ "$current" = "1" ]; then
        new_value=0
else
        new_value=1
fi
gpio -g write $light_pin $new_value

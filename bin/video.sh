#!/bin/bash
gst-launch-1.0 -v rpicamsrc name=src preview=0 exposure-mode=night fullscreen=0 bitrate=1000000 annotation-mode=time+date annotation-text-size=20 ! video/x-h264,width=960,height=540,framerate=12/1,profile=constrained-baseline ! queue max-size-bytes=0 max-size-buffers=0 ! h264parse ! rtph264pay config-interval=1 pt=96 ! queue ! udpsink host=127.0.0.1 port=5004  sync=false

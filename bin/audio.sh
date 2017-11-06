#!/bin/bash
gst-launch-1.0 -v alsasrc device=hw:1 ! audioconvert ! audioresample ! opusenc ! rtpopuspay ! queue max-size-bytes=0 max-size-buffers=0 ! udpsink host=127.0.0.1 port=5002

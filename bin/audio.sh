#!/bin/bash
pulseaudio -k
pulseaudio -D
gst-launch-1.0 -v pulsesrc device=alsa_input.usb-C-Media_Electronics_Inc._USB_PnP_Sound_Device-00-Device.analog-mono.echo-cancel volume=0.01 ! audioconvert ! audioresample ! opusenc ! rtpopuspay ! queue max-size-bytes=0 max-size-buffers=0 ! udpsink host=127.0.0.1 port=5002

pulseaudio -D -v --log-target=stderr
pactl load-module module-alsa-source device=hw:1
pactl load-module module-echo-cancel source_name=microphone aec_method=webrtc 'aec_args="analog_gain_control=0 digital_gain_control=0"'
gst-launch-1.0 -v pulsesrc device=microphone ! audioconvert ! audioresample ! opusenc ! rtpopuspay ! queue max-size-bytes=0 max-size-buffers=0 ! udpsink host=127.0.0.1 port=5002


#!/bin/bash

/etc/init.d/dbus start
/etc/init.d/avahi-daemon start

/usr/bin/janus -o

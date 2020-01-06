#!/usr/bin/env sh

# Copyright (c) 2016, Andrey Arapov
#
# Permission to use, copy, modify, and/or distribute this software for any
# purpose with or without fee is hereby granted, provided that the above
# copyright notice and this permission notice appear in all copies.
#
# THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
# WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
# MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
# ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
# WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
# ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
# OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
#
# Dirty workaround until this is fixed:
# Device permissions are broken in 18.02 and 17.12.1 Docker ...
# https://github.com/docker/for-linux/issues/228#issuecomment-370545814
chgrp audio -- /dev/snd/*

# So that dbus-daemon can create /var/run/dbus/system_bus_socket
mkdir /var/run/dbus
dbus-daemon --system --fork

# Avahi-daemon is needed by the PulseAudio's module-zeroconf-publish.
# PulseAudio will talk to the Avahi via the Dbus.
sleep 1
avahi-daemon -D

sleep 1
exec su pi -c "/audio_stream.sh"

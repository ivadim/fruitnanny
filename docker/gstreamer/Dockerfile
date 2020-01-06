FROM balenalib/raspberry-pi:buster

RUN echo 'APT::Install-Recommends "false";' >/etc/apt/apt.conf.d/00recommends \
    && echo 'APT::Install-Suggests "false";' >>/etc/apt/apt.conf.d/00recommends \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
    gstreamer1.0-tools gstreamer1.0-plugins-good gstreamer1.0-plugins-bad \
    gstreamer1.0-plugins-ugly gstreamer1.0-alsa gstreamer1.0-pulseaudio libdc1394-22 libdc1394-utils \
    build-essential meson debhelper autoconf automake libtool pkg-config \
    autotools-dev libudev-dev libdc1394-22-dev libraspberrypi-dev \
    libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev git pulseaudio \
    libltdl-dev libcap-dev libsndfile1-dev libdbus-1-dev libspeexdsp-dev \
    libasound2-dev libavahi-client-dev avahi-daemon \
    && git clone https://github.com/thaytan/gst-rpicamsrc /tmp/gst-rpicamsrc \
    && cd /tmp/gst-rpicamsrc \
    && git checkout 4ee114fbbf35d85169603aa37678642e9774152a \
    && ./autogen.sh --prefix=/usr --libdir=/usr/lib/arm-linux-gnueabihf/ \
    && make \
    && make install \
    && apt-get purge --auto-remove -y build-essential meson debhelper autoconf \
    automake libtool autotools-dev libudev-dev libdc1394-22-dev \
    libraspberrypi-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

RUN useradd -rm -d /home/pi -s /bin/bash -g users -G adm,dialout,sudo,audio,video,plugdev,input,netdev -u 1000 pi
COPY docker/gstreamer/audio_entry.sh /
COPY docker/gstreamer/audio_stream.sh /

FROM resin/rpi-raspbian

RUN echo 'APT::Install-Recommends "false";' >/etc/apt/apt.conf.d/00recommends \
    && echo 'APT::Install-Suggests "false";' >>/etc/apt/apt.conf.d/00recommends \
    && apt-get update \
    && apt-get install -y --no-install-recommends libudev-dev libdc1394-22-dev libdc1394-22 libdc1394-utils make libraspberrypi-dev autoconf automake libtool pkg-config \
        libtool automake autoconf git gstreamer1.0-tools gstreamer1.0-plugins-good gstreamer1.0-plugins-bad \ 
        gstreamer1.0-plugins-ugly gstreamer1.0-plugins-bad libgstreamer1.0-dev \
        libgstreamer-plugins-base1.0-dev gstreamer1.0-alsa \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/thaytan/gst-rpicamsrc /tmp/gst-rpicamsrc \
    && cd /tmp/gst-rpicamsrc \
    &&  ./autogen.sh --prefix=/usr --libdir=/usr/lib/arm-linux-gnueabihf/ \
    && make \
    && make install && \
    && rm -rf /tmp/gst-rpicamsrc


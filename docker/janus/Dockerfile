FROM resin/rpi-raspbian:stretch

RUN echo 'APT::Install-Recommends "false";' >/etc/apt/apt.conf.d/00recommends \
    && echo 'APT::Install-Suggests "false";' >>/etc/apt/apt.conf.d/00recommends \
    && apt-get update \
    && apt-get install --no-install-recommends wget make libraspberrypi-dev autoconf automake libtool pkg-config \
        git python3 libpcre3 libpcre3-dev libffi-dev libmount-dev libmicrohttpd-dev libjansson-dev \
        libssl-dev libsrtp-dev libsofia-sip-ua-dev \
        libopus-dev libogg-dev gengetopt gtk-doc-tools gcc-6 gettext \
    && update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-6 50 \
    \
    && git clone https://gitlab.gnome.org/GNOME/glib /tmp/glib \ 
    && cd /tmp/glib \
    && git checkout 2.59.0 \
    && ./autogen.sh --prefix=/usr --with-pcre=system --disable-gtk-doc \
    && make && make install \
    \
    && git clone https://gitlab.freedesktop.org/libnice/libnice /tmp/libnice \ 
    && cd /tmp/libnice \
    && git checkout 0.1.15 \
    && sed -i -e 's/NICE_ADD_FLAG(\[-Wcast-align\])/# NICE_ADD_FLAG(\[-Wcast-align\])/g' ./configure.ac \
    && sed -i -e 's/NICE_ADD_FLAG(\[-Wno-cast-function-type\])/# NICE_ADD_FLAG(\[-Wno-cast-function-type\])/g' ./configure.ac \
    && git diff \
    && ./autogen.sh --prefix=/usr --disable-gtk-doc \
    && make && make install \
    \
    && wget https://github.com/cisco/libsrtp/archive/v2.0.0.tar.gz -P /tmp/libsrtp \
    && cd /tmp/libsrtp \
    && tar xfv v2.0.0.tar.gz \
    && cd libsrtp-2.0.0 \
    && ./configure --prefix=/usr --enable-openssl \
    && make shared_library && sudo make install \
    \
    && git clone https://github.com/meetecho/janus-gateway /tmp/janus-gateway \
    && cd /tmp/janus-gateway \
    && git checkout v0.5.0 \
    && ./autogen.sh \
    && ./configure --disable-websockets --disable-data-channels --disable-rabbitmq --disable-mqtt \
    && make && make install \
    \
    && apt-get remove --purge pkg-config gcc-6 gettext gengetopt gtk-doc-tools wget make libraspberrypi-dev autoconf automake libtool pkg-config git python python3 wget \
    && apt-get clean \
    && apt-get autoremove \
    && cd / \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/janus-gateway \
    && rm -rf /tmp/libnice \
    && rm -rf /tmp/libsrtp \
    && rm -rf /opt/vc \
    && rm -rf /tmp/glib \
    && rm -rf /var/log/*.log
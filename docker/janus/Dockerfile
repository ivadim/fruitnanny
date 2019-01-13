FROM resin/rpi-raspbian:stretch

RUN buildDeps="gcc autoconf automake libtool pkg-config git gtk-doc-tools gettext python3 gengetopt" \
    && echo 'APT::Install-Recommends "false";' >/etc/apt/apt.conf.d/00recommends \
    && echo 'APT::Install-Suggests "false";' >>/etc/apt/apt.conf.d/00recommends \
    && apt-get update \
    && apt-get install --no-install-recommends make libraspberrypi-dev \
        libpcre3 libpcre3-dev libffi-dev libmount-dev libmicrohttpd-dev libjansson-dev \
        libssl-dev libsrtp-dev libsofia-sip-ua-dev \
        libopus-dev libogg-dev libglib2.0-dev libgio2.0-cil-dev $buildDeps \
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
    && git clone https://github.com/cisco/libsrtp /tmp/libsrtp \
    && cd /tmp/libsrtp \
    && git checkout v2.2.0 \
    && ./configure --prefix=/usr --enable-openssl \
    && make shared_library && sudo make install \
    \
    && git clone https://github.com/meetecho/janus-gateway /tmp/janus-gateway \
    && cd /tmp/janus-gateway \
    && git checkout v0.5.0 \
    && ./autogen.sh \
    && ./configure --disable-websockets --disable-data-channels --disable-rabbitmq --disable-mqtt \
    && make && make install \
    && apt-get purge -y $buildDeps \
	&& apt-get clean \
    && rm -rf /tmp/* \
    && rm -rf /var/lib/apt/lists/*
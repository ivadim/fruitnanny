FROM balenalib/raspberry-pi:buster

RUN buildDeps="build-essential git debhelper gobject-introspection gtk-doc-tools libgirepository1.0-dev libglib2.0-dev libgnutls28-dev libgstreamer1.0-dev libgupnp-igd-1.0-dev autotools-dev dh-autoreconf dh-systemd gengetopt libavcodec-dev libavformat-dev libavutil-dev libconfig-dev libcurl4-openssl-dev libcurl4-openssl-dev libjansson-dev liblua5.3-dev libmicrohttpd-dev libnanomsg-dev libogg-dev libopus-dev librabbitmq-dev libre-dev libsofia-sip-ua-dev libsrtp2-dev libssl-dev libsystemd-dev libusrsctp-dev libwebsockets-dev pkg-config rename fakeroot gir1.2-glib-2.0 libgirepository-1.0-1 pandoc brotli doxygen graphviz node-rollup-plugin-replace pigz rollup uglifyjs node-terser uglifyjs.terser" \
    && runDeps="avahi-daemon libnss-mdns" \
    && echo 'APT::Install-Recommends "false";' >/etc/apt/apt.conf.d/00recommends \
    && echo 'APT::Install-Suggests "false";' >>/etc/apt/apt.conf.d/00recommends \
    && apt-get update \
    && apt-get install $buildDeps $runDeps \
    && git clone --depth 1 --single-branch --branch debian/0.1.16-1 https://salsa.debian.org/telepathy-team/libnice.git /tmp/libnice \
    && cd /tmp/libnice \
    && dpkg-buildpackage -b --no-sign -rfakeroot \
    && dpkg -i ../libnice10_0.1.16-1_armhf.deb ../gir1.2-nice-0.1_0.1.16-1_armhf.deb ../libnice-dev_0.1.16-1_armhf.deb \
    && git clone --depth 1 --single-branch --branch debian/0.7.3-2 https://salsa.debian.org/pkg-voip-team/janus.git  /tmp/janus \
    && cd /tmp/janus \
    && dpkg-buildpackage -b --no-sign -rfakeroot \
    && dpkg -i ../janus_0.7.3-2_armhf.deb ../janus-tools_0.7.3-2_armhf.deb \
    && cd / \
    && apt-get --purge remove libnice-dev $buildDeps \
    && apt-get --purge autoremove \
    && apt-get clean \
    && rm -rf /tmp/* \
    && rm -rf /var/lib/apt/lists/*

COPY docker/janus/start.sh /start.sh

CMD /start.sh

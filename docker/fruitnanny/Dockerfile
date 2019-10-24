FROM balenalib/rpi-raspbian:buster

ENV NODE_VERSION 12.13.0

RUN buildDeps="curl xz-utils" \
	&& set -x \
	&& apt-get update && apt-get install -y $buildDeps --no-install-recommends \
	&& curl -SLOk "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-armv7l.tar.xz" \
	&& tar -xJf "node-v$NODE_VERSION-linux-armv7l.tar.xz" -C /usr/local --strip-components=1  \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs \
	&& apt-get purge -y --auto-remove $buildDeps \
	&& apt-get clean \
	&& rm "node-v$NODE_VERSION-linux-armv7l.tar.xz" \
    && rm -rf /tmp/* \
    && rm -rf /var/lib/apt/lists/*

RUN buildDeps="build-essential python-dev python3-dev python-setuptools python3-setuptools" \
    && echo 'APT::Install-Recommends "false";' >/etc/apt/apt.conf.d/00recommends \
    && echo 'APT::Install-Suggests "false";' >>/etc/apt/apt.conf.d/00recommends \
    && apt-get update \
    && apt-get install -y python-pip python3-pip dos2unix \
    && apt-get install -y $buildDeps \
    && pip install wheel && pip install --install-option="--force-pi2" Adafruit-DHT \
    && pip3 install wheel && pip3 install --install-option="--force-pi2" Adafruit-DHT \
    && apt-get --purge remove -y $buildDeps && apt-get --purge -y autoremove \
    && apt-get clean \
    && rm -rf /tmp/* \
    && rm -rf /var/lib/apt/lists/*

ADD . /opt/fruitnanny
WORKDIR /opt/fruitnanny

RUN dos2unix /opt/fruitnanny/bin/*

RUN npm install
CMD ["node", "server/app.js"]
EXPOSE 7000

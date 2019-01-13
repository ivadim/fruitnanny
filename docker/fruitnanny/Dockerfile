FROM resin/rpi-raspbian:stretch

ENV NODE_VERSION 10.15.0

RUN buildDeps="curl xz-utils" \
	&& set -x \
	&& apt-get update && apt-get install -y $buildDeps --no-install-recommends \
	&& curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-armv6l.tar.xz" \
	&& tar -xJf "node-v$NODE_VERSION-linux-armv6l.tar.xz" -C /usr/local --strip-components=1  \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs \
	&& apt-get purge -y --auto-remove $buildDeps \
	&& apt-get clean \
	&& rm "node-v$NODE_VERSION-linux-armv6l.tar.xz" \
    && rm -rf /tmp/* \
    && rm -rf /var/lib/apt/lists/*

RUN buildDeps="build-essential git" \
	&& apt-get update && apt-get install -y $buildDeps python-dev wiringpi dos2unix python-pip python-setuptools --no-install-recommends \
    && git clone https://github.com/adafruit/Adafruit_Python_DHT /tmp/Adafruit_Python_DHT \
    && cd /tmp/Adafruit_Python_DHT \
	&& git checkout 1.4.0 \
    && python setup.py install --force-pi2 \
	&& apt-get purge -y --auto-remove $buildDeps \
	&& apt-get clean \
    && rm -rf /tmp/* \
    && rm -rf /var/lib/apt/lists/*

ADD . /opt/fruitnanny
WORKDIR /opt/fruitnanny

RUN dos2unix /opt/fruitnanny/bin/*

RUN npm install
CMD ["node", "server/app.js"]
EXPOSE 7000
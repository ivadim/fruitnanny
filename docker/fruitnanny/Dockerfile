FROM balenalib/rpi-raspbian:buster

ENV NODE_VERSION 10.15.0

RUN echo 'APT::Install-Recommends "false";' >/etc/apt/apt.conf.d/00recommends \
    && echo 'APT::Install-Suggests "false";' >>/etc/apt/apt.conf.d/00recommends \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

RUN apt-get update \
    && apt-get install -y python-pip python3-pip \
    && pip install Adafruit-DHT \
    && pip3 install Adafruit-DHT \
    && apt-get clean \
    && rm -rf /tmp/* \
    && rm -rf /var/lib/apt/lists/*

ADD . /opt/fruitnanny
WORKDIR /opt/fruitnanny

RUN dos2unix /opt/fruitnanny/bin/*

RUN npm install
CMD ["node", "server/app.js"]
EXPOSE 7000

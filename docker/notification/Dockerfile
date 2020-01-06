FROM ivadim/fruitnanny-app

RUN apt-get update \
    && apt-get install -y libgpiod2 \
    && pip3 install adafruit-circuitpython-lis3dh \
    && pip3 install adafruit-circuitpython-dht \
    && pip3 install pushbullet.py \
    && pip3 install configparser \
    && pip3 install adafruit-blinka \
    && apt-get --purge remove -y $buildDeps && apt-get --purge -y autoremove \
    && apt-get clean \
    && rm -rf /tmp/* \
    && rm -rf /var/lib/apt/lists/*
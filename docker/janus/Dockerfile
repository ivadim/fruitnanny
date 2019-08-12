FROM balenalib/rpi-raspbian:buster

RUN buildDeps="gcc autoconf automake libtool pkg-config git gtk-doc-tools gettext python3 gengetopt" \
    && echo 'APT::Install-Recommends "false";' >/etc/apt/apt.conf.d/00recommends \
    && echo 'APT::Install-Suggests "false";' >>/etc/apt/apt.conf.d/00recommends \
    && apt-get update \
    && apt-get install janus janus-tools \
    && apt-get clean \
    && rm -rf /tmp/* \
    && rm -rf /var/lib/apt/lists/*

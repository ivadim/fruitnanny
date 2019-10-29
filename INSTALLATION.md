# Installing fruitnanny

## Generate certificates

The Docker installation expects certificates available under
`configuration/ssl`. To generate self-signed certificates suitable
for all components, run this command.

```
openssl req -x509 -sha256 -nodes -days 2650 -newkey rsa:2048 \
  -keyout configuration/ssl/fruitnanny.key -out configuration/ssl/fruitnanny.pem
```

`openssl` will prompt for some information during key generation. The only
important prompt here is "Common Name" The common name should be the hostname
for your Raspberry Pi.

## Non-Docker installation

These directions assume a recent Raspbian installation.

### janus

* Set up mDNS.
  ```
  apt-get install avahi-daemon libnss-mdns
  ```
* Install janus

  ```
  apt install janus janus-tools
  ```
* Replace the default configuration with our config:
  ```
  sudo rm /etc/janus/*
  sudo cp configuration/janus/* /etc/janus
  ```
* Edit janus configuration files
  * In `/etc/janus/janus.jcfg`, edit the `certificates` section to point to your
    SSL certificates.
  * In `/etc/janus/janus.transport.http.jcfg`, edit the `certificates` section
    to point to your SSL certificates.

# Installing fruitnanny

## Docker-based installation

### OS image
* Raspbian Buster Lite - https://downloads.raspberrypi.org/raspbian_lite_latest

### Install tools
* git and extra libs
  ```console
  sudo apt-get update
  sudo apt-get -y install git curl libffi-dev python python-pip
  ```
* docker
  ```console
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  sudo usermod -aG docker pi
  ```
* docker-compose
  ```console
  sudo apt-get -y install  docker-compose
  ```
  
### Reboot system
  ```console
  sudo shutdown -r 0
  ```
### Clone repository

```console
cd /opt
sudo mkdir fruitnanny
sudo chown pi:pi fruitnanny
git clone https://github.com/ivadim/fruitnanny
```

### Generate certificates

The Docker installation expects certificates available under
`configuration/ssl`. To generate self-signed certificates suitable
for all components, run this command.

```console
cd /opt/fruitnanny
openssl req -x509 -sha256 -nodes -days 2650 -newkey rsa:2048 \
  -keyout configuration/ssl/fruitnanny.key -out configuration/ssl/fruitnanny.pem
```

`openssl` will prompt for some information during key generation. The only
important prompt here is "Common Name" The common name should be the hostname
for your Raspberry Pi.

### Generate apache passwords
```console
cd /opt/fruitnanny
echo -n 'fruitnanny:' >> ./configuration/nginx/.htpasswd
openssl passwd -apr1 >>  ./configuration/nginx/.htpasswd
```

`openssl` will prompt for password

### Configure notification function (optional)
First, create an account on Pushbullet.com.

Then, set up your own configuration by editing the notification configuration file (available here in the fruitnanny folder: bin/configuration).

* ### Run the system **without** notifications
```console
cd /opt/fruitnanny
docker-compose up -d
```

* ### Run the system **with** notifications
```console
cd /opt/fruitnanny
docker-compose -f docker-compose.yml -f docker-compose.notification.yml up -d
```

### Check website
Access http://RASPBERRY_IP/ to see Fruitnanny interface

### Debug issues
* Run `docker-compose ps` to check if all containers are in 'UP' state
```console
            Name                          Command               State   Ports
-----------------------------------------------------------------------------
fruitnanny_fruitnanny_1        /usr/bin/entry.sh node ser ...   Up
fruitnanny_gstreamer-audio_1   /usr/bin/entry.sh gst-laun ...   Up
fruitnanny_gstreamer-video_1   /usr/bin/entry.sh gst-laun ...   Up
fruitnanny_janus_1             /usr/bin/entry.sh /bin/sh  ...   Up
fruitnanny_nginx_1             nginx -g daemon off;             Up
```

* Run `docker-compose logs` to get logs from all containers
```console
gstreamer-audio_1  | Setting pipeline to PAUSED ...
fruitnanny_1       | Fruitnanny app listening on port 7000!
gstreamer-video_1  | Setting pipeline to PAUSED ...
janus_1            | [WARN] Admin/monitor HTTPS webserver disabled
```

* Re-download new docker images for fruitnanny
```console
docker-compose stop
docker-compose rm -f
docker-compose pull   
docker-compose up -d
```

## Non-Docker installation

Please follow https://ivadim.github.io/2017-08-21-fruitnanny/

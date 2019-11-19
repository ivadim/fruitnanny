# Installing fruitnanny

## Docker-based installation

### OS image
* Raspbian Buster Lite - https://downloads.raspberrypi.org/raspbian_lite_latest

### Install tools
* git and extra libs
  ```
  sudo apt-get update
  sudo apt-get -y install git curl libffi-dev python python-pip
  ```
* docker
  ```
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  sudo usermod -aG docker pi
  ```
* docker-compose
  ```
  sudo apt-get -y install  docker-compose
  ```
  
### Reboot system
  ```
  sudo shutdown -r 0
  ```
### Clone repository

```
cd /opt
sudo mkdir fruitnanny
sudo chown pi:pi fruitnanny
git clone https://github.com/ivadim/fruitnanny
```

### Generate certificates

The Docker installation expects certificates available under
`configuration/ssl`. To generate self-signed certificates suitable
for all components, run this command.

```
cd /opt/fruitnanny
openssl req -x509 -sha256 -nodes -days 2650 -newkey rsa:2048 \
  -keyout configuration/ssl/fruitnanny.key -out configuration/ssl/fruitnanny.pem
```

`openssl` will prompt for some information during key generation. The only
important prompt here is "Common Name" The common name should be the hostname
for your Raspberry Pi.

### Generate apache passwords
```
cd /opt/fruitnanny
echo -n 'fruitnanny:' >> ./configuration/nginx/.htpasswd
openssl passwd -apr1 >>  ./configuration/nginx/.htpasswd
```

`openssl` will prompt for password

### Run the system
```
cd /opt/fruitnanny
sudo docker-compose up -d
```

## Non-Docker installation

Please follow https://ivadim.github.io/2017-08-21-fruitnanny/

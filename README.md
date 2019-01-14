[![Build Status](https://dev.azure.com/fruitnanny/Build/_apis/build/status/fruitnanny?branchName=master)](https://dev.azure.com/fruitnanny/Build/_build/latest?definitionId=1?branchName=master)


![main](public/project/img/fn2.jpg)


# Overview

**Fruitnanny** is a code name for a DIY *geek* baby monitor. 
It uses RaspberryPi, a NoIR camera module, infrared lights, temperature and humidity sensors, and a custom Web UI. 
Chrome and Firefox with native WebRTC are used as clients. 
Right now it means support of all major platforms like Windows, Linux, Android, MacOS and iOS soon.

This repository contains NodeJS application and configurations files.

![video](public/project/img/video-mobile.gif)

# How to setup instruction

https://ivadim.github.io/2017-08-21-fruitnanny/

# Configuration

Modify [fruitnanny_config](./fruitnanny_config.js) to configure the baby monitor.

Params:
* `baby_name` - baby's name to display in UI
* `baby_birthday` - baby's birthday
* `temp_unit` - temperature to display in Celsius (`C`) or Fahrenheit(`F`)

> Restart the system after change

To update baby's picture you need to replace file `public\project\img\baby.png`.

# How to build and run locally

* Install nodejs
* Run `npm install`
* Run `npm run grunt`
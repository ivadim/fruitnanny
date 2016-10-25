var VideoPlayer = (function () {
    'use strict';

    var streamContext = null,
        lightController = null,
        videoContainer = null,
        video = null,
        videoControls = null,
        volume_slider = null,
        playpause = null,
        light = null,
        mute = null,
        fullscreen = null


    var init = function() {
        streamContext = StreamContext;
        lightController = IRLightController;
        videoContainer = document.getElementById('videoContainer');
        video = document.getElementById('video');
        videoControls = document.getElementById('video-controls');
        volume_slider = $('#volume_slider').slider({
                            handle: "custom",
                            min: 0,
                            max: 2,
                            step: 0.1,
                            value:1,
                            formatter: function(value) {
                                return 'Current value: ' + value;
                            }
                        });
        playpause = document.getElementById('playpause');
        light = document.getElementById('light');
        mute = document.getElementById('mute');
        fullscreen = document.getElementById('fs');

        setupButtons();
        setupFullScreen();
        lightController.status(function(state) {
            light.dataset.state = state;
        });
        video.controls = false;
        videoControls.setAttribute('data-state', 'visible');
    }

    var setupButtons = function() {
        playpause.addEventListener('click', function(e) {
            var state = streamContext.pause_stream();
            if (state === false) {
                playpause.querySelector("i").className = "fa fa-pause";
            } else {
                playpause.querySelector("i").className = "fa fa-play";
            }
        });

        light.addEventListener('click', function(e) {
            lightController.status(function(state) {
                if (state === 'on') {
                    lightController.turnoff();
                    light.dataset.state = 'off';
                } else {
                    lightController.turnon();
                    light.dataset.state = 'on';
                }
            })
        });

        mute.addEventListener('click', function(e) {
            streamContext.mute()
        });

        volume_slider.on('change', function(e){
            streamContext.set_volume(e.value.newValue);
        });

        fs.addEventListener('click', function(e) {
            handleFullscreen();
        });

        streamContext.onmute(function(){
            mute.querySelector("i").className = "fa fa-volume-off";
            volume_slider.attr('data-value', 0);
            volume_slider.attr('value', 0);
            $('#volume_slider').slider('setValue', 0);
        });
        streamContext.onunmute(function(value){
            mute.querySelector("i").className = "fa fa-volume-up";
            if (value !== undefined) {
                volume_slider.attr('data-value', value);
                volume_slider.attr('value', value);
                $('#volume_slider').slider('setValue', value);
            }
            
        });
    }

    var setupFullScreen = function() {
        // Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself)
        document.addEventListener('fullscreenchange', function(e) {
            setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
        });
        document.addEventListener('webkitfullscreenchange', function() {
            setFullscreenData(!!document.webkitIsFullScreen);
        });
        document.addEventListener('mozfullscreenchange', function() {
            setFullscreenData(!!document.mozFullScreen);
        });
        document.addEventListener('msfullscreenchange', function() {
            setFullscreenData(!!document.msFullscreenElement);
        });
    }
	

    // Set the video container's fullscreen state
    var setFullscreenData = function(state) {
        videoContainer.setAttribute('data-fullscreen', !!state);
        // Set the fullscreen button's 'data-state' which allows the correct button image to be set via CSS
        fullscreen.setAttribute('data-state', !!state ? 'cancel-fullscreen' : 'go-fullscreen');
    }

    // Checks if the document is currently in fullscreen mode
    var isFullScreen = function() {
        return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    }

    // Fullscreen
    var handleFullscreen = function() {
        // If fullscreen mode is active...	
        if (isFullScreen()) {
            // ...exit fullscreen mode
            // (Note: this can only be called on document)
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
            setFullscreenData(false);
        }
        else {
            if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
            else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
            else if (videoContainer.webkitRequestFullScreen) {

                video.webkitRequestFullScreen();
            }
            else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
            setFullscreenData(true);
        }
    }
    return {
        init: init,
    }
}());
var StreamContext = (function() {
    'use strict';
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
    var video = document.getElementById('video');

    var MAX_VOLUME_VALUE = '3';
    var VOLUME_STEP = 0.1;
    var audioContext = new AudioContext();
    var source = null;
    var current_stream = null;
    var analyser = null;
    var gain = null;
    var saved_audio_value = 1;
    var initialized = false;
    var destination = null;

    // callbacks
    var mutecallback = null;
    var unmutecallback = null;

    var init = function(stream) {
        current_stream = stream;
        if (source === null) {
            source = audioContext.createMediaStreamSource(stream);
        }
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 4096

        gain = audioContext.createGain();
        gain.gain.value = 1;
        
        source.connect(analyser);
        analyser.connect(gain)
        
        gain.connect(audioContext.destination);
        initialized = true;
    }
    
    var audioByteFrequencyData = function() {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var average = _averageFrequencyData(array);
        return {full: array, average: average};
    }

    var _averageFrequencyData = function(array) {
        var values = 0;
        var average;
 
        var length = array.length;
 
        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }
 
        average = values / length;
        return Math.floor(average);
    }

    var pause_stream = function() {
        if (!initialized) return;
        resume_audiostream();
        var new_state = !current_stream.getVideoTracks()[0].enabled
        current_stream.getVideoTracks()[0].enabled = new_state;
        var value = current_audio_value()
        if (new_state === true && value === 0) {
            gain.gain.value = saved_audio_value;
            if (unmutecallback !== null) {
                unmutecallback(current_audio_value())
            }
        } else if (new_state === false && value !== 0) {
            saved_audio_value = current_audio_value();
            gain.gain.value = 0;
            if (mutecallback !== null) {
                mutecallback()
            }
        }
        return new_state;
    }

    var set_volume = function(new_value){
        console.log("set_volume");
        if (!initialized) return;
        resume_audiostream();
        var old_value = current_audio_value();
        gain.gain.value = new_value;
        if (new_value === 0 && old_value !== 0 && mutecallback !== null) {
            mutecallback();
        } else if (new_value !== 0 && old_value === 0 && unmutecallback !== null) {
            unmutecallback();
        }
        console.log(current_audio_value())
    }

    var mute = function() {
        if (!initialized) return;
        resume_audiostream();
        if (current_audio_value() == 0) {
            gain.gain.value = saved_audio_value;
            if (unmutecallback !== null) {
                unmutecallback(current_audio_value())
            }
        } else {
            saved_audio_value = current_audio_value();
            gain.gain.value = 0;
            if (mutecallback !== null) {
                mutecallback()
            }
        }
        return current_audio_value();
    }

    var onmute = function(callback) {
        mutecallback = callback;
    }
    var onunmute = function(callback) {
        unmutecallback = callback;
    }

    var current_audio_value = function() {
        return parseFloat(gain.gain.value.toFixed(1))
    }

    var resume_audiostream = function() {
        if (audioContext.state === "suspended") {
            console.log("Current context was suspened. Enable it");
            audioContext.resume();
        }
    }

    return {
        init: init,
        set_volume: set_volume,
        mute: mute,
        onmute: onmute,
        onunmute: onunmute,
        pause_stream: pause_stream,
        audioByteFrequencyData: audioByteFrequencyData,
    }

}())
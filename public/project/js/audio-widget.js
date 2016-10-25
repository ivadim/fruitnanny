/**
 * An audio spectrum visualizer built with HTML5 Audio API
 * Author:Wayou
 * License:feel free to use but keep refer pls!
 * Feb 15, 2014
 * For more infomation or support you can :
 * view the project page:https://github.com/Wayou/HTML5_Audio_Visualizer/
 * view online demo:http://wayou.github.io/HTML5_Audio_Visualizer/
 */

var AudioSpectrumWidget = (function(){

    var canvas = document.getElementById('audiolevel'),
        fsaudiolevel = $('#fs-audiolevel'),
        cwidth = canvas.width,
        cheight = canvas.height - 2,
        meterWidth = 10, //width of the meters in the spectrum
        gap = 2, //gap between meters
        capHeight = 2,
        capStyle = '#fff',
        meterNum = 800 / (10 + 2), //count of the meters
        capYPositionArray = [], ////store the vertical position of hte caps for the preivous frame
        animationId = null,
        status = 0; //flag for sound is playing 1 or stopped 0
        allCapsReachBottom = false; 
    ctx = canvas.getContext('2d'),
    gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(1, '#0f0');
    gradient.addColorStop(0.5, '#ff0');
    gradient.addColorStop(0, '#f00');

    var updateAudioLevelText = function(data) {
        fsaudiolevel.html("<p>"+data.average+"</p>");
    }
    var drawMeter = function() {
        data = StreamContext.audioByteFrequencyData();
        var array = data.full;

        updateAudioLevelText(data);
        if (status === 0) {
            //fix when some sounds end the value still not back to zero
            for (var i = array.length - 1; i >= 0; i--) {
                array[i] = 0;
            };
            allCapsReachBottom = true;
            for (var i = capYPositionArray.length - 1; i >= 0; i--) {
                allCapsReachBottom = allCapsReachBottom && (capYPositionArray[i] === 0);
            };
            if (allCapsReachBottom) {
                cancelAnimationFrame(animationId); //since the sound is stoped and animation finished, stop the requestAnimation to prevent potential memory leak,THIS IS VERY IMPORTANT!
                return;
            };
        };
        var step = Math.round(array.length / meterNum); //sample limited data from the total array
        ctx.clearRect(0, 0, cwidth, cheight);
        for (var i = 0; i < meterNum; i++) {
            var value = array[i * step];
            if (capYPositionArray.length < Math.round(meterNum)) {
                capYPositionArray.push(value);
            };
            ctx.fillStyle = capStyle;
            //draw the cap, with transition effect
            if (value < capYPositionArray[i]) {
                ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
            } else {
                ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                capYPositionArray[i] = value;
            };
            ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
            ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
        }
        animationId = requestAnimationFrame(drawMeter);
    }

    var enable = function() {
        status = 1;
        animationId = requestAnimationFrame(drawMeter);
    }

    var disable = function() {
        status = 0;
        animationId = requestAnimationFrame(drawMeter);
    }

    return {
        enable: enable,
        disable: disable,
    }
}());

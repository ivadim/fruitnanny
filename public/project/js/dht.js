var DHT = (function ($) {

  'use strict';
  var temperature_widget = null;
  var temperature_textbox = null;
  var humidity_widget = null;
  var humidity_textbox = null;
  var init = function(){
    temperature_widget = new JustGage({
                            id: "temperature",
                            value: 0,
                            min: 10,
                            max: 30,
                            label: "* C",
                            title: "Temperature",
                            relativeGaugeSize: true,
                            gaugeWidthScale: 0.8,
                            customSectors : [{"lo":10,"hi":18,"color":"#0000ff"},
                                          {"lo":19,"hi":24,"color":"#00ff00"},
                                          {"lo":25,"hi":30,"color":"#ff0000"}],
                            levelColorsGradient: false
                         });

    temperature_textbox = $("#fs-temperature");

    humidity_widget = new JustGage({
                            id: "humidity",
                            value: 0,
                            min: 0,
                            max: 100,
                            label: "%",
                            title: "Humidity",
                            relativeGaugeSize: true,
                            gaugeWidthScale: 0.8,
                            customSectors : [{"lo":0,"hi":39,"color":"#ff0000"},
                                          {"lo":40,"hi":60,"color":"#00ff00"},
                                          {"lo":61,"hi":100,"color":"#ff0000"}],
                            levelColorsGradient: false
                          });

    humidity_textbox = $("#fs-humidity");

    update_values();
    setInterval(function() {
        update_values()
    }, 2 * 60 * 1000)
  }

  var update_values = function() {
    $.get("/api/dht/current").
    done(function(data) {
        var t = Math.round(data.temperature);
        var h = Math.round(data.humidity);
        temperature_widget.refresh(t);
        temperature_textbox.html(t + "&deg; С")
        humidity_widget.refresh(h);
        humidity_textbox.text(h + "%");
    }).fail(function(err) {
        console.log( "error: " + err );
    })
  }
  
  return {
    init: init,
  }


})(jQuery);

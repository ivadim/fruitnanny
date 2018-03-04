var DHT = (function ($) {

  'use strict';
  var temperature_widget = null;
  var temperature_textbox = null;
  var humidity_widget = null;
  var humidity_textbox = null;
  var temp_unit = config.temp_unit

  var temp_in_unit = function(temp_unit, t) {
    if (temp_unit.toUpperCase() === "F") {
      var f = Math.round(t*(9/5)+32)
      //console.log("Converted " + t + "* C to " + f + "* F");
      return f;
    } else {
      return t;
    }
    
  }
  
  var init = function(){
    temperature_widget = new JustGage({
                            id: "temperature",
                            value: 0,
                            min: temp_in_unit(temp_unit, 10),
                            max: temp_in_unit(temp_unit, 30),
                            label: "* " + temp_unit,
                            title: "Temperature",
                            relativeGaugeSize: true,
                            gaugeWidthScale: 0.8,
                            customSectors : [{"lo":temp_in_unit(temp_unit, 10),"hi":temp_in_unit(temp_unit, 18),"color":"#0000ff"},
                                          {"lo":temp_in_unit(temp_unit, 19),"hi":temp_in_unit(temp_unit, 24),"color":"#00ff00"},
                                          {"lo":temp_in_unit(temp_unit, 25),"hi":temp_in_unit(temp_unit, 30),"color":"#ff0000"}],
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

    update_values(temp_unit);
    setInterval(function() {
        update_values(temp_unit)
    }, 2 * 60 * 1000)
  }

  var update_values = function(temp_unit) {
    $.get("/api/dht/current").
    done(function(data) {
        var t = Math.round(data.temperature);
        t = temp_in_unit(temp_unit, t)
        var h = Math.round(data.humidity);
        temperature_widget.refresh(t);
        temperature_textbox.html(t + "&deg; " + temp_unit)
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

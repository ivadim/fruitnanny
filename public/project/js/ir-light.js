var IRLightController = (function () {
    'use strict';

    var status = function(callback) {
        $.get("/api/light/status").
        done(function(data) {
            callback(data);
        }).fail(function(err) {
            console.log( "error: " + err );
        })
    }

    var turnoff = function() {
        $.get("/api/light/off")
    }

    var turnon = function() {
        $.get("/api/light/on")
    }
    return {
        status: status,
        turnoff: turnoff,
        turnon: turnon
    }
}());



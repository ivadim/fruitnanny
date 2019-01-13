
//var server = "https://192.168.1.50:8089/janus";
var server = "/janus";

var janus = null;
var streaming = null;
var started = false;
var selectedStream = null;

var target = document.getElementById('spinner');
spinner = new Spinner().spin(target);
var streamContext = StreamContext;
var audioSpectrumWidget = AudioSpectrumWidget;

$(document).ready(function() {
	// Initialize the library (all console debuggers enabled)
	Janus.init({debug: "all", callback: function() {
			// Make sure the browser supports WebRTC
		if(!Janus.isWebrtcSupported()) {
			bootbox.alert("No WebRTC support... ");
			return;
		}
		
		// Create session
		janus = new Janus(
			{
				server: server,
				success: function() {
					// Attach to streaming plugin
					
					janus.attach(
						{
							plugin: "janus.plugin.streaming",
							success: function(pluginHandle) {
								streaming = pluginHandle;
								Janus.log("Plugin attached! (" + streaming.getPlugin() + ", id=" + streaming.getId() + ")");
								loadStream();
							},
							error: function(error) {
								if(spinner !== null && spinner !== undefined)
									spinner.stop();
								Janus.error("  -- Error attaching plugin... ", error);
								bootbox.alert("Error attaching plugin... " + error);
							},
							onmessage: function(msg, jsep) {
								Janus.debug(" ::: Got a message :::");
								Janus.debug(JSON.stringify(msg));
								var result = msg["result"];
								if(result !== null && result !== undefined) {
									if(result["status"] !== undefined && result["status"] !== null) {
										var status = result["status"];
										if(status === 'starting')
											$('#status').removeClass('hide').text("Starting, please wait...").show();
										else if(status === 'started')
											$('#status').removeClass('hide').text("Started").show();
										else if(status === 'stopped')
											stopStream();
									}
								} else if(msg["error"] !== undefined && msg["error"] !== null) {
									bootbox.alert(msg["error"]);
									stopStream();
									return;
								}
								if(jsep !== undefined && jsep !== null) {
									Janus.debug("Handling SDP as well...");
									Janus.debug(jsep);
									// Answer
									streaming.createAnswer(
										{
											jsep: jsep,
											media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
											success: function(jsep) {
												Janus.debug("Got SDP!");
												Janus.debug(jsep);
												var body = { "request": "start" };
												streaming.send({"message": body, "jsep": jsep});
											},
											error: function(error) {
												if(spinner !== null && spinner !== undefined)
													spinner.stop();
												Janus.error("WebRTC error:", error);
												bootbox.alert("WebRTC error... " + JSON.stringify(error));
											}
										});
								}
							},
							onremotestream: function(stream) {
								Janus.debug(" ::: Got a remote stream :::");
								Janus.debug(JSON.stringify(stream));
								
								$("#video").bind("playing", function () {
									if(spinner !== null && spinner !== undefined)
										spinner.stop();
									spinner = null;
								});
								
								Janus.attachMediaStream($('#video').get(0), stream);
								streamContext.init(stream);
								audioSpectrumWidget.enable();
								
							},
							oncleanup: function() {
								Janus.log(" ::: Got a cleanup notification :::");
							}
						});
				},
				error: function(error) {
					if(spinner !== null && spinner !== undefined)
					  spinner.stop();
					Janus.error(error);
					bootbox.alert(error, function() {
						//window.location.reload();
					});
				},
				destroyed: function() {
					if(spinner !== null && spinner !== undefined)
					  spinner.stop();
					//window.location.reload();
				}
			});
	}});
});

function loadStream() {
	var body = { "request": "list" };
	Janus.debug("Sending message (" + JSON.stringify(body) + ")");
	streaming.send({"message": body, success: function(result) {
		if(result === null || result === undefined) {
			bootbox.alert("Got no response to our query for available streams");
			return;
		}
		if(result["list"] !== undefined && result["list"] !== null) {
			var list = result["list"];			
			Janus.log("Got a list of available streams");
			Janus.debug(list);
			selectedStream = list[0]["id"]
		}
		startStream();
	}});
}

function startStream() {
	Janus.log("Selected video id #" + selectedStream);
	if(selectedStream === undefined || selectedStream === null) {
		bootbox.alert("Select a stream from the list");
		return;
	}
	var body = { "request": "watch", id: parseInt(selectedStream) };
	streaming.send({"message": body});
}

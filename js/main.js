var videoElement = document.querySelector("#yourcam"),
    videoSelect  = document.querySelector("#videoSource");

navigator.getUserMedia = navigator.getUserMedia ||
navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

window.URL = window.URL || window.webkitURL;

function gotSources(sourceInfos) {
  for (var i = 0; i !== sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    var option = document.createElement("option");
    option.value = sourceInfo.id;
    if (sourceInfo.kind === "video") {
      option.text = sourceInfo.label || "camera " + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log("Some other kind of source: ", sourceInfo);
    }
  }
}

if (typeof MediaStreamTrack === "undefined" ||
    typeof MediaStreamTrack.getSources === "undefined") {
  alert("This browser does not support MediaStreamTrack.\n\nTry Chrome.");
} else {
  MediaStreamTrack.getSources(gotSources);
}

function successCallback(stream) {
  window.stream = stream; // make stream available to console
  videoElement.src = window.URL.createObjectURL(stream);
  videoElement.play();
}

function errorCallback(error) {
  console.log("navigator.getUserMedia error: ", error);
}

function start() {
  if (!!window.stream) {
    videoElement.src = null;
    window.stream.stop();
  }
  var videoSource = videoSelect.value;
  var constraints = {
    video: {
      optional: [{
        sourceId: videoSource
      }]
    }
  };
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

videoSelect.onchange = start;
start();

$(document).ready(function () {
  $(window).on("load resize", function() {
    if ( $(window).width() <= 800 ) {
      $("#splitContainer").jqxSplitter({
        height: "auto",
        width: "100%",
        orientation: "horizontal",
        showSplitBar: true,
        panels: [{ size: "50%",collapsible:false },
                 { size: "50%" }]
      });
      $("#leftSplitter").jqxSplitter({
        height: "100%",
        width: "100%",
        orientation: "vertical",
        showSplitBar: true,
        panels: [{ size: "50%",collapsible:false },
                 { size: "50%"}]
      });
      $("#rightSplitter").jqxSplitter({
        height: "100%",
        width: "100%",
        orientation: "vertical",
        showSplitBar: true,
        panels: [{ size: "50%"},
                 { size: "50%",collapsible:false }]
      });
      return false;
    } else {
      $("#splitContainer").jqxSplitter({
        height: "auto",
        width: "100%",
        orientation: "vertical",
        showSplitBar: true,
        panels: [{ size: "35%",collapsible:false },
                 { size: "50%" }]
      });
      $("#leftSplitter").jqxSplitter({
        height: "100%",
        width: "100%",
        orientation: "horizontal",
        showSplitBar: true,
        panels: [{ size: "50%",collapsible:false },
                 { size: "50%"}]
      });
      $("#rightSplitter").jqxSplitter({
        height: "100%",
        width: "100%",
        orientation: "horizontal",
        showSplitBar: true,
        panels: [{ size: "50%"},
                 { size: "50%",collapsible:false }]
      });
      return false;
    }
  });
  return false;
});

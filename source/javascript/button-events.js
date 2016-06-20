$(document).ready(function() {

  // By default, the Show all button is selected.
  $("#btn-channel-all").addClass("btn-selected");

  // Filter streams: Show all.
  $("#btn-channel-all").on("click", function(event) {

    // Fade in effect.
    $(".stream-panel").fadeIn(400);

    // Set active button.
    $("#btn-array > button").removeClass("btn-selected");
    $("#btn-channel-all").addClass("btn-selected");

    // Remove .hidden from all streams.
    $(".channel-online").removeClass("hidden");
    $(".channel-offline").removeClass("hidden");
    $(".channel-closed").removeClass("hidden");
  });

  // Filter streams: Show online.
  $("#btn-channel-online").on("click", function(event) {

    // Fade in effect.
    $(".stream-panel").fadeIn(400);

    // Set active button.
    $("#btn-array > button").removeClass("btn-selected");
    $("#btn-channel-online").addClass("btn-selected");

    // Show only online streams.
    $(".channel-online").removeClass("hidden");
    $(".channel-offline").addClass("hidden");
    $(".channel-closed").addClass("hidden");
  });

  // Filter streams: Show offline.
  $("#btn-channel-offline").on("click", function(event) {

    // Fade in effect.
    $(".stream-panel").fadeIn(400);

    // Set active button.
    $("#btn-array > button").removeClass("btn-selected");
    $("#btn-channel-offline").addClass("btn-selected");

    // Show only offline streams.
    $(".channel-online").addClass("hidden");
    $(".channel-offline").removeClass("hidden");
    $(".channel-closed").addClass("hidden");
  });

  // Filter streams: Show closed.
  $("#btn-channel-closed").on("click", function(event) {

    // Fade in effect.
    $(".stream-panel").fadeIn(400);

    // Set active button.
    $("#btn-array > button").removeClass("btn-selected");
    $("#btn-channel-closed").addClass("btn-selected");

    // Show only channels which are closed.
    $(".channel-online").addClass("hidden");
    $(".channel-offline").addClass("hidden");
    $(".channel-closed").removeClass("hidden");
  });

});

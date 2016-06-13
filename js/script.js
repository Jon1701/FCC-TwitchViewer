// Updates channel information.
//
// Adds channel photo, channel photo link, channel username.
function populateRowForChannel(index, username, channelUrl, channelPhotoUrl) {

		// Add channel name
		$("#channel-name-" + index).append(username);

		// Add link to channel.
		$("#channel-link-" + index).attr("href", channelUrl);

		// If channel has a photo, add src to photo.
		if (channelPhotoUrl !== null) {
			$("#channel-photo-" + index).attr("src", channelPhotoUrl);
		}
}

// Updates stream information.
//
// Stream screenshot, stream links.
function populateRowForStream(index, game, screenshot) {

	// If game is not provided, then user exists, but is offline.
	if (game == null) {

		// Add placeholder image.
		$("#stream-preview-" + index + "> img").attr("src", "media/img/offline.png");

		// Add "Not Broadcasting" as the game currently being played.
		$("#stream-game-" + index).html("<em>Not Broadcasting</em>");

		// Update data-stream-status.
		$("#stream-panel-" + index).addClass("channel-offline");

	} else {

		// Add screenshot from the stream.
		$("#stream-preview-" + index + " > img").attr("src", screenshot);

		// Add game currently playing.
		$("#stream-game-" + index).append(game);

		// Update data-stream-status.
		$("#stream-panel-" + index).addClass("channel-online");

	}
}

// Gets channel and stream information.
// Modifies DOM accordingly.
function getInfo(username, index) {

	// Base URLs.
	var baseChannel = "https://api.twitch.tv/kraken/channels/";
	var baseStream = "https://api.twitch.tv/kraken/streams/";

	// Get Channel Information.
	var channelInfo =$.getJSON(baseChannel + username, function(data) {

		// Fill the current row with channel username, url, avatar.
		populateRowForChannel(index, data["display_name"], data["url"], data["logo"]);

	}).fail(function(error) {

		var placeholder = "media/img/channel-closed.png";

		// Hide channel photo.
		//$("#channel-photo-" + index).css("opacity", "0");

		// Add screenshot from the stream.
		$("#stream-preview-" + index + " > img").attr("src", placeholder);

		// Add game currently playing.
		$("#stream-game-" + index).html("<em>Not Broadcasting</em>");
		$("#stream-game-" + index).css("opacity", "0");

		// For the section which is supposed to contain the username, remove
		// all classes.
		$("#channel-name-" + index).append(username);

		$("#channel-info").css("text-align", "center");

		// Update data-stream-status.
		$("#stream-panel-" + index).addClass("channel-closed");
	});

	// Get Stream Information.
	var streamInfo = $.getJSON(baseStream + username, function(data) {

		// Check to see if there is a stream.
		if (data["stream"] == null) {

			// No stream.
			populateRowForStream(index, null, null);

		} else {

			// User is playing a game, get the current game.
			var currentGame = data["stream"]["game"];

			// Get screenshot of stream.
			var screenshot = data["stream"]["preview"]["large"];

			// Modify DOM with the current game and a screenshot.
			populateRowForStream(index, currentGame, screenshot);
		}

	});

}

$(document).ready(function() {

	// List of users.
	var usernames = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404"];

	// Go through each username.
	$.each(usernames, function(index, value) {

		// Stream panel template.
		var template = `
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 stream-panel" id="stream-panel-` + index + `">
						<a target="_blank" class="channel-link" id="channel-link-` + index + `">
							<!-- Stream preview -->
							<div class="stream-preview" id="stream-preview-` + index + `">
								<img src="">
							</div>

							<div class="stream-game" id="stream-game-` + index + `"></div>

							<div class="channel-info">
								<span>
									<img class="channel-photo" id="channel-photo-` + index + `" src="media/img/channel-photo-none.png">
								</span>

								<span class="channel-name" id="channel-name-` + index + `"></span>
							</div>
						</a>
					</div>
		`;

		// Create new stream panel.
		var streamPanel = $(".container-fluid");

		// Append template to newRow.
		streamPanel.append(template);

		// Get channel and stream information.
		// Modify DOM.
		getInfo(value, index);

	});

});

$(document).ready(function() {

  // Get API URL.
  var getApiUrl = function(username) {
    return "https://api.twitch.tv/kraken/streams/" + username + "?callback=?";
  }

  // Users to get stream information on.
  var users = ["the_pixxel", "freecodecamp"];

  console.log(getApiUrl(users[0]));



});

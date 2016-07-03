////////////////////////////////////////////////////////////////////////////////
// AJAX Request.
////////////////////////////////////////////////////////////////////////////////
var getStreamInfoAndUpdateState = function(thisComponent, filterHow) {

  // Error callback function for ajax request.
  var ajaxFailCallback = function(error) {

    // Get the API URL.
    var item = this.url;

    // Generate the display name for the given user.
    var displayName = item.split("/").slice(-1)[0];

    // Get JSON response.
    var responseJson = error["responseJSON"];

    // Could not access URL.
    if (typeof responseJson == "undefined") {

    } else { // Channel is not available.

      // Get error message.
      var responseMessage = error["responseJSON"]["message"];

      // Prepare a customized error message for each user.
      var customMessage = responseMessage;

      // Create custom status message depending on the reason for the error.
      if (responseMessage.indexOf("does not exist") > -1) {
        customMessage = "User does not exist";
      } else if (responseMessage.indexOf("is unavailable") > -1)
        customMessage = "Account Closed";
      }

      // Create placeholder data.
      var data = {
        stream: {
          channel: {
            logo: "./images/logos/GlitchIcon_PurpleonWhite.png",
            display_name: displayName,
            game: customMessage,
            url: "https://www.twitch.tv/" + displayName
          }
        },
        reactjs: { status: "offline" }
      }

      // Add stream info to the state if showing All Users or if showing offline
      // users.
      if (filterHow === "all" || filterHow === "offline" && data["reactjs"]["status"] === "offline") {

        // Push stream information for offline users.
        thisComponent.setState(function(prevState) {
          return { streamInfo: prevState.streamInfo.concat(data) };
        });
      }

  }// end ajaxFailCallback().

  // Done callback function for ajax request.
  var ajaxDoneCallback = function(data) {

    // Get the API URL.
    var item = this.url;

    // Generate the display name for the given user.
    var displayName = item.split("/").slice(-1)[0];

    // Perform some data manipulation for offline users.
    if (data.stream == null) { // User is offline.

      // Fill in placeholder logo, display_name,
      // game, and url to prevent React from throwing errors due to
      // missing object properties.
      data["stream"] = {
        channel: {
          logo: "./images/logos/GlitchIcon_WhiteonPurple.png",
          display_name: displayName,
          game: "User is Offline",
          url: "https://www.twitch.tv/" + displayName
        }
      };

      // Add some data which will be used by React for filtering between
      // online and offline users.
      data["reactjs"] = { status: "offline" };

    } else { // User is online.

      // Add some data which will be used by React for filtering between
      // online and offline users.
      if (data.stream !== null) {
        data["reactjs"] = { status: "online" };
      }
    }// end data manipulation.

    // Filtering step.
    //
    // Filters between All Users, Online Users, and Offline Users.
    if (filterHow === "all") { // Show All Users.

      // Push stream information for all users into the state.
      thisComponent.setState(function(prevState) {
        return { streamInfo: prevState.streamInfo.concat(data) };
      });

    } else { // Show either Online or Offline Users.

      // Show only online users.
      if (filterHow === "online" && data["reactjs"]["status"] === "online") {

        // Push stream information for online users.
        thisComponent.setState(function(prevState) {
          return { streamInfo: prevState.streamInfo.concat(data) };
        });

      } else if (filterHow === "offline" && data["reactjs"]["status"] === "offline") {

        // Push stream information for offline users.
        thisComponent.setState(function(prevState) {
          return { streamInfo: prevState.streamInfo.concat(data) };
        });
      }

    }// end filtering.
  }// end ajaxDoneCallback().

  // Clear existing streamInfo state.
  thisComponent.state.streamInfo = [];

  // Given a list of usernames, create an array of Twitch API URLs.
  var arrUrls = thisComponent.state.usernames.map(function(item) { return encodeURI("https://api.twitch.tv/kraken/streams/" + item); });

  // Go through each Twitch API URL and get stream information.
  arrUrls.forEach(function(item) {
    item = item;
    $.getJSON(item)
      .fail(ajaxFailCallback)
      .done(ajaxDoneCallback)
  })// end .forEach() callback.

}

////////////////////////////////////////////////////////////////////////////////
// Component: <StreamTable/>
////////////////////////////////////////////////////////////////////////////////

var StreamTable = React.createClass({

  // Component Initial State.
  getInitialState: function() {
    return {
      usernames: ["GreenManGaming", "the_Pixxel", "SovietWomble", "Annchirisu", "brunofin", "eleaguetv", "supermcgamer", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
      streamInfo: []
    }
  },

  // Reload stream info and store all users in state.
  reloadStreamInfo: function() {
    getStreamInfoAndUpdateState(this, "all");
  },

  // Reload stream info and store only online users in state.
  filterOnlineStreamInfo: function() {
    getStreamInfoAndUpdateState(this, "online");
  },

  // Reload stream info and store only offline users in state.
  filterOfflineStreamInfo: function() {
    getStreamInfoAndUpdateState(this, "offline");
  },

  // When the component loads, load stream info and store all users in state.
  componentDidMount: function() {
    getStreamInfoAndUpdateState(this, "all");
  },

  // Render the template.
  render: function() {
    return (
      <div>
        <div id="container-tabs">
          <StreamTabs id="tab-all" text="All" clickEvent={this.reloadStreamInfo}/>
          <StreamTabs id="tab-online" text="Online" clickEvent={this.filterOnlineStreamInfo}/>
          <StreamTabs id="tab-offline" text="Offline" clickEvent={this.filterOfflineStreamInfo}/>
        </div>
        <div>
          <StreamList streamInfo={this.state.streamInfo}/>
        </div>
      </div>
    )
  }
});

////////////////////////////////////////////////////////////////////////////////
// Component: <StreamTabs/>
////////////////////////////////////////////////////////////////////////////////

// Tabs component which houses the All, Online, Offline buttons.
var StreamTabs = React.createClass({
  render: function() {
    return (
      <div id={this.props.id} className="tab" onClick={this.props.clickEvent}>{this.props.text}</div>
    )
  }
});

////////////////////////////////////////////////////////////////////////////////
// Component: <StreamList/>
////////////////////////////////////////////////////////////////////////////////

// List component which shows all the streams.
var StreamList = React.createClass({

  // Render the template.
  render: function() {

    // Format each row.
    var rows = this.props.streamInfo.map(function(item, index, arr) {
      return (
        <tr className="row-stream" key={index}>
          <td className="stream-image">
            <a href={item.stream.channel.url} target="_blank">
              <img src={item.stream.channel.logo}/>
            </a>
          </td>
          <td className="stream-info">
            <a href={item.stream.channel.url} target="_blank">
              {item.stream.channel.display_name}<br/>
              <em>{item.stream.channel.game}</em>
            </a>
          </td>
        </tr>
      )
    });

    return (
      <table id="tbl-streams">
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }// end render().
});

// Add Component to DOM.
ReactDOM.render(<StreamTable/>, document.getElementById("react-target"));

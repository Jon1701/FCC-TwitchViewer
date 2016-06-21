// Tabs component which houses the All, Online, Offline buttons.
var Tabs = React.createClass({
  render: function() {
    return (
      <div id={this.props.id} className="tab">{this.props.text}</div>
    )
  }
});

ReactDOM.render(<Tabs id="tab-all" text="All"/>, document.getElementById("react-target-tab-all"));
ReactDOM.render(<Tabs id="tab-online" text="Online"/>, document.getElementById("react-target-tab-online"));
ReactDOM.render(<Tabs id="tab-offline" text="Offline"/>, document.getElementById("react-target-tab-offline"));

/*
// Create Stream component.
var Stream = React.createClass({
  getInitialState: function() {
      return {
        // Default users.
        //users: ["the_pixxel", "freecodecamp"],

        streams: [{"name":"Lorem", "stream":"StarCraft"}, {"name":"Dolor", "stream":"Diablo"} ]
      }
  },

  render: function() {

    var data = this.state.streams.map(function(item) {
      return <li>{item.name} is playing {item.stream}</li>;
    });

    return (
      <div>
        {data}
      </div>
    )
  }
});

ReactDOM.render(<Stream />, document.getElementById("target"));
*/

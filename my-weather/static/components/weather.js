"use strict";

var Weather = React.createClass({
  displayName: "Weather",

  getInitialState: function getInitialState() {
    return { data: this.props.data };
  },
  render: function render() {
    var data = this.state.data;
    return React.createElement(
      "div",
      { className: "card blue-grey darken-1" },
      React.createElement(
        "div",
        { className: "card-content white-text" },
        React.createElement(
          "span",
          { className: "card-title" },
          data.name
        ),
        React.createElement(
          "p",
          null,
          data.weather[0].description
        ),
        React.createElement(
          "p",
          null,
          data.main.temp,
          " Degrees Fahrenheit"
        ),
        React.createElement(
          "p",
          null,
          "Wind speeds ",
          data.wind.speed,
          " mph"
        )
      )
    );
  }
});
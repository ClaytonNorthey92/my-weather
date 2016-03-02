"use strict";

var AllWeathers = React.createClass({
  displayName: "AllWeathers",

  getInitialState: function getInitialState() {
    return {
      weatherKey: "43b3b3117ae491a0743fb4c41e1f72fa",
      weathers: []
    };
  },
  render: function render() {
    var userWeathers = [];
    var weatherElements = [];
    this.state.weathers.forEach(function (weather) {
      weatherElements.push(React.createElement(Weather, { key: weather.id, data: weather }));
    });
    var dom = null;
    if (location.protocol === 'http:') {
      dom = React.createElement(
        "div",
        { className: "left-align" },
        React.createElement(
          "form",
          { className: "row", onSubmit: this.getZipcode },
          React.createElement(
            "div",
            { className: "input-field col s6 m4" },
            React.createElement("input", { placeholder: "Zipcode", id: "zipcode", type: "number", onChange: this.setZipcode }),
            React.createElement(
              "label",
              { "for": "zipcode" },
              "Enter a zip code you want to see the weather for..."
            ),
            this.state.zipcodeError
          ),
          React.createElement(
            "a",
            { className: "waves-effect waves-light purple accent-3 btn", onClick: this.getZipcode },
            "+ Add Location"
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col s12 m4" },
            weatherElements
          )
        )
      );
    } else {
      dom = React.createElement(
        "div",
        null,
        "Site only available over HTTP."
      );
    }
    return dom;
  },
  getInfoByZipcode: function getInfoByZipcode(zipcode) {
    var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + this.state.weatherKey + "&units=imperial";
    var foundWeather = _.find(this.state.weathers, function (weather) {
      return weather.zipcode === zipcode;
    });
    if (foundWeather) {
      var newStateData = $.extend(this.state, {
        zipcodeError: React.createElement(
          "div",
          null,
          "Zipcode ",
          zipcode,
          " location already saved."
        )
      });
      this.setState(newStateData);
    } else if (this.state.weather.length === 5) {
      var newStateData = $.extend(this.state, {
        zipcodeError: React.createElement(
          "div",
          null,
          "You have reached your limit of 5 locations saved."
        )
      });
      this.setState(newStateData);
    } else {
      $.get(url, (function (data) {
        if (data.cod === "404") {
          var newStateData = $.extend(this.state, {
            zipcodeError: React.createElement(
              "div",
              null,
              "Location not found with zipcode ",
              zipcode,
              "."
            )
          });
          this.setState(newStateData);
        } else {
          var newWeathers = this.state.weathers;
          data.zipcode = zipcode;
          newWeathers.push(data);
          var newStateData = $.extend(this.state, {
            weathers: newWeathers,
            zipcodeError: null
          });
          this.setState(newStateData);
          console.log(this.state);
        }
      }).bind(this));
    }
  },
  getZipcode: function getZipcode(event) {
    event.preventDefault();
    this.getInfoByZipcode(this.state.zipcode);
  },
  setZipcode: function setZipcode(event) {
    var newStateData = $.extend(this.state.data, {
      zipcode: event.target.value
    });
    this.setState(newStateData);
  }
});

ReactDOM.render(React.createElement(AllWeathers, null), document.getElementById('weather'));
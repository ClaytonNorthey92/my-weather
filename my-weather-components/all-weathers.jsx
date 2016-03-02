var AllWeathers = React.createClass({
  getInitialState: function(){
    return {
      weatherKey: "43b3b3117ae491a0743fb4c41e1f72fa",
      weathers: []
    };
  },
  render: function(){
    var userWeathers = [];
    var weatherElements = [];
    this.state.weathers.forEach(function(weather){
      weatherElements.push(<Weather key={weather.id} data={weather}/>);
    });
    var dom = null;
    if (location.protocol==='http:'){
      dom = (
        <div className="left-align">
          <form className="row" onSubmit={this.getZipcode}>
            <div className="input-field col s6 m4">
              <input placeholder="Zipcode" id="zipcode" type="number" onChange={this.setZipcode}/>
              <label for="zipcode">Enter a zip code you want to see the weather for...</label>
              {this.state.zipcodeError}
            </div>
            <a className="waves-effect waves-light purple accent-3 btn" onClick={this.getZipcode}>+ Add Location</a>
          </form>
          <div className="row">
            <div className="col s12 m4">
              {weatherElements}
            </div>
          </div>
        </div>
      )
    }
    else {
      dom = (
        <div>Site only available over HTTP.</div>
      )
    }
    return dom;
  },
  getInfoByZipcode: function(zipcode){
    var url = "http://api.openweathermap.org/data/2.5/weather?zip="
    + zipcode +",us&appid=" + this.state.weatherKey + "&units=imperial";
    var foundWeather = _.find(this.state.weathers, function(weather){
      return weather.zipcode===zipcode;
    });
    if (foundWeather){
      var newStateData = $.extend(this.state, {
          zipcodeError: (<div>Zipcode {zipcode} location already saved.</div>)
        })
        this.setState(newStateData);
    }
    else if (this.state.weathers.length===5){
      var newStateData = $.extend(this.state, {
          zipcodeError: (<div>You have reached your limit of 5 locations saved.</div>)
        })
        this.setState(newStateData);
    }
    else {
      $.get(url, function(data){
        if (data.cod==="404"){
          var newStateData = $.extend(this.state, {
            zipcodeError: (<div>Location not found with zipcode {zipcode}.</div>)
          })
          this.setState(newStateData);
        }
        else {
          var newWeathers = this.state.weathers;
          data.zipcode = zipcode;
          newWeathers.push(data);
          var newStateData = $.extend(this.state, {
            weathers: newWeathers,
            zipcodeError: null
          });
          this.setState(newStateData);
          console.log(this.state)
        }
      }.bind(this));
    }
  },
  getZipcode: function(event){
    event.preventDefault();
    this.getInfoByZipcode(this.state.zipcode);
  },
  setZipcode: function(event){
    var newStateData = $.extend(this.state.data, {
      zipcode: event.target.value
    });
    this.setState(newStateData);
  }
});

ReactDOM.render(<AllWeathers/>, document.getElementById('weather'))

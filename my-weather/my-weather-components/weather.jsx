var Weather = React.createClass({
  getInitialState: function(){
    return {data: this.props.data};
  },
  render: function(){
    var data = this.state.data;
    return (
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{data.name}</span>
              <p>{data.weather[0].description}</p>
              <p>{data.main.temp} Degrees Fahrenheit</p>
              <p>Wind speeds {data.wind.speed} mph</p>
            </div>
          </div>
    )
  }
});

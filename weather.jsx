import React from "react";
import ReactDOM from "react-dom";

class Weather extends React.Component{
  constructor(){
    super();
    debugger;
    let nav = new Navigator();
    let geo = Navigator.geolocation;
  }
  render(){
    return(<h1>This is weather</h1>);
  }
}

export default Weather;

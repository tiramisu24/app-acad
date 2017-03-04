import React from 'react';
import ReactDOM from 'react-dom';
import Congrats from './congrats';
import Tabs from './tabs';
import Weather from './weather';



document.addEventListener("DOMContentLoaded", e => {
  let title = ["cheesecake", "tiramisu", "real chia pudding"];
  let content = ["this is cheesy", "this is miso", "this is pudding"];

  let allHash = [];

  for (let i = 0; i <title.length; i++) {
    let hash = {};
    hash["title"] = title[i];
    hash["content"] = content[i];
    allHash.push(hash);
  }

  let tabs = <Tabs data={allHash}/>;
  let weather = <Weather/>;
  const root = document.getElementById("root");
  ReactDOM.render(Widgets(tabs, weather), root);
});

const Widgets = (tabs, weather) => <div>{tabs}{weather}</div>;

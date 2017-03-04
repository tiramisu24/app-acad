import React from 'react';
import ReactDOM from 'react-dom';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;

    this.state = {title: this.data[0].title, content: this.data[0].content};
    this.clickTab = this.clickTab.bind(this);
  }

  clickTab(event, idx){
    this.state.title = event.target.innerHTML;
    this.state.content = this.data[idx].content;

    this.setState({title: this.state.title, content: this.state.content});
  }
  render() {
    const tabs = this.data.map((datum, idx) => (
      <h1 key={idx} onClick={ (event) => this.clickTab(event, idx) }>{datum.title}</h1>
    ));

    return (
      <header className="Tab">
        <ul>{tabs}</ul>
        <article>{this.state.content}</article>
      </header>
    );
  }
}

export default Tabs;

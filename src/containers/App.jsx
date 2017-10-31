import React from 'react';
import 'rc-slider/assets/index.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}

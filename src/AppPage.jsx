import * as React from 'react';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.children
  }
}

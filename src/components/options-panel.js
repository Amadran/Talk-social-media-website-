import React from 'react';
import '../css/options-panel.css';

export default class OptionsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="options-panel">
        <h3 className="header">Talk</h3>
        <hr/>
      </div>
    );
  }
}
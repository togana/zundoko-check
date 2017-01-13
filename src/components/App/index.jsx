import React, { Component, PropTypes } from 'react';
import DevTools from '../../utils/DevTools';

class App extends Component {
  render() {
    const { list, isMusic } = this.props;
    return (
      <div>
        <h1>Music {isMusic ? 'ON' : 'OFF'}</h1>
        <div>{list}</div>
        {(process.env.NODE_ENV === 'production') ? null : <DevTools />}
      </div>
    );
  }
}

App.propTypes = {
  list: PropTypes.array.isRequired,
  isMusic: PropTypes.bool.isRequired,
};

module.exports = App;

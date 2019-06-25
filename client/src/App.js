import React from 'react';
import TwitterName from './components/twitterName';

class App extends React.Component {
  render() {
    return (
      <div className="ui center aligned container" style={{marginTop: '30px'}}>
        <TwitterName />
      </div>
    );
  }
}

export default App;

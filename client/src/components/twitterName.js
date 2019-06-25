import React from 'react';
import SentimentCalculate from './sentimentCalculate';

class TwitterName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      tweetContent: '',
    };
    this.senduserName = this.senduserName.bind(this);
    this.getTweet = this.getTweet.bind(this);
    this.resetuserName = this.resetuserName.bind(this);
  }

  senduserName = (event) => {
    event.preventDefault();
    fetch('/userName', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userName: this.state.userName})
    })
    this.getTweet()
  }

  getTweet = (event) => {
    fetch('/twitter')
    .then(res => res.json())
    .then(tweetContent => this.setState({tweetContent}, () => console.log('tweet fetched: ', tweetContent)))
  }

  resetuserName() {
    this.setState({
      tweetContent: '',
      userName: ''
    })
  }
  render() {
    return (
      <div>
        <label>Enter a Twitter Handle and find the most recent tweet:
          <br />
          <div className="ui input">
            <input
              placeholder="twitter name"
              type="text"
              value={this.state.userName}
              onChange={(e) => this.setState({ userName: e.target.value})}
              />
          </div>
          <br />
          <button className="ui blue button" onClick={this.senduserName}>
            find most recent tweet
          </button>
        </label>
        <SentimentCalculate tweetContent={this.state.tweetContent} userName={this.state.userName} resetuserName={this.resetuserName}/>
      </div>
    )
  }
}
export default TwitterName;

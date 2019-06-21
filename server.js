const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');
const Twitter = require('twitter');
const path = require('path');

dotenv.config();
const app = express();
app.use(bodyParser.json());

// heroku handling
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
}

// const port = 5000;
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));

// Twitter credentials
const client = new Twitter({
  consumer_key: 'gtbjEM4wCiqBDLXG6SEUTuXcD',
  consumer_secret: 'JT0UvZAVltdAVaBNVvF1WJMxfbq1aa0iMc2leny8GbBnlohZgr',
  access_token_key: '2905455355-nYx2pL8Th7TZga4ANYKRgHWnrfsaq9ySHNkGGbz',
  access_token_secret: '9VuMVEcgGW5XxdE8NB0yGthkpByX3rTKnTIOXlfrfXy7u'
});

// Nexmo credentials
const nexmo = new Nexmo({
  apiKey: 'f262335b',
  apiSecret: '0eIn2WfMsgeTPufP',
  // applicationId: process.env.APPLICATION_ID,
  // privateKey: './private.key'
}, {debug: true});

// Receive input and call Twitter API
app.post('/userName', function(req, res) {
  userName = req.body.userName;
  app.get('/twitter', (req, res) => {
    // read most recent tweet
    var username = {screen_name: userName };
    client.get('statuses/user_timeline', username, function(error, tweets, response) {
      if (!error) {
        console.log(`most recent tweet: `, tweets[0].text);
        res.json(tweets[0].text)
      }
    });
  });
});

// send SMS via Nexmo
app.post('/sendSMS', (req, res) => {
  res.send(req.body);
  let score = req.body.score;
  let toNumber = req.body.number;
  let tweet = req.body.tweetContent;
  let userName = req.body.userName;
  let scoreSign = '';

  // analyze the sentiment and assign emoji
  if (score > '.5') {
    scoreSign = '✅'
  } else if (score == '.5') {
    scoreSign = '😐'
  } else {
    scoreSign = '👿'
  }

  //  Nexmo Messages API
  const nexmoNumber = '13218210808'
  nexmo.channel.send(
    { type: 'sms', number: toNumber }, // To
    { type: 'sms', number: nexmoNumber }, // From
    {
      content: {
        type: 'text',
        text: `${userName}'s most recent tweet was: \"\ ${tweet}\"\ and the sentiment score is: ${scoreSign}`,
      }
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    },
    { useBasicAuth: true }
  );
});

const config = require('./config');
const twit = require('twit');
const T = new twit(config);


//this function searches twitter for or parameters
function searchTwitter() {
  const params = {
    q: '#gostars',
    count: 100,
    result_type: ['recent', 'popular'],
    language: 'en'
  }
  return T.get('search/tweets', params)
  .then(function(res){
    //grabbing the first
        // const tweet = res.data.statuses[0];
    //grabbing a random one
    const tweet = res.data.statuses[Math.floor(Math.random() * res.data.statuses.length)];
    if(!tweet){
      throw new Error('No Status found');
    }
    return tweet;
  });
}

//this post actually posts the tweet using built in functions from Twit
function postTweet(url, params){
    return T.post(url, params, function(err){
      if(err){
        console.log('ohh shit something dun fucked up ', err);
        return;
      }
      console.log('fuck yeah it worked !')
    });
}

//this function grabs a tweet we are looking for
function searchAndPostTweet(url){
  return function(){
    return searchTwitter()
  .then(function(status){
    return postTweet(url, {id: status.id_str})
  })
  .catch(function(err){
    console.log("htere is an error inside the search and PostTweet", err)
  });
}
}

const retweet = searchAndPostTweet('statuses/retweet/:id');
const favorite = searchAndPostTweet('favorites/create');
const newTweet = function(){
  return postTweet('statuses/update', {status: 'This is a test from my Awesome Twitter Bot that I bulit with node.js !!!'})
}

newTweet();
// retweet();
// favorite();

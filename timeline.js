//retweeting from timeline
const config = require('./config');
const twit = require('twit');
const T = new twit(config);

function homeSearch(){
  const params = {
    count: 10
  }
return T.get('statuses/home_timeline', params)
.then(function(res){
  const tweet = res.data[Math.floor(Math.random()* res.data.length)];
  if(!tweet){
    throw new Error('No Status found');
  }
  return tweet;
});
}

function homeRetweet(){
  return homeSearch()
  .then(function(status){
    return T.post('statuses/retweet/:id', {id: status.id_str});
  })
  .catch(function(err){
    console.log("error timeline retweet", err);
  });
}

homeRetweet();

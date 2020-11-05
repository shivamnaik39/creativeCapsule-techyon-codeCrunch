const express=require('express')
const routes = express.Router()

const dotenv = require('dotenv')
dotenv.config({path: __dirname + '/.env'});
const Twit=require('twit')
const T=new Twit({
    consumer_key:process.env.api_key,
    consumer_secret:process.env.api_secret,
    access_token:process.env.access_token,
    access_token_secret:process.env.access_token_secret,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
})
routes.get('/twitter/user/:username',(req,res)=>{
    T.get('statuses/user_timeline', { screen_name: req.params.username,count:10 },  function (err, data, response) {
        result={
            user_name:data[0].user.name,
            user_screen_name:data[0].user.screen_name,
            followers_count:data[0].user.followers_count,
            friends_count:data[0].user.friends_count,
            tweets:[{ 
                created_at:data[0].created_at,
                text:data[0].text,
            }]



        }
        for (var i=1; i<data.length; i++){
                twitt={
                    created_at:data[1].created_at,
                    text:data[i].text
                }
                result.tweets.push(twitt)
        }
        
        res.status(200).send(result)
      })
})
routes.get('/twitter/hashtag/:hashtag',(req,res)=>{
    T.get('search/tweets', { q: req.params.hashtag,count:10 }, function (err, data, response) {
        //console.log(data.statuses)
        result=[{
            
            user_screen_name:data.statuses[0].user.screen_name,
            retweet_count:data.statuses[0].retweet_count,
            text:data.statuses[0].text
            
        }]
        for (var i=0; i<data.statuses.length; i++){
            twitt={
                user_screen_name:data.statuses[i].user.screen_name,
                retweet_count:data.statuses[i].retweet_count,
                text:data.statuses[i].text   
            }
            result.push(twitt)
    }
        res.status(200).send(result)
    })
})
routes.get('/twitter/location',(req,res)=>{
    console.log(req.query)
    var lo=req.query.longitude
    var la=req.query.latitude
    const rad=parseFloat(req.query.longitude)+parseFloat(req.query.radius)
    const rad1=parseFloat(req.query.latitude)+parseFloat(req.query.radius)
    console.log(rad)
    var mylocation =[req.query.longitude, req.query.latitude, rad, rad1] 
    var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
    
var i=0
var result =[{
    user_screen_name:'',
    text:''
}]
var stream = T.stream('statuses/filter', {locations:mylocation}) 
stream.on('tweet', function (tweet,err) {
    if (err){
        throw err
    }
    
    twitt={
        user_screen_name:tweet.user.screen_name,
        text:tweet.text   
    }
    result.push(twitt)
    i=i+1
    if (i==10)
    {
       res.status(200).send({result})
    }
        

})
  
})

module.exports = routes

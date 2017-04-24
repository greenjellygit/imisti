var q = require('q');

var util = require('util');
var unirest = require('unirest');

const pageId = "464656396920353";
var accessToken = null;

const urls = {
  appAccesToken: "https://graph.facebook.com/oauth/access_token",
  fanpagePosts: "https://graph.facebook.com/" + pageId + "/posts?fields=full_picture,picture,message,created_time"
};

function getAccessToken() {
  util.log('GET request: FB api access_token');
  unirest.get(urls.appAccesToken)
    .query({
      client_id: '463956137276928',
      client_secret: 'b6dbb81347dfa93bbf63470f064c1fae',
      grant_type: 'client_credentials'
    })
    .end(function(res) {
      if (res.error) {
        console.log('GET error', res.error)
      } else {
        accessToken = res.body.access_token;
        util.log("GET response: Retreived access_token: " + accessToken);
      }
    });
}

function findPosts() {
  util.log('GET request: getNews');
  var deferred = q.defer();
  unirest.get(urls.fanpagePosts)
    .query({
      access_token: accessToken
    })
    .headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
    .end(function(res) {
      if (res.error) {
        deferred.reject(new Error(res.error));
      } else {
        util.log("GET response: getNews ");
        deferred.resolve(processPosts(res.body.data));
      }
    });
    return deferred.promise;
}

function processPosts(postList) {
  for(var i in postList) {
    var message = postList[i].message;
    var textLines = message.split('\n');
    postList[i].title = textLines.splice(0, 1)[0];
    postList[i].text = textLines.join('\n');
  }
  return postList;
}

module.exports = {
  initialize: function() {
    getAccessToken();
  },
  findPosts: findPosts
};

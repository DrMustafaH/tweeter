/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  // logic to control the tweet button and make it form a tweet (in the server) without getting sent to the /tweets page
  const $form = $('#tweet-form')
  $form.submit(function (event) {
    event.preventDefault();
    $.ajax({ method: 'POST', url: "/tweets", data: $form.serialize() })
  });

  // temperory data to test the functions
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  // function that takes an array of tweet object and render each tweet by using prepend jquery
  const renderTweets = function (tweets) {
    tweets.forEach(tweet => {
      const result = createTweetElement(tweet);
      $('#tweets-container').prepend(result);
    });
  }

  // function that take a tweetObj and implement it on an HTML markup
  function createTweetElement(tweetObj) {
    const markup =
      `
      <article id="tweet-container">
    <div class="name">
      <span class="nameNImg"><img src=${tweetObj.user.avatars}>${tweetObj.user.name}</span>
      <span id="username">${tweetObj.user.handle}</span>
    </div>
    <header class="postedTweet">
    ${tweetObj.content.text}
      <hr class=" solidLine">
    </header>
    <div class="footerInfo">
      <footer>${tweetObj.created_at}</footer>
      <footer id="interaction">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </footer>
    </div>
    </article>
  `;
    return markup;
  }

  renderTweets(data);
})
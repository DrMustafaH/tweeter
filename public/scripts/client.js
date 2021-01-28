$(document).ready(function () {

  // logic to control the tweet button and make it form a tweet (in the server) without getting sent to the /tweets page with error handling
  const $form = $('#tweet-form')
  $form.submit(function (event) {
    event.preventDefault();
    const textLength = $('#tweet-text').val().length;
    if (textLength === 0) {
      alert("Please type in a tweet");
    } else if (textLength > 140) {
      alert("You exceeded character limit in your tweet");
    } else {
      $.post("/tweets/", $form.serialize());
    }
  });

  // logic to render tweets submitted to and saved in the server
  const loadTweets = function () {
    $.get("/tweets", (response) => {
      renderTweets(response);
    })
  }
  loadTweets()

  // function that take a tweetObj and implement it on an HTML markup
  const createTweetElement = function (tweetObj) {
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

  // function that takes an array of tweet object and render each tweet by using prepend jquery
  const renderTweets = function (tweets) {
    tweets.forEach(tweet => {
      const result = createTweetElement(tweet);
      $('#tweets-container').prepend(result);
    });
  }

})
$(document).ready(function () {

  // logic to control the tweet button and make it form a tweet (in the server) without getting sent to the /tweets page
  const $form = $('#tweet-form')
  $form.submit(function (event) {
    event.preventDefault();
    // Variables to handle XSS and errors
    const userText = $('#tweet-text').val();
    const userTextXSS = $('#tweet-text').text(userText);
    const textLength = $('#tweet-text').val().length;
    const error = $('#errorhandle').slideDown();
    // logic to hide error on everytime tweet button clicked
    error.css("display", 'none');
    // error handling conditions
    if (textLength === 0) {
      error.text('⚠ You aren\'t humming ⚠ Please do , and remember to keep it below 140 ⚠');
      error.css("display", 'block');
    } else if (textLength > 140) {
      error.text('⚠ You exceeded the character limit ⚠ Please keep it to 140⚠');
      error.css("display", 'block');
    }
    // logic to post tweet
    else {
      $.post("/tweets/", $form.serialize())
        // when response comes refresh page and clear form
        .then((response) => {
          loadTweets();
          $("#tweet-text").val("");
        })
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
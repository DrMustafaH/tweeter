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
    <footer id="timeOfPost">${moment(tweetObj.created_at).fromNow()}</footer>
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

// function to render tweets submitted to and saved in the server
const loadTweets = function () {
  $.get("/tweets", (response) => {
    renderTweets(response);
  })
}

// function to protect webpage from XSS
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
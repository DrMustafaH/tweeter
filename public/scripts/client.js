$(document).ready(function () {

  // logic to control the tweet button and make it form a tweet (in the server) without getting sent to the /tweets page
  const $form = $('#tweet-form')
  $form.submit(function (event) {
    event.preventDefault();
    // Variables to handle XSS and errors
    const userText = $('#tweet-text').val();
    const escapedText = (escape(userText))
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
      $.post("/tweets/", `text=${escapedText}`)
        // when response comes refresh page and clear form
        .then((response) => {
          loadTweets();
          $("#tweet-text").val("");
          $(".counter").val("140");
        })
        .catch((err) => {
          error.text('⚠ Are you trying to hack me? ⚠ HAHA, try again!⚠');
          error.css("display", 'block');
        })
    }
  });
  // load tweets when page is first opened
  loadTweets()

  // logic to make the tweet form appear on clicking navbar and toggle typing automatically
  $(".newTweet").click(() => {
    $(".new-tweet").slideDown(1000);
    setTimeout(() => {
      $("#tweet-text").focus();
    }, 1000);;
  })
})
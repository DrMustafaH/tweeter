$(document).ready(function () {

  // logic to control the tweet button and make it form a tweet (in the server) without getting sent to the /tweets page
  const $form = $('#tweet-form');
  $form.submit(function (event) {
    event.preventDefault();
    // Variables to handle XSS and errors
    const userText = $('#tweet-text').val();
    const escapedText = (escape(userText));
    const textLength = $('#tweet-text').val().length;
    const error = $('#errorhandle').slideDown();
    // logic to hide error on everytime tweet button clicked
    error.css("display", 'none');
    // error handling conditions
    if (textLength === 0) {
      error.text('⚠ You aren\'t humming ⚠ Please do , and remember to keep it below 140 ⚠');
      error.css("display", 'block');
      $('.newTweet').css("display", "none");
    } else if (textLength > 140) {
      error.text('⚠ You exceeded the character limit ⚠ Please keep it to 140⚠');
      error.css("display", 'block');
      $('.newTweet').css("display", "none");
      // logic to post tweet
    } else {

      $(".new-tweet").slideUp(1000);// if not error hide new tweet form (line 27 only)

      $.post("/tweets/", `text=${escapedText}`)
        .then((response) => {
          // when response comes refresh page, clear form and reset counter
          loadTweets();
          $("#tweet-text").val("");
          $(".counter").val("140");
        })
        .catch((err) => {
          error.text('⚠ Are you trying to hack me? ⚠ HAHA, try again!⚠');
          error.css("display", 'block');
        });
    }
  });
  // load tweets when page is first opened
  loadTweets();

  // logic to make the tweet form appear on clicking navbar and toggle typing automatically
  $(".newTweet").click(() => {
    $("#tweet-text").val("");// logic to handle text form in case of XSS error
    $(".counter").val("140");
    $('#errorhandle').css("display", "none");// logic to handle error message in case of XSS error
    $(".new-tweet").slideDown(1000);
    setTimeout(() => {
      $("#tweet-text").focus();
    }, 1000);
    $('.newTweet').css("display", "none");
  });

  // logic to scroll up on clicking scrollUp button
  $("#scrollTop").click(() => {
    $("html, body").animate({
      scrollTop: 0
    }, 500);
  });

  // logic to control when to show scroll button and when to hide
  $(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
      // $('.newTweet').css("display", "none");
      $('#scrollTop').fadeIn();
    } else {
      // $('.newTweet').fadeIn();
      $('#scrollTop').fadeOut(100);
    }
  });

  // when tweet button pressed and no error the write new tweet appears in navbar
  $("#tweet-button").click(() => {
    $('.newTweet').css("display", "block");
  });

});
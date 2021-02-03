$(document).ready(function () {

  // Logic to manupitale character counter in tweet and become red when exceed limit
  $("#tweet-text").on("input", function () {
    const myLength = $("#tweet-text").val().length;
    let counter = $(this).siblings("div").children(".counter");
    counter.text(140 - myLength);
    if (myLength > 140) {
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  })
});
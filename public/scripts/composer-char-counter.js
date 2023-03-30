
$(document).ready(function() {
  // Counter for remaining characters in tweet
  $('.new-tweet form textarea').on('input', function() {
    let tweetLength = $(this).val().length;
    let remainingChars = 140 - tweetLength;
    let counter = $(this).siblings('.button-counter').children('.counter');
    counter.text(remainingChars);
    if (remainingChars < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#244751');
    }
  });
});
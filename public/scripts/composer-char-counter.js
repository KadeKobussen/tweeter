$(document).ready(function() {
  $('.new-tweet form textarea').on('input', function() {
    let tweetLength = $(this).val().length;
    let remainingChars = 140 - tweetLength;
    let counter = $(this).siblings('.row').find('.counter');
    counter.text(remainingChars);
    if (remainingChars < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#244751');
    }
  });
  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    let formData = $(this).serialize();
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: formData,
  });
  });
  
});

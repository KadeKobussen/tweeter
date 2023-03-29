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
    let tweetLength = $(this).find('textarea').val().length;
    if (tweetLength === 0) {
      alert('Error: Tweet content is not present');
      return;
    }
    if (tweetLength > 140) {
      alert('Error: Tweet content is too long');
      return;
    }
    let formData = $(this).serialize();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
    });
  });
});
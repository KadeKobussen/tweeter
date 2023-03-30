

$(document).ready(function() {
  // Declare data variable here
  // Submit tweet form with validation
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
      success: function() {
        console.log('am i the drama?');
        $.get('/tweets', function(data) { // Load tweets using AJAX
          renderTweets([data[data.length-1]]); // Render only the last tweet
        });
        $('.new-tweet form')[0].reset(); // Reset form
        $('.new-tweet form .counter').text(140); // Reset character counter
      }
    });
  });
  // Define the createTweetElement and renderTweets functions here
  function createTweetElement(tweetData) {
    const date = new Date(tweetData.created_at);
    const $tweet = $('<article>').addClass('posted-tweets').html(`
      <header class="top-of-tweet">
        <div class="pfpuser">
          <img class="avatar" src="${tweetData.user.avatars}">
          <h3 class="username">${tweetData.user.name}</h3>
        </div>
        <h3 class="tag">${tweetData.user.handle}</h3>
      </header>
      <div class="content">
        <h4 class="tweet-text">${tweetData.content.text}</h4>
      </div>
      <footer class="sub-text">
        <h5 class="tweet-date">${new Date(tweetData.created_at)}</h5>
        <div class="sub-text-icons">
          <h6 class="flag"><i class="fa-solid fa-flag"></i></h6>
          <h6 class="retweet"><i class="fa-solid fa-retweet"></i></h6>
          <h6 class="heart"><i class="fa-solid fa-heart"></i></h6>
        </div>
      </footer>
    `);
    // protects text field from xss
    $tweet.find('.tweet-text').text(tweetData.content.text);

    return $tweet;
  }

  function renderTweets(tweets) {
    $('.tweets-container').empty(); // clear the container first
    // loop through the tweets array
    for (const tweet of tweets) {
      // create a new tweet element
      const $tweet = createTweetElement(tweet);
  
      // add the new tweet element to the top of the tweets container
      $('#tweets-container').prepend($tweet);
    }
  }
  
  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'json',
      success: function(tweets) {
        renderTweets(tweets);
      },
      error: function(err) {
        console.error('Error fetching tweets', err);
      }
    });
  }

  // Load the tweets when the page is ready
  loadTweets();
  // Call the renderTweets function with the tweets array
});


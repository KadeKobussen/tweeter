$(document).ready(function() {
  // Declare data variable here
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

    return $tweet;
  }

  function renderTweets(tweets) {
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty(); // Clear the container before rendering new tweets
    tweets.forEach((tweetData) => {
      const $tweet = createTweetElement(tweetData);
      $tweetsContainer.append($tweet);
    
    
    });
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
  renderTweets(tweets);
});
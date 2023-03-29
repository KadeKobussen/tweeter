$(document).ready(function() {
  // Declare data variable here
  const tweets = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Einstein",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@Albert"
      },
      "content": {
        "text": "Imagination is more important than knowledge."
      },
      "created_at": 1461116232227
    }
  ];

  // Define the createTweetElement and renderTweets functions here
  function createTweetElement(tweetData) {
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

  // Call the renderTweets function with the tweets array
  renderTweets(tweets);
});
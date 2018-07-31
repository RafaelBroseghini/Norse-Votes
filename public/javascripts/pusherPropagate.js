var pusher = new Pusher('9bf58a2a18527f003eb6', { cluster: 'us2' });
var socketId;

// retrieve the socket ID once we are connected
pusher.connection.bind('connected', function() {
    socketId = pusher.connection.socket_id;
});

pusher.subscribe('poll-events')
        .bind('vote', function (data) {
            var pollId = data.pollId;
            var choice = data.choice;
            var choiceId = data.choiceId;
            var voteCount = document.querySelector('#vote-count-' + pollId + '-' + choice);
            voteCount.textContent++;
            // we'll flash the colour for a moment
            var color = voteCount.style.color;
            setTimeout(function () {
                voteCount.style.color = color;
            }, 2000);
            voteCount.style.color = 'green';
        });
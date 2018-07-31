var vote = function (event) {
    event.preventDefault();
    var pollId = event.target.id;
    var choice = event.target.optionsRadios.value;
    // The first element below is used to find the input element with choice made bt user and
    // the third element is the id of choice to be passed to post route.
    var parentForm = event.target;
    var choiceElement = $(parentForm).find("input[value="+choice+"]")[0];
    var choiceId = $(choiceElement).data("id");

    // disable the button, so a user can't vote twice
    axios.post('polls/' + pollId + '/vote', {choice: choice, choiceId: choiceId, socketId: socketId});
    document.querySelector('#vote-btn-' + pollId).disabled = true;
    var voteCount = document.querySelector('#vote-count-' + pollId + '-' + choice);
    voteCount.textContent++;
    voteCount.style.color = 'green';
    voteCount.style.fontWeight = '900';
};
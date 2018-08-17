// Makes an axions "fetch" request to the server
// that returns all the polls the user has ever voted on.
function passPollIdsToDisableButtons(){    
    axios.get('/polls/mypolls')
    .then(function(response){
        return response.data
    })
    .then(function(data){
        disableButtons(data)
    })
}

// Cross checks button values with all the 
// polls an user has voted on and disables them.
function disableButtons(polls){
    let allButtons = document.querySelectorAll("button");
    for(var p of polls){
        for(var b of allButtons){
            if (b.value == p){
                b.disabled = true;
            }
        }
    }
}

passPollIdsToDisableButtons();

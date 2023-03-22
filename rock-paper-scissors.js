function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * choices.length);
    let computerChoice = choices[randomIndex];
    return computerChoice;

}

function playRound(playerChoice, computerChoice) {
    switch(playerChoice) {
        case "rock":
            if (computerChoice == "scissors") {
                return "You win! Rock crushes Scissors";
            }
            else if (computerChoice == "paper") {
                return "You lose! Paper covers Rock";
            }
            else return "It's a tie!";
        case "paper":
            if (computerChoice == "scissors") {
                return "You lose! Scissors cut paper";
            }
            else if (computerChoice == "rock") {
                return "You win! Paper covers rock";
            }
            else return "It's a tie!";
        case "scissors":
            if (computerChoice == "paper") {
                return "You win! Scissors cut paper";
            }
            else if (computerChoice == "rock") {
                return "You lose! Rock crushes scissors";
            }
            else return "It's a tie!";
    }
}

function displaySelections(playerChoice, computerChoice) {
    const selections = document.querySelector(".selections");
    const playerSelection = document.querySelector(".playerSelection");
    const computerSelection = document.querySelector(".computerSelection");
    
    selections.style.display = "flex";
    playerSelection.innerHTML = "You chose: " + playerChoice;
    computerSelection.innerHTML = "CPU chose: " + computerChoice;


}

function determineRoundWinner(result) {
    if (result == "You w") {
        return true;
    }
    else if (result == "You l") {
        return false;
    }
}

function updateDOM(playerScore, computerScore, result, message) {
    const announcer = document.querySelector(".message");
    const announcerBackground = document.querySelector(".announcements");
    const playerBoard = document.querySelector(".playerScore");
    const computerBoard = document.querySelector(".computerScore");

    announcer.innerHTML = message;

    if (result == "You w") {
        announcerBackground.style.backgroundColor = "LightGreen";
        announcerBackground.style.color = "black";
        playerBoard.innerHTML = "Your Score: " + playerScore;
        }
    else if (result == "You l") {
        announcerBackground.style.backgroundColor = "crimson";
        announcerBackground.style.color = "white";
        computerBoard.innerHTML = "Computer Score: " + computerScore;
    } 
    else { 
        announcerBackground.style.backgroundColor = "white";
        announcerBackground.style.color = "black";
    }          

}

function announceWinner(playerScore, computerScore) {
    const announcer = document.querySelector(".message");

    if (playerScore == 5) {
        setTimeout(function() {
            announcer.innerHTML = "You win the game!"
            return true;
        }, 1500);
    }
    else if (computerScore == 5){
        setTimeout(function() {
            announcer.innerHTML = "You lost to YOUR BINARY OVERLORDS"
            return true;
        }, 1500);
    }
    else return false;
}


const buttons = document.querySelectorAll("button");
let playerScore = 0;
let computerScore = 0;


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        //don't execute loop if there's already a winner
        if (playerScore == 5 || computerScore == 5) return;
        
        let playerChoice = button.className;
        
        //add visual feedback to player's button selection by briefly adding a class
        button.classList.add("selected");
        setTimeout(function() {
            button.classList.remove("selected")
        }, 1000);

        let computerChoice = getComputerChoice();

        displaySelections(playerChoice, computerChoice);
        
        
        //call playRound function to get a round winner                
        let message = playRound(playerChoice, computerChoice);
        let result = message.substring(0, 5);

        //update scores
        if (determineRoundWinner(result) == true) playerScore++;
        else if (determineRoundWinner(result) == false) computerScore++;

        //update DOM elements on UI
        updateDOM(playerScore, computerScore, result, message);

        //call announceWinner function to see if there's a winner yet
        if (announceWinner(playerScore, computerScore) == true) return;
    });
});
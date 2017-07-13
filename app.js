// Word selection
// Collection of words = ["Word", "Hint"]
let word = [["MacBook", "The laptop used to create this game."], ["Manchester United", "EPL Red Devils."], ["React", "One page web application framework."], ["New York", "The Empire State"], ["Dos Equis", "Stay thirsty my friends."], ["LinkedIn", "Checkout my professional profile on..."], ["Mets", "Th Amazings"], ["Hawaii", "An island in the Pacific Ocean."], ["John Snow", "King of the North"], ["Library", "You can borrow books, use computers, and take free classes here."]] 

// Game keyboard
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Game memory
let attempt = 0
let wordRemaining = []
let wrongletter = 0

// Web-page onload
window.onload = function() {
    gameId("moveCursor").addEventListener('touchmove', function(e) {
        windowHeight = window.innerHeight
        createY = e.touches[0].clientY
        letters = gameId("alphabet")
        resizing = windowHeight - createY - letters.offsetHeight
        if(resizing < 0) {
            resizing = 0
        } else if(resizing > windowHeight / 2) {
            resizing = windowHeight / 2
        }
        letters.style.bottom = resizing + "px"
    }, false)
    createLetterBoard()
}

// Start game
function startGame() {
    gameId("home").className = "theResults"
    gameId("result").className = "theResults"
    newGame()
}

// New game
function newGame() {
    clearLetters()
    clearGamer()
    createWord()
}

// Clear keyboard
function clearLetters() {
    let clearBoard = document.getElementsByClassName("createspan")
    for(a = 0; a < clearBoard.length; a++) {
        clearBoard[a].setAttribute("data", "")
    }
}

// Clear gamer
function clearGamer() {
    wrongletter = 0
    wordRemaining = []
    gameId("game0").setAttribute("data", "false")
    gameId("game1").setAttribute("data", "false")
    gameId("game2").setAttribute("data", "false")
    gameId("game3").setAttribute("data", "false")
    gameId("game4").setAttribute("data", "false")
    gameId("game5").setAttribute("data", "false")
    gameId("game5").setAttribute("beta", "false")
    gameId("game5").setAttribute("alpha", "false")
    gameId("game6").setAttribute("data", "false")
    gameId("game6").setAttribute("alpha", "false")
    gameId("game6").setAttribute("beta", "false")
    gameId("hintButton").setAttribute("data", "false")
    gameId("hint").style.display = "none"
}

// Get new word
function createWord() {
    let gameLetter = gameId("letter")
    gameLetter.innerHTML = ""
    attempt = Math.floor(Math.random() * word.length)
    for(a = 0; a < word[attempt][0].length; a++) {
        let x = word[attempt][0][a].toUpperCase()
        let createspan = document.createElement("span")
        createspan.className = "alpha" + (x == " " ? " ls" : "")
        createspan.innerHTML = "&nbsp"
        createspan.id = "alpha" + a;
        gameLetter.appendChild(createspan)
        
        if(x != " ") {
            if(wordRemaining.indexOf(x) == -1) {
                wordRemaining.push(x)
            }
        }
    }
}

// Create letters 
function createLetterBoard() {
    let cgb = gameId("board") //create game board
    cgb.innerHTML = ""
    for(a = 0; a < alphabet.length; a++) {
        let createspan = document.createElement("span")
        createspan.className = "createspan"
        createspan.innerText = alphabet[a]
        createspan.setAttribute("data", "")
        createspan.onclick = function() {
            createBoardSpan(this)
        }
        cgb.appendChild(createspan)
    }
}

// Game check, If show next error / game end
function createBoardSpan(a) {
    if(a.getAttribute("data") == "") {
        let x = isExist(a.innerText)
        a.setAttribute("data", x)
        if(x) {
            if(wordRemaining.length == 0) {
                gameOver(true)
            }
        } else {
            showWrongLetter()
        }
    }
}

// If letter "X" exist
function isExist(e) {
    e = e.toUpperCase()
    let x = wordRemaining.indexOf(e)
    if(x != -1) {
        wordRemaining.splice(x, 1)
        typeWord(e)
        return true
    }
    return false
}

// Show drawing
function showWrongLetter() {
    wrongletter++
    switch(wrongletter) {
        case 1:
            gameId("game0").setAttribute("data", "true")
            break;
        
        case 2:
            gameId("game1").setAttribute("data", "true")
            break;
        
        case 3:
            gameId("game2").setAttribute("data", "true")
            break;
        
        case 4:
            gameId("game3").setAttribute("data", "true")
            gameId("hintButton").setAttribute("data", "true")
            break;
        
        case 5:
            gameId("game4").setAttribute("data", "true")
            break;
        
        case 6:
            gameId("game5").setAttribute("data", "true")
            break;
        
        case 7:
            gameId("game5").setAttribute("alpha", "true")
            break;
        
        case 8:
            gameId("game5").setAttribute("beta", "true")
            break;
        
        case 9:
            gameId("game6").setAttribute("data", "true")
            gameId("game6").setAttribute("alpha", "true")
            break;
        
        case 10:
            gameId("game6").setAttribute("beta", "true")
            gameOver(false)
            break;
    }
}

function typeWord(e) {
    for(a = 0; a < word[attempt][0].length; a++) {
        if(word[attempt][0][a].toUpperCase() == e) {
            gameId("alpha" + a).innerText = e
        }
    }
}

// Game result
function gameOver(e) {
    let gameResult = gameId("result")
    gameResult.setAttribute("data", e)
    if(e) {
        gameId("titletile").innerText = "Winner Winner, Chicken Dinner!"
        gameId("bodytile").innerHTML = "Wow, you're good!<br/><br/>You've got it made!"
    } else {
        gameId("titletile").innerText = "Whomp Whomp Game Over!"
        gameId("bodytile").innerHTML = "Your word was <br/><br/>\"" + word[attempt][0].toUpperCase() + "\"<br/><br/>You'll get it in the next game."
    }
    gameResult.className = ""
}

// Show hint
function hint() {
    gameId("hintText").innerText = word[attempt][1]
    gameId("hint").style.display = "block"
}

// Exit hint
function hintExit() {
    gameId("hint").style.display = "none"
}

// Get HTML ID element by name
function gameId(a) {
    return document.getElementById(a)
}
const textContainer = document.getElementById("textContainer")
const buttonContainer = document.getElementById("buttonContainer")
const moneyContainer = document.getElementById("moneyContainer")

const cards = {
    array: [],
    addCard: function() {
        this.array.push(GetCard())
    },
    getString: function() {
        return this.array.join(" ")
    },
    getSum: function() {
        return this.array.reduce((x, y) => x + y, 0)
    },
    clear: function() {
        this.array = []
    },
    checkLose: function() {
        return this.getSum() > 21
    }

}

const dealerCards = {
    array: [],
    generateCards: function() {
        GetDealerCards(cards.getSum())
    },
    getString: function() {
        return this.array.join(" ")
    },
    getSum: function() {
        return this.array.reduce((x, y) => x + y, 0)
    },
    clear: function() {
        this.array = []
    },
}

const player = {
    name: "John",
    chips: 46,
    gameResult: "",
    give: function(amount) {
        player.chips += amount
    },
    take: function(amount) {
        player.chips -= amount
    }
}

SetUp()

function SetUp() {
    textContainer.innerHTML = '<h3>Do you want to start a game?</h3>'
    buttonContainer.innerHTML = '<button id="startBut-el">Start!</button>'
    let el = document.getElementById("startBut-el")
    el.addEventListener("click", Start)
}

function AddFundsRequest() {
    textContainer.innerHTML = '<h3>You are out of funds. Add chips to play.</h3>'
    buttonContainer.innerHTML = '<button id="addMoneyBut-el">Add funds</button>'
    document.getElementById("addMoneyBut-el").addEventListener("click", AddMoney)
}

function AddMoney() {
    player.chips += 50
    Start()
}

function Start() {
    if (player.chips < 10) {
        AddFundsRequest()
        return
    }
    else {
        cards.clear()
        dealerCards.clear()
        Render()                                 
    }
}

function Render() {
    let sum = cards.getSum()
    if (sum === 0) {sum = ""}

    textContainer.innerHTML =  `<p>Your Cards: ${cards.getString()}</p>
                                <p>Sum: ${sum}</p>`
    buttonContainer.innerHTML = `<button id="nextCardBut-el">Next Card</button>
                                    <button id="endBut-el">End</button>`
    moneyContainer.innerHTML =  `<p>Money: ${player.chips}</p>`
    document.getElementById("nextCardBut-el").addEventListener("click", NextCard)
    document.getElementById("endBut-el").addEventListener("click", End)        
}

function RenderEndGame() {
    let cardsSum = cards.getSum()
    if (cardsSum > 21) {
        textContainer.innerHTML =  `<h3>${player.gameResult}. Do you want to play again?</h3>
        <p>Your Cards: ${cards.getString()}</p>
        <p>Sum: ${cardsSum}</p>`
    }
    else {
        textContainer.innerHTML =  `<h3>${player.gameResult}. Do you want to play again?</h3>
        <p>Your Cards: ${cards.getString()}</p>
        <p>Sum: ${cardsSum}</p>
        <p>Dealer Cards: ${dealerCards.getString()}</p>
        <p>Sum: ${dealerCards.getSum()}</p>`
    }
    buttonContainer.innerHTML = `<button id="newGameBut-el">Start new game</button>`
    moneyContainer.innerHTML =  `<p>Money: ${player.chips}</p>`
    document.getElementById("newGameBut-el").addEventListener("click", Start)
    
}

function NextCard() {
    cards.addCard()
    if (cards.checkLose()) {
        End()
    }
    else {
        Render()
    } 
}

function End() {
    let result = cards.getSum()
    if (result > 21) {
        player.gameResult = "Lose"
        player.take(10)
    }
    else {
        dealerCards.generateCards()
        let dealerResult = dealerCards.getSum()     
        if (dealerResult === result) {
            player.gameResult = "Draw"
        }
        else if (result > dealerResult || dealerResult > 21) {
            player.gameResult  = "Won"
            player.give(10)
        }
        else {
            player.gameResult = "Lose"
            player.take(10)
        }
    }
    RenderEndGame()
}


function GetDealerCards(playerSum) {
    let dealerSum = 0
    while (dealerSum <= playerSum && dealerSum < 21) 
    {
        let card = GetCard()
        dealerSum += card
        dealerCards.array.push(card)
    }
}

function GetCard() {
    // ACE (1 and 11) return 11
    // Court card: a jack, queen or king (11-13) return 10
    let number = Math.floor(Math.random() * 13) + 1
    switch(number) 
    {
        case 1:
            return 11
        case 11:
            return 10
        case 12: 
            return 10
        case 13:
            return 10
        default:
            return number
    }
}
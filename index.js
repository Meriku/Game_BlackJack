let startEl = document.getElementById("start-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let cardsDealerEl = document.getElementById("cardsDealer-el")
let resultEl = document.getElementById("result-el")
let moneyEl = document.getElementById("money-el")
let startButEl = document.getElementById("startBut-el")
let endButEl = document.getElementById("endBut-el")
let nextCardButEl = document.getElementById("nextCardBut-el")

let cards = []
let dealerCards = []

let player = {
    name: "John",
    chips: 46,
    give: function(amount) {
        player.chips += amount
    },
    take: function(amount) {
        player.chips -= amount
    }
}

function Start() {

    if (player.chips < 10) {
        console.log("Add funds to play")
        return
    }

    cards = []
    dealerCards = []

    UpdateCards()
    UpdateSum()
    UpdateMoney()

    cardsDealerEl.textContent = ""
    Hide([startEl, startButEl, cardsDealerEl])
    Show([sumEl, cardsEl, nextCardButEl, endButEl])
}

function NextCard() {
    let newCard = GetCard()
    cards.push(newCard)
    UpdateCards()
    UpdateSum()
    CheckForLose()
}

function CheckForLose() {
    if (GetCardsSum() > 21) {
        End()
    }
}

function End() {

    let result = GetCardsSum()
    let dealerResult = GetDealerCards(result)

    
    if (result <= 21 && dealerResult === result) {
        Draw()
    }
    else if (result <= 21 && (result > dealerResult || dealerResult > 21)) {
        Won()
    }
    else {
        Lose()
    }
    
    EndGame()
}

function Lose() {
    startEl.textContent = "You lose. Want to start a new game?"
    player.take(10)
}
function Won() {
    startEl.textContent = "You won. Want to start a new game?"
    player.give(10)
}
function Draw() {
    startEl.textContent = "Draw. Want to start a new game?"
}

function EndGame() {
    Show([startEl, startButEl])
    Hide([nextCardButEl, endButEl])
    UpdateMoney()
}

function GetDealerCards(playerSum) {
    let dealerSum = 0
    while (dealerSum <= playerSum && dealerSum < 21) {
        let card = GetCard()
        dealerCards.push(card)
        dealerSum += card
        cardsDealerEl.innerText += " " + card 
    }
    cardsDealerEl.hidden = false
    cardsDealerEl.innerText += " Sum: " + dealerSum
    return dealerSum
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

function GetCardsSum() {
    let sum = 0

    for (let i = 0; i < cards.length; i++) {
        sum += cards[i]
    }
    return sum
}

function UpdateSum() {
    let sum = GetCardsSum()
    sumEl.textContent = "Sum: "
    if (sum > 0) {
        sumEl.textContent += sum
    }
}

function UpdateCards() {
    cardsEl.textContent = "Cards: "

    for (let i = 0; i < cards.length; i++) {
        if (i > 0) {
            cardsEl.textContent += ", "
        }
        cardsEl.textContent += cards[i]
    }  
}

function UpdateMoney() {
    moneyEl.textContent = "Money: " + player.chips 
}

function Hide(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].hidden = true
    }
}

function Show(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].hidden = false
    }
}
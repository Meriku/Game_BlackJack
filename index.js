let startEl = document.getElementById("start-el")
let sumEl = document.getElementById("sum-el")
let startButEl = document.getElementById("startBut-el")
let endButEl = document.getElementById("endBut-el")
let cardsEl = document.getElementById("cards-el")
let cardsDealer = document.getElementById("cardsDealer-el")
let resultEl = document.getElementById("result-el")
let gameEnded = true
let sum = 0
let dealerSum = 0

function Start() {
    
    if (gameEnded) {
        gameEnded = false
        Clear()
        startEl.hidden = true
        endButEl.hidden = false
        startButEl.innerText = "Add card"
    }
    
    let card = GetCard()
    UpdateSum(card)
    UpdateCards(card) 

    if (sum > 21) {
        End()
    }
    
}

function End() {
    gameEnded = true

    if (sum > 21) {
        resultEl.innerText = "Result:  You lose"
        startButEl.innerText = "Start again"
        startEl.hidden = false
        endButEl.hidden = true
    }
    else {
        if (GetDealerCards() > 21) {
            resultEl.innerText = "Result:  Victory"
            startButEl.innerText = "Start again"
            startEl.hidden = false
            endButEl.hidden = true
        }
        else {
            resultEl.innerText = "Result:  You lose"
            startButEl.innerText = "Start again"
            startEl.hidden = false
            endButEl.hidden = true
        }
    }
 
}

function GetDealerCards() {
    while (dealerSum < sum && dealerSum < 21) {
        let card = GetCard()
        dealerSum += card
        cardsDealer.innerText += " " + card 
    }
    cardsDealer.hidden = false
    cardsDealer.innerText += " Sum: " + dealerSum
    return dealerSum
}

function GetCard() {
    return Math.floor(Math.random() * 10 + 1)
}

function UpdateSum(card) {
    sum += card
    sumEl.innerText = "Sum: " + sum
}

function UpdateCards(card) {
    cardsEl.innerText += " " + card
}

function Clear() {
    sum = 0
    dealerSum = 0
    sumEl.innerText = "Sum: "
    cardsEl.innerText = "Cards: "
    cardsDealer.hidden = true
    cardsDealer.innerText = "Dealer's Cards:"
}
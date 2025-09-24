const board = document.getElementById("board")
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const turnInfo = document.getElementById("turnInfo")
const dice = document.getElementById("dice")
const button = document.getElementById("button")
const notif = document.getElementById("notif")
const notifWrap = document.getElementById("notifWrapper")
const winMsg = document.getElementById("winMsg")
const skills = document.getElementById("skill")
const skillMsg = document.getElementById("skillMsg")
const playerImg = document.getElementById("playerImg")
const startPosition = document.getElementById("startPosition")

const size = 10;
const cells = []
let dices
let player1Move = 0
let player2Move = 0
let turn = 0
let resetTimeout
let skillTimeout

const ladders = {
    4:{target : 25,
        path: "M236.5 569.5C243.416 569.371 243.731 567.118 247 559.5L280 474C281.5 470 285 468.5 290 468.5"
    },
    13:{target : 46,
        path: "M467 500.5L373 355C367.725 349.74 363.338 348.573 350.5 349"
    },
    42:{target : 63,
        path: "M115 332C120.048 328.177 121.921 325.138 124.5 319L153.5 237.5C155.908 230.735 159.891 229.457 169.5 229"
    },
    50:{target : 69,
        path: "M583 323.5C575.397 320.96 574 317 572 312.5C572 312.5 547 243 544.5 236C542 229 535.5 228.5 529.5 229"
    },
    62:{target : 81,
        path: "M107 205.5C100.257 203.557 97.15 200.705 93 192L65 114C63.3127 110.119 59.294 109.435 49.5 109.5"
    },
    74:{target : 92,
        path: "M416.5 145.5L509 53C512.128 49.6252 521.5 48 528 49"
    }
}

const snakes = {
    27:{target : 5,
        path: "M402 452C389.468 462.029 386.478 469.611 385 485C384.62 493.643 381.66 496.668 369.5 497.5C354.34 497.131 346.056 496.993 329 498.5C320.341 499.038 312.159 504.325 312 519C312.632 528.382 320.459 532.427 344.5 538C369.643 544.774 379.246 551.645 372.5 572.5C368.882 583.856 358.167 586.406 347 588C333.188 589.379 323.787 580.149 323 579.5C310.037 569.107 310.283 568.99 301.5 563.5C296.677 560.588 292.693 560.903 287 561 Q274 564 272 575 Q270 590 285 589"
    },
    40:{target : 3,
        path: "M53 399C72.8712 423.194 76.4139 439.361 75.5 469.5C73.4721 486.181 74.2845 491.18 88 492.5C97.9283 493.318 108.7969 492.446 118 495.5C128.696 500.969 133.354 509.024 133 526.5C132.85 542.882 130.074 552.161 127 573.5C126.044 590.77 125.16 593.482 138.5 595.5C154.698 597.199 162.712 594.14 169.5 593"
    },
    43:{target : 18,
        path:"M169.5 341C201.103 350.698 227.896 358.84 238 395C240.593 410.523 234.793 416.384 219.5 422.5C206.17 425.308 198.099 425.169 183.5 424C162.88 420.188 152.161 417.353 135 423C124.255 425.226 115.506 430.087 113 447C112.598 457.216 114.881 466.172 140.5 474L161.5 482C180.5 489.5 200 528 165.5 528"
    },
    54:{target : 31,
        path:"M405.5 280C419.212 290.375 415.471 300.373 415 310.5C407.662 333.331 423.799 345.257 443.5 346.5C466.985 346.418 481.507 346.332 508 345C527.359 345.063 536.338 347.691 540.5 362.5C543.721 376.845 541.45 381.463 540 395.5C539.014 404.837 541.148 415.061 550.5 416C557.566 416.481 562.115 416.267 574 417C586.806 417.638 587 416.5 587 410.5"
    },
    66:{target : 45,
        path: "M355.5 212C336.311 216.871 328.468 217.733 316 237C309.271 248.695 307.114 259.232 323 262C334.981 262.66 342.848 260.74 355.5 257C367.611 253.771 375.948 255.418 375.5 271.5C376.47 287.389 362.717 300.874 347.5 305C330.633 310.337 320.905 310.925 303.5 310.5C290.5 310.5 287 314.5 284.5 316C270.763 326.949 264.5 368.5 290 348.5"
    },
    89:{target : 53,
        path: "M523.5 95C534.727 101.331 538.493 106.798 540 120.5C539.235 136.099 539.834 144.855 544 160.5C546.853 170.352 545.472 175.526 536.5 184C525.156 190.617 516.975 192.084 501 193C488.987 195.301 485.898 199.964 485.5 213C486.866 227.348 488.265 235.332 491.5 249.5C493.532 259.643 494.717 261.463 489.5 272C486 277.5 477.5 286.5 468.5 288.5"
    },
    95:{target : 77,
        path: "M339 51.5C339 61 334.5 65.5 328 76L314.5 92.5C306.765 102.736 306.963 108.325 317 115C345.761 131.422 362.79 140.477 343.5 165C338.268 171.517 330.55 172.192 314.5 163C306.801 158.374 303.897 154.754 300.5 147C296.818 140.492 292.931 138.568 283.5 137.5C273.598 136.782 270.441 139.835 266 147C260.853 157.199 256.573 161.446 247.5 167.5C243 170.502 235 174 229 170"
    },
    99:{target : 41,
        path: "M109.5 55C119.5 63.5 125.938 74.6951 133 95C138.7 111.585 138.49 123.285 135.5 146C132.342 164.709 135.692 170.395 146.5 176C166.726 184.2 176.017 191.52 187 212C195.601 243.398 184.86 251.324 154.5 258.5C139.131 259.44 129.63 258.894 111.5 256.5C89.4987 255.57 82.0311 261.924 75.5 279C74.1699 293.741 74.0261 302.339 70.5 319C69.0185 326 60 341 51 348.5"
    }
}

function createCell(num){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
    cells[num] = cell
}

function checkTurn () {
    turnInfo.innerHTML = (turn % 2 === 0) ? "Player 1 Turn" : "Player 2 Turn";
    turnInfo.style.color = (turn % 2 === 0) ? "red" : "blue";
}

function winCondition(player, position) {
    function checkWin(player, colors) {
        notifWrap.style.display = "flex"
        notif.style.display = "flex"
        winMsg.innerText = `Player ${player} Win`
        notif.style.backgroundImage = `linear-gradient(to right, transparent, ${colors} 50%, transparent)`
        playerImg.src = `assets/image/player${player}.png`
        notif.style.animation = "animate 2s"
        notif.removeEventListener("animationend", reset)
        notif.addEventListener("animationend", reset, {once:true})
    }
    if (position === 100) {
        const color = player === 1 ? "red" : "blue"
        checkWin(player, color)
    }
}

function checkLadder(player, playerMove, playerElement) {
    if (ladders[playerMove]) {
        const ladderTarget = ladders[playerMove].target
        const ladderPath = ladders[playerMove].path
        playerMove = ladderTarget
        stepingSkills("Ladder", "grey", player)
        
        const notifLadderEnd = () => {
            skills.removeEventListener("animationend", notifLadderEnd);
            board.appendChild(playerElement)
            playerElement.style.animation = "none"
            playerElement.style.offsetPath = "none"
            void playerElement.offsetWidth
            requestAnimationFrame(() => {
            playerElement.style.offsetPath = `path('${ladderPath}')`;
            playerElement.style.animation = "skillAnimation 2.5s linear forwards"
            })
            const ladderEnd = () => {
                playerElement.style.animation = "none"
                playerElement.style.offsetPath = "none"
                cells[ladderTarget].appendChild(playerElement)
                playerElement.removeEventListener("animationend", ladderEnd)

            }
            playerElement.addEventListener("animationend", ladderEnd)
        }
        skills.addEventListener("animationend", notifLadderEnd);        
    }
    return playerMove
}

function checkSnake(player, playerMove, playerElement) {
    if (snakes[playerMove]) {
        const snakeTarget = snakes[playerMove].target
        const snakePath = snakes[playerMove].path
        playerMove = snakeTarget
        
        stepingSkills("Snake", "green", player)

        const notifSnakeEnd = () => {
            skills.removeEventListener("animationend", notifSnakeEnd);
            board.appendChild(playerElement)
            playerElement.style.animation = "none"
            playerElement.style.offsetPath = "none"
            void playerElement.offsetWidth
            requestAnimationFrame(() => {
            playerElement.style.offsetPath = `path('${snakePath}')`;
            playerElement.style.animation = "skillAnimation 4s linear forwards"
            })
        
            const snakeEnd = () => {
                playerElement.style.animation = "none"
                playerElement.style.offsetPath = "none"
                cells[snakeTarget].appendChild(playerElement)
                playerElement.removeEventListener("animationend", snakeEnd)

            }
            playerElement.addEventListener("animationend", snakeEnd)
        }
        skills.addEventListener("animationend", notifSnakeEnd);
    }
    return playerMove
}

function stepingSkills(skill, color, player) {
        notifWrap.style.display = "flex"
        skills.style.display = "flex"
        skillMsg.innerText = `Player ${player} get ${skill}`
        skills.style.backgroundImage = `linear-gradient(to right, transparent, ${color} 50%, transparent)`
        skills.style.animation = "none";
        void skills.offsetWidth
        skills.style.animation = "slide 2s"
        skills.removeEventListener("animationend", skillNotifRemove)
        skills.addEventListener("animationend", skillNotifRemove, {once:true})
}

function skillNotifRemove() {
    notifWrap.style.display = "none"
    skills.style.display = "none"

}

function moveBack(playerMove) {
    let moveBack
    if (playerMove > 100) {
        moveBack = playerMove - 100
        playerMove = 100 - moveBack
    }
    return playerMove
}

function reset() {
    player1Move = 0
    player2Move = 0
    turn = 0
    startPosition.appendChild(player1)
    startPosition.appendChild(player2)
    notifWrap.style.display = "none"
    notif.style.display = "none"
}

function movePlayer(playerNum, playerMove, playerElement) {
    let currentPos = playerMove
    let targetPos = playerMove + dices
    button.disabled = true
    let interval = setInterval(() => {
        currentPos++
        cells[currentPos].appendChild(playerElement)
        playerElement.style.animation = "none";
        void playerElement.offsetWidth
        playerElement.style.animation = "jump 0.3s";
        if (currentPos >= targetPos && targetPos <= 100) {
            clearInterval(interval)
            currentPos = checkLadder(playerNum,currentPos, playerElement)
            currentPos = checkSnake(playerNum, currentPos, playerElement)
            winCondition(playerNum, currentPos)
            button.disabled = false
            if (playerNum === 1) {
                player1Move = currentPos;
            } 
            else {
                player2Move = currentPos;
            }
        }

        if (currentPos === 100 && targetPos > 100) {
            clearInterval(interval)

            backward = moveBack(targetPos)
            let backInterval = setInterval(() => {
                currentPos--
                cells[currentPos].appendChild(playerElement)
                playerElement.style.animation = "none";
                void playerElement.offsetWidth
                playerElement.style.animation = "jump 0.3s";
                
                if (currentPos <= backward) {
                    clearInterval(backInterval)
                    currentPos = checkLadder(playerNum,currentPos, playerElement)
                    currentPos = checkSnake(playerNum, currentPos, playerElement)            
                    button.disabled = false
                    if (playerNum === 1) {
                        player1Move = currentPos;
                    } 
                    else {
                        player2Move = currentPos;
                    }
                }
            }, 500);
        }        
    }, 500);
    button.disabled = true
}

function diceRandomize() {
    dices = Math.floor(Math.random() *6) + 1
    dice.innerHTML = dices

    if (turn % 2 === 0) {
        player1.style.zIndex = "2"
        player2.style.zIndex = "1"
        player1Move = movePlayer(1, player1Move, player1)
    }
    else {
        player1.style.zIndex = "1"
        player2.style.zIndex = "2"
        player2Move = movePlayer(2, player2Move, player2)
    }
    turn++
    checkTurn()
}

for (let pos = 0; pos < size * size; pos++) {
    const rowFromTop = Math.floor(pos / size);
    const colFromLeft = pos % size;
    const rowFromBottom = (size - 1) - rowFromTop;
    const rowStart = rowFromBottom * size + 1;
    const rowEnd = rowStart + (size - 1);   
    const num = (rowFromBottom % 2 === 0)
      ? rowStart + colFromLeft
      : rowEnd - colFromLeft;   
      createCell(num)
}

checkTurn()
button.addEventListener("click", diceRandomize)
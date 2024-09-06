const gameScreen = document.getElementById('gameScreen')

gameScreen.style.width = '400px'
gameScreen.style.height = '600px'

let ballX = 50
let ballY = 30
let ballSpeed = 3
let ballDirectionX = 1 // -1 1
let ballDirectionY = 1 // -1 1

let playerX = gameScreen.clientWidth / 2 - 120 / 2
const playerSpeed = 5
let playerDirectionX = 0 // -1 0 1

let isGameOver = false
let score = 0

const ball = document.createElement('div')
ball.style.width = '50px'
ball.style.height = '50px'
ball.style.backgroundColor = 'tomato'
ball.style.borderRadius = '50%'
ball.style.position = 'absolute'
ball.style.left = `${ballX}px`
ball.style.top = `${ballY}px`

gameScreen.appendChild(ball)

const player = document.createElement('div')
player.style.width = '120px'
player.style.height = '20px'
player.style.backgroundColor = 'teal'
player.style.position = 'absolute'
player.style.left = `${playerX}px`
player.style.top = `calc(${gameScreen.clientHeight}px - 20px)`

gameScreen.appendChild(player)

const drawBall = () => {
  if (ballX > gameScreen.clientWidth - 50) {
    ballDirectionX *= -1
  }

  if (ballY > gameScreen.clientHeight - 50 - 15) {
    if (ballX > playerX && ballX < playerX + 120) {
      ballDirectionY *= -1
      score += 10
      ballSpeed *= 1.1
    } else {
      isGameOver = true
    }
  }

  if (ballX < 0) {
    ballDirectionX *= -1
  }

  if (ballY < 0) {
    ballDirectionY *= -1
  }

  ballX += ballDirectionX * ballSpeed
  ball.style.left = `${ballX}px`

  ballY += ballDirectionY * ballSpeed
  ball.style.top = `${ballY}px`
}

const drawPlayer = () => {
  playerX += playerDirectionX * playerSpeed
  if (playerX < 0) {
    playerX = 0
  }
  if (playerX > gameScreen.clientWidth - 120) {
    playerX = gameScreen.clientWidth - 120
  }
  player.style.left = `${playerX}px`
}

const drawScore = () => {
  document.querySelector('#score span').innerText = score
}

const intervalId = setInterval(() => {
  drawBall()
  drawPlayer()
  drawScore()
  if (isGameOver) {
    clearInterval(intervalId)
  }
}, 1000 / 60)

document.addEventListener('keydown', event => {
  if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
    // record going left
    playerDirectionX = -1
  }
  if (event.code === 'KeyD' || event.code === 'ArrowRight') {
    // record going left
    playerDirectionX = 1
  }
})

document.addEventListener('keyup', event => {
  if (
    event.code === 'KeyA' ||
    event.code === 'ArrowLeft' ||
    event.code === 'KeyD' ||
    event.code === 'ArrowRight'
  ) {
    // stop the player from moving
    playerDirectionX = 0
  }
})

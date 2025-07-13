//============================== VARIABLES ==============================

let canvas = document.querySelector('canvas')
canvas.width = 600
canvas.height = 400
const context = canvas.getContext('2d')

// dropdown menu buttons for number of disks
let one = document.getElementById('one')
let two = document.getElementById('two')
let three = document.getElementById('three')
let four = document.getElementById('four')
let five = document.getElementById('five')
let six = document.getElementById('six')

// move button
let move = document.getElementById('move')

// contains properties of all the disks
disks = [{ id: 1, length: 120, color: 'mediumblue' }, 
         { id: 2, length: 100, color: 'royalblue' }, 
         { id: 3, length: 80, color: 'green' },
         { id: 4, length: 60, color: 'yellow' }, 
         { id: 5, length: 40, color: 'orange' }, 
         { id: 6, length: 20, color: 'red' }]

let moves // contains move objects with source rod and destination rod property
let aRod, bRod, cRod // arrays to save disks on each rod

//============================== EVENT LISTENERS ==============================

one.addEventListener('click', function () {
  init(1)
})

two.addEventListener('click', function () {
  init(2)
})

three.addEventListener('click', function () {
  init(3)
})

four.addEventListener('click', function () {
  init(4)
})

five.addEventListener('click', function () {
  init(5)
})

six.addEventListener('click', function () {
  init(6)
})

move.addEventListener('click', function () {
  if (moves.length !== 0) {
    makeMove()
  }
})

//============================== FUNCTIONS ==============================

function init(numberOfDisks) {
  moves = []
  initDisks(numberOfDisks)
  getMoves(numberOfDisks, 'A', 'B', 'C')
  drawDisks()
}

function drawRods() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'black'
  context.fillRect(30, 350, 140, 20)
  context.fillRect(230, 350, 140, 20)
  context.fillRect(430, 350, 140, 20)

  context.fillRect(97, 100, 5, 250);
  context.fillRect(297, 100, 5, 250)
  context.fillRect(497, 100, 5, 250)
}

function drawDisks() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawRods()
  let y = 0
  for (let disk of aRod) {
    context.fillStyle = disk.color
    context.fillRect(30 + 10 * disk.id, 330 - 20 * y++, disk.length, 20)
  }
  y = 0
  for (let disk of bRod) {
    context.fillStyle = disk.color
    context.fillRect(230 + 10 * disk.id, 330 - 20 * y++, disk.length, 20)
  }
  y = 0
  for (let disk of cRod) {
    context.fillStyle = disk.color
    context.fillRect(430 + 10 * disk.id, 330 - 20 * y++, disk.length, 20)
  }
}

// places given number of disks on the starting rod
function initDisks(numberOfDisks) {
  aRod = []
  bRod = []
  cRod = []
  for (let i = numberOfDisks; i > 0; i--) {
    aRod.push(disks[numberOfDisks - i])
  }
}

// computes moves to solve the tower of hanoi puzzle
function getMoves(numberOfDisks, startRod, helpRod, destRod) {
  if (numberOfDisks === 1) {
    moves.push({ start: startRod, dest: destRod })
    moves = moves.filter(move => move.start !== undefined)
  } else {
    getMoves(numberOfDisks - 1, startRod, destRod, helpRod)
    moves.push({ start: startRod, dest: destRod })
    getMoves(numberOfDisks - 1, helpRod, startRod, destRod)
  }
}

function makeMove() {
  let move = moves.shift()
  if (move.start === 'A') {
    let tmp = aRod.pop()
    if (move.dest === 'B') {
      bRod.push(tmp)
    } else {
      cRod.push(tmp)
    }
  } else if (move.start === 'B') {
    let tmp = bRod.pop()
    if (move.dest === 'A') {
      aRod.push(tmp)
    } else {
      cRod.push(tmp)
    }
  } else {
    let tmp = cRod.pop()
    if (move.dest === 'A') {
      aRod.push(tmp)
    } else {
      bRod.push(tmp)
    }
  }
  drawDisks()
}

//============================== MAIN ==============================

drawRods()

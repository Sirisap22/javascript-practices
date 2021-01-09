document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startButton = document.querySelector("#start-button");
  const width = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;

  // Tetrominoes
  const lShapeTetrominoes = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];
  const skewShapeTetrominoes = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];
  const tShapeTetrominoes = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];
  const squareShapeTetrominoes = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];
  const straightShapeTertrominoes = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const tetrominoes = [
    lShapeTetrominoes,
    skewShapeTetrominoes,
    tShapeTetrominoes,
    squareShapeTetrominoes,
    straightShapeTertrominoes,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  // randomly select a Tetromino and its first rotation.
  let random = Math.floor(Math.random() * tetrominoes.length);
  let current = tetrominoes[random][currentRotation];

  // draw the tetromino.
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
    });
  }

  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
    });
  }

  // make the tetromino move down every second.
  // timerId = setInterval(moveDown, 1000);

  document.addEventListener("keyup", control);

  //assign functions to keyCodes
  function control(event) {
    if (event.keyCode === 37) {
      moveLeft();
    } else if (event.keyCode === 38) {
      rotate();
    } else if (event.keyCode === 39) {
      moveRight();
    } else if (event.keyCode === 40) {
      moveDown();
    }
  }

  // move down function.
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // freeze functiom.
  function freeze() {
    if (
      current.some((index) => squares[currentPosition + index + width].classList.contains("taken"))
    ) {
      current.forEach((index) => squares[currentPosition + index].classList.add("taken"));
      // start a new tetromino falling.
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * tetrominoes.length);
      current = tetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  // move the tetromino left, unless is at the edge or there is a blockage.

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some((index) => (currentPosition + index) % width === 0);

    if (!isAtLeftEdge) currentPosition -= 1;

    if (current.some((index) => squares[currentPosition + index].classList.contains("taken"))) {
      currentPosition += 1;
    }

    draw();
  }

  // move the tetromino right, unless is at the edge or there is a blockage.
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some((index) => (currentPosition + index) % width === width - 1);

    if (!isAtRightEdge) currentPosition += 1;

    if (current.some((index) => squares[currentPosition + index].classList.contains("taken"))) {
      currentPosition -= 1;
    }

    draw();
  }

  // rotate the teromino.
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      // if the current rotation gets to 4, make it back to 0.
      currentRotation = 0;
    }
    current = tetrominoes[random][currentRotation];
    draw();
  }

  //show up-next tetromino in mini-grind display.
  const displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 4;
  let displayIndex = 0;

  // the Tetrominoes without rotation.
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // skewTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetromino
    [0, 1, displayWidth, displayWidth + 1], //squareTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // straightTetromino
  ];

  // display the shape in the mini-grid display.
  function displayShape() {
    // remove any trace of a tetromino form the entire grid.
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
    });
    upNextTetrominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
    });
  }

  // add functionality to button.
  startButton.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * tetrominoes.length);
      displayShape();
    }
  });

  // add score
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("tetromino");
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  // game over
  function gameOver() {
    if (current.some((index) => squares[currentPosition + index].classList.contains("taken"))) {
      scoreDisplay.innerHTML = "end";
      clearInterval(timerId);
    }
  }
});

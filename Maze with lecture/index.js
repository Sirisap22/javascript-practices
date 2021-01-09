const { Engine, Render, Runner, World, Bodies, Body, Events, Composite } = Matter;

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
  if (
    (parseInt(document.querySelector("#cellsHorizontal").value) > 0 &&
      parseInt(document.querySelector("#cellsHorizontal").value) <= 50) ||
    (parseInt(document.querySelector("#cellsVertical").value) > 0 &&
      parseInt(document.querySelector("#cellsVertical").value) <= 50)
  ) {
    startGame();
  } else {
    const error = document.querySelector(".error");
    error.classList.remove("hidden");
    setTimeout(() => {
      error.classList.add("hidden");
    }, 300);
  }
});

const startGame = () => {
  const widthConfig = parseInt(document.querySelector("#cellsHorizontal").value);
  const heightConfig = parseInt(document.querySelector("#cellsVertical").value);
  createCanvas();
  generateMaze(widthConfig, heightConfig);
};

const createCanvas = () => {
  const gameWindow = document.createElement("div");
  gameWindow.classList.add("gameOnStart");
  document.querySelector(".game").append(gameWindow);
};

const deleteCanvas = () => {
  if (document.querySelector(".gameOnStart")) {
    document.querySelector(".gameOnStart").remove();
  }
};

const generateMaze = (cellsHorizontal = 20, cellsVertical = 15) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const unitLengthX = width / cellsHorizontal;
  const unitLengthY = height / cellsVertical;

  const engine = Engine.create();
  engine.world.gravity.y = 0;
  const { world } = engine;
  const render = Render.create({
    element: document.querySelector(".gameOnStart"),
    engine: engine,
    options: {
      wireframes: false,
      width,
      height,
    },
  });

  Render.run(render);
  Runner.run(Runner.create(), engine);

  // Walls

  const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 2, height, { isStatic: true }),
  ];
  World.add(world, walls);

  // Maze generation

  const shuffle = (arr) => {
    let counter = arr.length;

    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);

      counter--;

      const temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
    }

    return arr;
  };

  const grid = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));

  const verticals = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal - 1).fill(false));

  const horizontals = Array(cellsVertical - 1)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));

  const startRow = Math.floor(Math.random() * cellsVertical);
  const startColumn = Math.floor(Math.random() * cellsHorizontal);

  const stepThroughCell = (row, column) => {
    if (grid[row][column]) {
      return;
    }

    grid[row][column] = true;

    // Assemble randomly-ordered list of neighbors
    const neighbors = shuffle([
      [row - 1, column, "up"],
      [row, column + 1, "right"],
      [row + 1, column, "down"],
      [row, column - 1, "left"],
    ]);

    // For each neighbor...
    for (let neighbor of neighbors) {
      const [nextRow, nextColumn, direction] = neighbor;

      // See if that neigbor is out of bounds
      if (
        nextRow < 0 ||
        nextRow >= cellsVertical ||
        nextColumn < 0 ||
        nextColumn >= cellsHorizontal
      ) {
        continue;
      }

      // If we have visited that neighbor, continue to next neighbor
      if (grid[nextRow][nextColumn]) {
        continue;
      }

      // Remove a wall from either horizontals or verticals
      if (direction === "left") {
        verticals[row][column - 1] = true;
      } else if (direction === "right") {
        verticals[row][column] = true;
      } else if (direction === "up") {
        horizontals[row - 1][column] = true;
      } else if (direction === "down") {
        horizontals[row][column] = true;
      }

      // Recursion (Visit that next cell)
      stepThroughCell(nextRow, nextColumn);
    }
  };

  stepThroughCell(startRow, startColumn);

  /* Drawing Horizontal Segments */

  horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      if (open) {
        return;
      }

      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX / 2,
        rowIndex * unitLengthY + unitLengthY,
        unitLengthX,
        5,
        {
          label: "wall",
          isStatic: true,
        }
      );
      World.add(world, wall);
    });
  });

  /* Drawing Vertical Segments */

  verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      if (open) {
        return;
      }

      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX,
        rowIndex * unitLengthY + unitLengthY / 2,
        5,
        unitLengthY,
        {
          label: "wall",
          isStatic: true,
        }
      );
      World.add(world, wall);
    });
  });

  // Goal

  const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * 0.7,
    unitLengthY * 0.7,
    {
      label: "goal",
      isStatic: true,
      render: {
        fillStyle: "gold",
      },
    }
  );

  World.add(world, goal);

  // Ball

  const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
  const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
    label: "ball",
  });
  World.add(world, ball);

  const detectMove = (event) => {
    const { x, y } = ball.velocity;

    if (event.keyCode === 87) {
      Body.setVelocity(ball, { x, y: Math.max(y - 2, -8) });
    }

    if (event.keyCode === 68) {
      Body.setVelocity(ball, { x: Math.min(x + 2, 8), y });
    }

    if (event.keyCode === 83) {
      Body.setVelocity(ball, { x, y: Math.min(y + 2, 8) });
    }

    if (event.keyCode === 65) {
      Body.setVelocity(ball, { x: Math.max(x - 2, -8), y });
    }
  };

  document.addEventListener("keydown", detectMove);
  // Win Condition

  Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
      const label = ["ball", "goal"];

      if (label.includes(collision.bodyA.label) && label.includes(collision.bodyB.label)) {
        document.querySelector(".restart-button").classList.remove("hidden");
        document.querySelector(".winner").classList.remove("hidden");
        world.gravity.y = 1;
        world.bodies.forEach((body) => {
          if (body.label === "wall") {
            Body.setStatic(body, false);
          }
        });
      }
    });
  });

  const restartButton = document.querySelector(".restart-button");
  restartButton.addEventListener("click", () => {
    document.querySelector(".winner").classList.add("hidden");
    document.querySelector(".restart-button").classList.add("hidden");
    for (let body of Composite.allBodies(world)) {
      Composite.remove(world, body);
    }
    engine.event = {};
    Render.stop(render);
    deleteCanvas();
  });
};

// startGame();

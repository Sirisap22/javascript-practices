/* 

            Matter JS Terminology (That used in this project.)
World -> Object that contains all of the different 'things' in our matter app.
Engine -> Reads in the current state of the world from the world object, then calculates 
changes in positions of all the different shapes.
Runner -> Gets the engine and world to work together. Runs about 60 times per second.
Render -> Whenever the engine processes an update, Render will take a look at all the different
shapes and show them on the screen.
Body -> A shape that we are displaying. Can be a circle, rectangle, oval, etc..



*/
const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const cellsHorizontal = 20;
const cellsVertical = 10;
const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create(); // When we create a Engine we get a World along with it.
engine.world.gravity.y = 0; // Disabling Gravity.
const { world } = engine;
const render = Render.create({
  element: document.body, // to 'Render element' inside document.body
  engine: engine,
  options: {
    /* Specify the height and width of canvas element (in pixel)*/
    wireframes: false,
    width,
    height,
  },
});

/* 

Get render element to start working and start to draw all 
the updates of the world onto the screen.

*/
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

/*

                Building a Maze
- Create a grid of 'cells'.
- Pick a random starting cell.
- For that cell, build a randomly-ordered list of neighbors.
- if a neighbor has been visited before, remove it from the list
- For each remaining neighbor, 'move' to it and remove the wall between those two cells.
- if there is no valid move back-track until get to the cell that have valid move and so on.. 
- Repeat for this new neighbor (line3).

                Detect Wall
- create two 2dimensional array call verticals and horizontals
- verticals array keep track of walls between x axis.
- horizontals array keep track of walls between y axis.
- the array stored boolean varible.
- the value is 'true' when there is 'no wall' and
the value 'false' when there 'is a wall'.

                Grid array
- 2D array call grid ,store boolean varibles.
- purpose of the grid array is to record whether or not the object has visited each individual cell.
- initialize every value as false.
- false mean that cell has not been visited yet.


*/

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

// Alternative Way
// const grid = [];
// for (let i = 0; i < 3; i++) {
//   grid.push([]);
//   for (let j = 0; j < 3; j++) {
//     grid[i].push(false);
//   }
// }

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const stepThroughCell = (row, column) => {
  // If i have visited the cell at [row, column], then return
  if (grid[row][column]) {
    return;
  }

  // Mark this cell as being visited
  grid[row][column] = true;

  /* 
  Assemble randomly-ordered list of neighbors
  if start row = row, column = column 
  Above = row - 1, column
  Right = row, column + 1
  Below = row + 1, column
  Left = row, column - 1
  */
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
// columnIndex * unitLength + unitLength/2 is x axis length to draw.
// rowIndex * unitLength + unitLength is y axis length to draw.
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
        // render: {
        //   fillStyle: "red",
        // },
      }
    );
    World.add(world, wall);
  });
});

/* Drawing Vertical Segments */
// columnIndex * unitLength + unitLength is x axis length to draw.
// rowIndex * unitLength + unitLength/2 is y axis length to draw.
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
        // render: {
        //   fillStyle: "red",
        // },
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

document.addEventListener("keydown", (event) => {
  const { x, y } = ball.velocity;

  if (event.keyCode === 87) {
    Body.setVelocity(ball, { x, y: Math.max(y - 5, -8) });
  }

  if (event.keyCode === 68) {
    Body.setVelocity(ball, { x: Math.min(x + 5, 8), y });
  }

  if (event.keyCode === 83) {
    Body.setVelocity(ball, { x, y: Math.min(y + 5, 8) });
  }

  if (event.keyCode === 65) {
    Body.setVelocity(ball, { x: Math.max(x - 5, -8), y });
  }
});

// Win Condition

Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    const label = ["ball", "goal"];

    if (label.includes(collision.bodyA.label) && label.includes(collision.bodyB.label)) {
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

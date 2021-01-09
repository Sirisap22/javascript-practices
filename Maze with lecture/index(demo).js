/* 

            Matter JS Terminology (That gonna use in this project.)
World -> Object that contains all of the different 'things' in our matter app.
Engine -> Reads in the current state of the world from the world object, then calculates 
changes in positions of all the different shapes.
Runner -> Gets the engine and world to work together. Runs about 60 times per second.
Render -> Whenever the engine processes an update, Render will take a look at all the different
shapes and show them on the screen.
Body -> A shape that we are displaying. Can be a circle, rectangle, oval, etc..



*/

const width = 800;
const height = 600;

const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

const engine = Engine.create(); // When we create a Engine we get a World along with it.
const { world } = engine;
const render = Render.create({
  element: document.body, // to 'Render element' inside document.body
  engine: engine,
  options: {
    /* Specify the height and width of canvas element (in pixel)*/
    width,
    height,
    wireframes: false,
  },
});

/* 

Get render element to start working and start to draw all 
the updates of the world onto the screen.

*/
Render.run(render);
Runner.run(Runner.create(), engine);

/* add ability to click and drag objects. */
World.add(
  world,
  MouseConstraint.create(engine, {
    /* Object that's going to have mouse property */
    mouse: Mouse.create(render.canvas),
  })
);

// Walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true }),
];
World.add(world, walls);

// Random Shapes

for (let i = 0; i < 20; i++) {
  if (Math.random() > 0.5) {
    World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50));
  } else {
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 35, {
        render: {
          fillStyle: "yellow",
        },
      })
    );
  }
}

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

*/

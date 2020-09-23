# Conway's Game of Life

This project fulfills the requirements for the Lambda School CS Unit 1 Build Week. For this project, we were building a version of Conway's Game of Life.

#### Link: https://tanksley-gameoflife.netlify.app/

## About the Game:

My concept for the game was originally to build it using an object constructor so each cell would be its own distinct object which would be controlled by setting state through the Context API. I chose this approach initially because I never felt very strong with Context and wanted an opportunity to practice with it.

I still might revisit the project to work out the bugs with that approach. For the sake of time, I pivoted to a simpler approach which used local state to handle the grid itself and global state to handle variables which affected the grid's execution and maintaining the generations.

### The Rules:

The rules of Conway's Game of Life are simple.

<ul>
    <li>
    Any live cell with two or three live neighbours survives.
    </li>
    <li>
    Any dead cell with three live neighbours becomes a live
    cell.
    </li>
    <li>
    All other live cells die in the next generation.
    Similarly, all other dead cells stay dead.
    </li>
</ul>
For each iteration (or generation as I'm calling them), each
cell will be evaluated according to these rules and will
either die or be reborn according to the rules provided.


#### Installation

```
Clone the project into the project directory. Once inside the project directory, you can run:

`yarn install` or `npm i`

Then:

`yarn start` or `npm start`
```

## License

This project is licensed under the MIT license. https://mit-license.org/

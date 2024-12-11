const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

const grid: string[][] = [];

for (const line of lines)
{
  grid.push(line.split(""));
}

const MAX_ROW = grid.length;
const MAX_COL = grid[0].length;

const start = (() =>
{
  for (let row = 0; row < MAX_ROW; row++)
  {
    for (let col = 0; col < MAX_COL; col++)
    {
      if (grid[row][col] === "^")
      {
        return [row, col];
      }
    }
  }

  return [-1, -1];
})();

// row, col
enum Direction
{
  UP = 1,
  DOWN = 2,
  LEFT = 3,
  RIGHT = 4,
}
const directions = {
  "UP": [1, 0],
  "DOWN": [-1, 0],
  "LEFT": [0, -1],
  "RIGHT": [0, 1],
};

const visited: Set<string> = new Set();
let row = start[0];
let col = start[1];

let direction: Direction = Direction.UP;

while (row >= 0 && row < MAX_ROW && col >= 0 && col < MAX_COL)
{
  visited.add(`${row},${col}`);

  switch (direction)
  {
    case Direction.UP:
      if (grid[row - 1] && grid[row - 1][col] === "#")
      {
        direction = Direction.RIGHT;
      }
      else
      {
        row -= 1;
      }
      break;
    case Direction.DOWN:
      if (grid[row + 1] && grid[row + 1][col] === "#")
      {
        direction = Direction.LEFT;
      }
      else
      {
        row += 1;
      }
      break;
    case Direction.LEFT:
      if (grid[row] && grid[row][col - 1] === "#")
      {
        direction = Direction.UP;
      }
      else
      {
        col -= 1;
      }
      break;
    case Direction.RIGHT:
      if (grid[row] && grid[row][col + 1] === "#")
      {
        direction = Direction.DOWN;
      }
      else
      {
        col += 1;
      }
      break;
    default:
      break;
  }
}

console.log("Part 1", visited.size);

function willLoop(oRow: number, oCol: number): boolean
{
  if (grid[oRow][oCol] === "#")
  {
    return false;
  }

  grid[oRow][oCol] = "#"; // modify the grid temporarily
  let [row, col] = start; // start at the very initial position
  let direction = Direction.UP;

  const seen: Set<string> = new Set();

  while (row >= 0 && row < MAX_ROW && col >= 0 && col < MAX_COL)
  {
    const vector = `${row},${col},${direction}`; // keep direction for loops
    if (seen.has(vector))
    {
      grid[oRow][oCol] = "."; // restore grid
      return true;
    }

    seen.add(vector);

    switch (direction)
    {
      case Direction.UP:
        if (grid[row - 1] && grid[row - 1][col] === "#")
        {
          direction = Direction.RIGHT;
        }
        else
        {
          row -= 1;
        }
        break;
      case Direction.DOWN:
        if (grid[row + 1] && grid[row + 1][col] === "#")
        {
          direction = Direction.LEFT;
        }
        else
        {
          row += 1;
        }
        break;
      case Direction.LEFT:
        if (grid[row] && grid[row][col - 1] === "#")
        {
          direction = Direction.UP;
        }
        else
        {
          col -= 1;
        }
        break;
      case Direction.RIGHT:
        if (grid[row] && grid[row][col + 1] === "#")
        {
          direction = Direction.DOWN;
        }
        else
        {
          col += 1;
        }
        break;
      default:
        break;
    }
  }

  grid[oRow][oCol] = "."; // restore grid
  return false;
}

let result = 0;
for (const position of visited)
{
  const [row, col] = position.split(",").map(Number);

  // don't place O at the starting position
  if (row === start[0] && col === start[1])
  {
    continue;
  }

  if (willLoop(row, col))
  {
    result += 1;
  }
}

console.log("Part 2", result);

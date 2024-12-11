const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");
lines.pop(); // remove last empty line

const XMAS = "XMAS";
const grid: string[][] = [];

for (const line of lines)
{
  grid.push(line.split(""));
}

const MAX_ROW = grid.length;
const MAX_COL = grid[0].length;

// (row, col)
const directions = [
  [1, -1], // up-left
  [1, 0], // up
  [1, 1], // up-right
  [0, 1], // right
  [-1, 1], // down-right
  [-1, 0], // down
  [-1, -1], // down-left
  [0, -1], // left
];

function dfs(row: number, col: number, idx: number, direction: number[]): number
{
  if (row >= MAX_ROW || col >= MAX_COL || row < 0 || col < 0)
  {
    return 0;
  }

  if (grid[row][col] !== XMAS[idx])
  {
    return 0;
  }

  if (idx === XMAS.length - 1)
  {
    return 1;
  }

  return dfs(
    row + direction[0],
    col + direction[1],
    idx + 1,
    direction,
  );
}

let result = 0;
for (let row = 0; row < MAX_ROW; row++)
{
  for (let col = 0; col < MAX_COL; col++)
  {
    if (grid[row][col] === XMAS[0])
    {
      for (const direction of directions)
      {
        result += dfs(row, col, 0, direction);
      }
    }
  }
}

console.log("Part 1:", result);
// DFS too complicated; can just search ring by ring

result = 0;
for (let row = 1; row < MAX_ROW - 1; row++)
{
  for (let col = 1; col < MAX_COL - 1; col++)
  {
    if (grid[row][col] === "A")
    {
      if (
        ((grid[row - 1][col - 1] === "M" && grid[row + 1][col + 1] === "S")
          || (grid[row - 1][col - 1] === "S" && grid[row + 1][col + 1] === "M")) // top-left and bottom-right
        && (
          (grid[row - 1][col + 1] === "M" && grid[row + 1][col - 1] === "S")
          || (grid[row - 1][col + 1] === "S" && grid[row + 1][col - 1] === "M") // top-right and bottom-left
        )
      )
      {
        result += 1;
      }
    }
  }
}

console.log("Part 2", result);

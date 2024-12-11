// Part 1
// test  = 2
// test2 = 4
// test3 = 1, 2 = 3
// test4 = 5, 6, 5, 3, 1, 3, 5, 3, and 5 = 36

// Part 2
// test  = 2
// test2 = 13
// test4 = 81
// test5 = 3
// test6 = 227
const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

const grid: number[][] = [];

for (const line of lines)
{
  grid.push(
    line.split("").map(x =>
    {
      if (x === ".") return -1;
      else return Number(x);
    }),
  );
}

const MAX_ROW = grid.length;
const MAX_COL = grid[0].length;

let result = 0;
for (let row = 0; row < MAX_ROW; row++)
{
  for (let col = 0; col < MAX_COL; col++)
  {
    if (grid[row][col] === 0)
    {
      const visited: Set<string> = new Set();

      const dfs = (row: number, col: number, prev: number, visited: Set<string>): number =>
      {
        if (row >= MAX_ROW || row < 0 || col >= MAX_COL || col < 0)
        {
          return 0;
        }

        if (grid[row][col] - 1 !== prev)
        {
          return 0;
        }

        if (grid[row][col] === 9)
        {
          visited.add(`${row},${col}`);
          return 1;
        }

        prev = grid[row][col];

        return dfs(row - 1, col, prev, visited)
          + dfs(row + 1, col, prev, visited)
          + dfs(row, col + 1, prev, visited)
          + dfs(row, col - 1, prev, visited);
      };

      dfs(row, col, -1, visited);
      result += visited.size;
    }
  }
}

console.log("Part 1", result);

result = 0;
for (let row = 0; row < MAX_ROW; row++)
{
  for (let col = 0; col < MAX_COL; col++)
  {
    if (grid[row][col] === 0)
    {
      const dfs = (row: number, col: number, prev: number): number =>
      {
        if (row >= MAX_ROW || row < 0 || col >= MAX_COL || col < 0)
        {
          return 0;
        }

        if (grid[row][col] - 1 !== prev)
        {
          return 0;
        }

        if (grid[row][col] === 9)
        {
          return 1;
        }

        prev = grid[row][col];

        return dfs(row - 1, col, prev)
          + dfs(row + 1, col, prev)
          + dfs(row, col + 1, prev)
          + dfs(row, col - 1, prev);
      };

      result += dfs(row, col, -1);
    }
  }
}

console.log("Part 2", result);

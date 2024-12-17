const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

const grid: string[][] = [];

for (const line of lines)
{
  grid.push(line.split(""));
}

const MAX_ROW = grid.length;
const MAX_COL = grid[0].length;

function part1()
{
  const visited: Record<string, Set<string>> = {}; // letter <> area

  function dfs(row: number, col: number, letter: string): number
  {
    if (row >= MAX_ROW || row < 0 || col >= MAX_COL || col < 0)
    {
      return 1;
    }

    if (grid[row][col] !== letter)
    {
      return 1;
    }

    const position = `${row},${col}`;
    if (!visited[letter])
    { // first time seeing this letter
      visited[letter] = new Set();
    }

    if (visited[letter].has(position))
    { // seen this letter at this position before
      return 0;
    }

    visited[letter].add(position);

    return dfs(row + 1, col, letter)
      + dfs(row - 1, col, letter)
      + dfs(row, col + 1, letter)
      + dfs(row, col - 1, letter);
  }

  let result = 0;
  for (let row = 0; row < MAX_ROW; row++)
  {
    for (let col = 0; col < MAX_COL; col++)
    {
      const letter = grid[row][col];
      const position = `${row},${col}`;

      if (letter in visited && visited[letter].has(position))
      {
        continue;
      }

      const prev = visited[letter]?.size || 0;
      const perimeter = dfs(row, col, letter);

      result += perimeter * (visited[letter].size - prev);
    }
  }

  console.log("Part 1", result);
}

part1();

function part2()
{
  function visitRegion(row: number, col: number, visited: Set<string>): [number, Set<string>]
  {
    const letter = grid[row][col];
    const borders: Set<string> = new Set();
    let area = 0;

    function dfs(row: number, col: number)
    {
      const position = `${row},${col}`;
      if (visited.has(position))
      {
        return;
      }

      visited.add(position);
      area += 1;

      for (const [rowN, colN] of [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]])
      {
        if (0 <= rowN && rowN < MAX_ROW && 0 <= colN && colN < MAX_COL && grid[rowN][colN] === letter)
        {
          dfs(rowN, colN);
        }
        else
        {
          borders.add(`${row},${col},${rowN},${colN}`);
        }
      }
    }

    dfs(row, col);
    return [area, borders];
  }

  function countSides(borders: Set<string>)
  {
    const visitedSides: Set<string> = new Set();

    function visitSide(side: string)
    {
      if (visitedSides.has(side) || !borders.has(side))
      {
        return;
      }

      visitedSides.add(side);

      const [row, col, rowN, colN] = side.split(",").map(Number);
      if (row === rowN)
      {
        visitSide(`${row - 1},${col},${rowN - 1},${colN}`);
        visitSide(`${row + 1},${col},${rowN + 1},${colN}`);
      }
      else if (col === colN)
      {
        visitSide(`${row},${col - 1},${rowN},${colN - 1}`);
        visitSide(`${row},${col + 1},${rowN},${colN + 1}`);
      }
    }

    let sides = 0;
    for (const side of borders)
    {
      if (visitedSides.has(side))
      {
        continue;
      }

      sides += 1;
      visitSide(side);
    }

    return sides;
  }

  const visited: Set<string> = new Set();
  let result = 0;
  for (let row = 0; row < MAX_ROW; row++)
  {
    for (let col = 0; col < MAX_COL; col++)
    {
      const position = `${row},${col}`;
      if (visited.has(position))
      {
        continue;
      }

      const [area, borders] = visitRegion(row, col, visited);
      result += area * countSides(borders);
    }
  }

  console.log("Part 1", result);
}

part2();

/*
All: https://www.reddit.com/r/adventofcode/comments/1hcdnk0/2024_day_12_solutions/
Better: https://www.reddit.com/r/adventofcode/comments/1hchskj/comment/m1p66kz/

Starting intuition:
Number of “sides” == number of “corners”

There are 2 types of corners:
  convex (outie)
  concave (innie)
A single square can count more than once as a corner
*/

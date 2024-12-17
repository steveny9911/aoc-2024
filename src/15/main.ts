const text = await Deno.readTextFile("input.txt");
const [s1, s2] = text.split("\n\n");

function part1()
{
  const moves = s2.split("\n").join("").split("");

  const grid: string[][] = [];
  for (const line of s1.split("\n"))
  {
    grid.push(line.split(""));
  }

  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;

  let [cx, cy] = (() =>
  {
    for (let row = 0; row < MAX_ROW; row++)
    {
      for (let col = 0; col < MAX_COL; col++)
      {
        if (grid[row][col] === "@")
        {
          return [row, col];
        }
      }
    }

    return [-1, -1];
  })();

  for (const move of moves)
  {
    const [dx, dy] = {
      "^": [-1, 0],
      "v": [1, 0],
      ">": [0, 1],
      "<": [0, -1],
    }[move]!;

    let [nx, ny] = [cx + dx, cy + dy];

    const boxes = [];
    while (grid[nx][ny] === "O")
    {
      boxes.push([nx, ny]);
      nx += dx;
      ny += dy;
    }

    if (grid[nx][ny] !== "#")
    {
      console.assert(grid[nx][ny] === ".");
      const moved = [[cx, cy]].concat(boxes).concat([[nx, ny]]); // coordinates to move
      for (let i = moved.length - 1; i > 0; i--)
      {
        const [x1, y1] = moved[i - 1];
        const [x2, y2] = moved[i];
        grid[x2][y2] = grid[x1][y1];
      }

      grid[cx][cy] = ".";
      cx += dx;
      cy += dy;
    }

    // grid.forEach(row => console.log(row.join(" ")))
  }

  let result = 0;
  for (let row = 0; row < MAX_ROW; row++)
  {
    for (let col = 0; col < MAX_COL; col++)
    {
      if (grid[row][col] === "O")
      {
        result += 100 * row + col;
      }
    }
  }

  console.log("Part 1", result);
}

part1();

function part2()
{
  const moves = s2.split("\n").join("").split("");

  let grid: string[][] = [];
  for (const line of s1.split("\n"))
  {
    grid.push(line.split(""));
  }

  const ngrid: string[][] = [];
  for (const row of grid)
  {
    const nrow = [];
    for (const c of row)
    {
      if (c === "#")
      {
        nrow.push("#");
        nrow.push("#");
      }
      else if (c === "O")
      {
        nrow.push("[");
        nrow.push("]");
      }
      else if (c === ".")
      {
        nrow.push(".");
        nrow.push(".");
      }
      else if (c === "@")
      {
        nrow.push("@");
        nrow.push(".");
      }
    }
    ngrid.push(nrow);
  }

  grid = ngrid;

  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;

  let [cx, cy] = (() =>
  {
    for (let row = 0; row < MAX_ROW; row++)
    {
      for (let col = 0; col < MAX_COL; col++)
      {
        if (grid[row][col] === "@")
        {
          return [row, col];
        }
      }
    }

    return [-1, -1];
  })();

  console.log("[cx, cy]", [cx, cy]);

  for (const move of moves)
  {
    const [dx, dy] = {
      "^": [-1, 0],
      "v": [1, 0],
      ">": [0, 1],
      "<": [0, -1],
    }[move]!;

    const toMove = [`${cx},${cy}`];
    let hitWall = false;
    for (const m of toMove)
    {
      const [x, y] = m.split(",").map(Number);
      const [nx, ny] = [x + dx, y + dy];
      if (grid[nx][ny] === "#")
      {
        hitWall = true;
        break;
      }

      if ("[]".includes(grid[nx][ny]))
      {
        if (!toMove.includes(`${nx},${ny}`))
        {
          toMove.push(`${nx},${ny}`);
        }

        if (grid[nx][ny] === "[" && !toMove.includes(`${nx},${ny + 1}`))
        {
          toMove.push(`${nx},${ny + 1}`);
        }

        if (grid[nx][ny] === "]" && !toMove.includes(`${nx},${ny - 1}`))
        {
          toMove.push(`${nx},${ny - 1}`);
        }
      }
    }

    if (hitWall)
    {
      continue;
    }

    const ngrid = grid.map(row => [...row]);
    for (const m of toMove)
    {
      const [x, y] = m.split(",").map(Number);
      ngrid[x][y] = ".";
    }
    for (const m of toMove)
    {
      const [x, y] = m.split(",").map(Number);
      ngrid[x + dx][y + dy] = grid[x][y];
    }

    grid = ngrid;

    cx += dx;
    cy += dy;

    // grid.forEach(row => console.log(row.join(" ")))
  }

  let result = 0;
  for (let row = 0; row < MAX_ROW; row++)
  {
    for (let col = 0; col < MAX_COL; col++)
    {
      if (grid[row][col] === "[")
      {
        result += 100 * row + col;
      }
    }
  }

  console.log("Part 2", result);
}

part2();

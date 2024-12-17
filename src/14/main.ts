const text = await Deno.readTextFile("input.txt");
const robots = text.split("\n");

// const MAX_X = 11;
// const MAX_Y = 7;

const MAX_X = 101;
const MAX_Y = 103;

interface vector
{
  x: number;
  y: number;
}

function printGrid(grid: number[][])
{
  let row = "";
  for (let y = 0; y < MAX_Y; y++)
  {
    for (let x = 0; x < MAX_X; x++)
    {
      const value = grid[x][y];
      if (value === 0)
      {
        row += ".";
      }
      else
      {
        row += `${grid[x][y]}`;
      }
    }
    row += "\n";
  }
  console.log(row);
}

function move(start: vector, velocity: vector, steps: number): vector
{
  let x = (velocity.x * steps + start.x) % MAX_X;
  if (x < 0)
  {
    x = MAX_X + x;
  }

  let y = (velocity.y * steps + start.y) % MAX_Y;
  if (y < 0)
  {
    y = MAX_Y + y;
  }

  return { x, y };
}

function safetyFactor(grid: number[][]): number
{
  interface quardant
  {
    start: vector;
    end: vector;
  }

  const q1: quardant = { start: { x: 0, y: 0 }, end: { x: Math.floor(MAX_X / 2), y: Math.floor(MAX_Y / 2) } };
  const q2: quardant = { start: { x: Math.ceil(MAX_X / 2), y: 0 }, end: { x: MAX_X, y: Math.floor(MAX_Y / 2) } };
  const q3: quardant = { start: { x: 0, y: Math.ceil(MAX_Y / 2) }, end: { x: Math.floor(MAX_X / 2), y: MAX_Y } };
  const q4: quardant = { start: { x: Math.ceil(MAX_X / 2), y: Math.ceil(MAX_Y / 2) }, end: { x: MAX_X, y: MAX_Y } };

  function sumQuardant(q: quardant): number
  {
    let sum = 0;
    for (let y = q.start.y; y < q.end.y; y++)
    {
      for (let x = q.start.x; x < q.end.x; x++)
      {
        sum += grid[x][y];
      }
    }

    return sum;
  }

  return sumQuardant(q1) * sumQuardant(q2) * sumQuardant(q3) * sumQuardant(q4);
}

const inital: number[][] = Array.from({ length: MAX_X }, () => Array(MAX_Y).fill(0));
const final: number[][] = Array.from({ length: MAX_X }, () => Array(MAX_Y).fill(0));

for (const robot of robots)
{
  const [px, py] = robot.split(" ")[0].split("=")[1].split(",").map(Number);
  const [vx, vy] = robot.split(" ")[1].split("=")[1].split(",").map(Number);

  inital[px][py] += 1;

  const end = move({ x: px, y: py }, { x: vx, y: vy }, 100);
  final[end.x][end.y] += 1;
}

console.log("Part 1", safetyFactor(final));

let image: number[][] = Array.from({ length: MAX_X }, () => Array(MAX_Y).fill(0));
for (let step = 0; step < 10000; step++)
{
  const visited: Set<string> = new Set();
  for (const robot of robots)
  {
    const [px, py] = robot.split(" ")[0].split("=")[1].split(",").map(Number);
    const [vx, vy] = robot.split(" ")[1].split("=")[1].split(",").map(Number);

    let nx = (px + vx * step) % MAX_X;
    if (nx < 0)
    {
      nx = MAX_X + nx;
    }

    let ny = (py + vy * step) % MAX_Y;
    if (ny < 0)
    {
      ny = MAX_Y + ny;
    }

    visited.add(`${nx},${ny}`);
    image[nx][ny] = 1;
  }

  if (visited.size === robots.length)
  {
    console.log("Part 2", step);
    printGrid(image);
    break;
  }
  else
  {
    image = Array.from({ length: MAX_X }, () => Array(MAX_Y).fill(0));
  }
}

// part 2 is stupid

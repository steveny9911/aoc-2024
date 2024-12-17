const text = await Deno.readTextFile("input.txt");
const machines = text.split("\n\n");

interface vector
{
  x: number;
  y: number;
}

/*
A = [ a b ]
    [ c d ]

det(A) = ad - bc

1/A = 1 / det(A) * [  d -b ]
                   [ -c  a ]

Ax = b

x = (1/A)b

x1 = (1/det(A)) * ( d * b1 + -b * b2)
x2 = (1/det(A)) * (-c * b1 +  a * b2)

*/

function solve(bA: vector, bB: vector, prize: vector): number
{
  const a = bA.x;
  const b = bB.x;
  const c = bA.y;
  const d = bB.y;

  const det = a * d - b * c;

  const A = d * prize.x + -b * prize.y;
  const B = -c * prize.x + a * prize.y;

  if (A % det === 0 && B % det === 0)
  { // integer check
    return 3 * (A / det) + 1 * (B / det);
  }
  else
  {
    return 0;
  }
}

let result = 0;
for (const machine of machines)
{
  const lines = machine.split("\n");

  const bA: vector = {
    x: Number(lines[0].split(",")[0].split("+")[1]),
    y: Number(lines[0].split(",")[1].split("+")[1]),
  };

  const bB: vector = {
    x: Number(lines[1].split(",")[0].split("+")[1]),
    y: Number(lines[1].split(",")[1].split("+")[1]),
  };

  const prize: vector = {
    x: Number(lines[2].split(",")[0].split("=")[1]),
    y: Number(lines[2].split(",")[1].split("=")[1]),
  };

  result += solve(bA, bB, prize);
}

console.log("Part 1", result);

result = 0;
for (const machine of machines)
{
  const lines = machine.split("\n");

  const bA: vector = {
    x: Number(lines[0].split(",")[0].split("+")[1]),
    y: Number(lines[0].split(",")[1].split("+")[1]),
  };

  const bB: vector = {
    x: Number(lines[1].split(",")[0].split("+")[1]),
    y: Number(lines[1].split(",")[1].split("+")[1]),
  };

  const prize: vector = {
    x: Number(lines[2].split(",")[0].split("=")[1]) + 10000000000000,
    y: Number(lines[2].split(",")[1].split("=")[1]) + 10000000000000,
  };

  result += solve(bA, bB, prize);
}

console.log("Part 2", result);

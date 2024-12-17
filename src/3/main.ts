const text = await Deno.readTextFile("input.txt");

let regex = /mul\((\d+),(\d+)\)/g;
let matches = [...text.matchAll(regex)];

let result = 0;
for (const match of matches)
{
  result += parseInt(match[1]) * parseInt(match[2]);
}

console.log("Part 1:", result);

let enabled = true;
regex = /mul\((\d+),(\d+)\)|do\(\)|don'?t\(\)/g;
matches = [...text.matchAll(regex)];
result = 0;
for (const match of matches)
{
  if (enabled && match[0].includes("mul"))
  {
    result += parseInt(match[1]) * parseInt(match[2]);
  }
  else
  {
    enabled = match[0] === "do()";
  }
}

console.log("Part 2:", result);

const text = await Deno.readTextFile("input.txt");
const [first, second] = text.split("\n\n");

const rules: Record<number, Set<number>> = {};
for (const line of first.split("\n"))
{
  const [before, after] = line.split("|").map(Number);
  if (rules[before])
  {
    rules[before].add(after);
  }
  else
  {
    rules[before] = new Set([after]);
  }
}

function validUpdates(updates: number[]): boolean
{
  const visited: Set<number> = new Set();
  for (const page of updates)
  {
    if (!rules[page])
    {
      visited.add(page);
      continue;
    }

    if (visited.size !== 0)
    {
      for (const v of visited)
      {
        if (rules[page].has(v))
        {
          // Invalid
          return false;
        }
      }
    }

    visited.add(page);
  }

  return true;
}

let result = 0;
for (const line of second.split("\n"))
{
  const updates = line.split(",").map(Number);

  if (validUpdates(updates))
  {
    result += updates[Math.floor(updates.length / 2)];
  }
}
console.log("Part 1", result);

result = 0;
for (const line of second.split("\n"))
{
  const updates = line.split(",").map(Number);

  const comparator = (a: number, b: number): number =>
  {
    if (rules[a]?.has(b))
    {
      return -1;
    }

    if (rules[b]?.has(a))
    {
      return 1;
    }

    return 0;
  };

  if (!validUpdates(updates))
  {
    result += updates[Math.floor(updates.sort(comparator).length / 2)];
  }
}
console.log("Part 2", result);

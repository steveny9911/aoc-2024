const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");
lines.pop(); // remove last empty line

function validReport(levels: number[]): boolean
{
  const increasing: boolean = levels[1] > levels[0]; // should check length

  for (let i = 0; i < levels.length - 1; i++)
  {
    const difference = levels[i + 1] - levels[i];
    if (!(Math.abs(difference) >= 1 && Math.abs(difference) <= 3))
    {
      return false;
    }

    if (difference > 0 && increasing)
    {
      // OK
    }
    else if (difference < 0 && increasing)
    {
      return false;
    }
    else if (difference > 0 && !increasing)
    {
      return false;
    }
    else if (difference < 0 && !increasing)
    {
      // OK
    }
  }

  return true;
}

let totalSafe = 0;
for (const report of lines)
{
  const levels = report.split(/\s+/).map(Number);

  if (validReport(levels))
  {
    totalSafe += 1;
  }
}

console.log("Part 1:", totalSafe);

totalSafe = 0;
for (const report of lines)
{
  const levels = report.split(/\s+/).map(Number);

  if (validReport(levels))
  {
    totalSafe += 1;
  }
  else
  {
    for (let j = 0; j < levels.length; j++)
    {
      if (validReport([...levels.slice(0, j), ...levels.slice(j + 1)]))
      {
        totalSafe += 1;
        break;
      }
    }
  }
}

console.log("Part 2:", totalSafe);

/*
function validReport(levels: number[]): boolean
{
  if (levels.length <= 2)
  {
    const difference = levels[1] - levels[0];
    return Math.abs(difference) >= 1 && Math.abs(difference) <= 3;
  }

  const increasing: boolean = levels[1] > levels[0]; // should check length
  let isSafe = true;

  for (let i = 0; i < levels.length - 1; i++)
  {
    const difference = levels[i + 1] - levels[i];
    if (!(Math.abs(difference) >= 1 && Math.abs(difference) <= 3))
    {
      isSafe = false;
    }

    if (difference > 0 && increasing)
    {
      // OK
    }
    else if (difference < 0 && increasing)
    {
      isSafe = false;
    }
    else if (difference > 0 && !increasing)
    {
      isSafe = false;
    }
    else if (difference < 0 && !increasing)
    {
      // OK
    }
  }

  if (!isSafe)
  {
    const results: boolean[] = [];
    for (let j = 0; j < levels.length; j++)
    {
      results.push(validReport([...levels.slice(0, j), ...levels.slice(j + 1)]));
    }

    return isSafe || results.reduce((acc, curr) => acc || curr, false);
  }

  return isSafe;
}
*/

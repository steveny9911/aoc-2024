const text = await Deno.readTextFile("input.txt");
const stones: string[] = text.split(" ");

// memorized recursive solve
// 1. location of each stone doesn't matter, just need to look at individual stone
// 2. don't care about the actual blink, only the length of the list matters (how many stones)

const DP: Record<string, number> = {};

// put stone through this number of blinks, what's the length of the resulting list
// e.g. 125   ==> will result in 1 item in the list (253000)
//      17    ==> result in two items in the list (1, 7)
//      253000 => result in two items in the list (253, 0)
function dp(stone: number, blink: number): number
{
  let result = -1;

  // memorized
  const key = `${stone},${blink}`;
  if (key in DP)
  {
    return DP[key];
  }

  if (blink === 0)
  { // nothing to do, the nubmer of stone is the item itself, so 1
    result = 1;
  }
  else if (stone === 0)
  { // if stone is 0, replace it with 1
    result = dp(1, blink - 1);
  }
  else if (stone.toString().length % 2 === 0)
  { // if stone is even, solve left and right
    const stoneString = stone.toString();
    const left = Number(stoneString.slice(0, stoneString.length / 2));
    const right = Number(stoneString.slice(stoneString.length / 2));
    result = dp(left, blink - 1) + dp(right, blink - 1);
  }
  else
  {
    result = dp(stone * 2024, blink - 1);
  }

  DP[key] = result;
  return result;
}

let result = 0;
for (const stone of stones)
{
  // per #2
  // since we don't actually need to care about the resulting list
  // we only need to find out how many stones there are
  // and per #1
  // we can operate on each stone individually
  result += dp(Number(stone), 25);
}

console.log("Part 1", result);

result = 0;
for (const stone of stones)
{
  result += dp(Number(stone), 75);
}

console.log("Part 2", result);

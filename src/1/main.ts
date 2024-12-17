const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");
lines.pop(); // remove last empty line

const leftList: number[] = [];
const rightList: number[] = [];

let totalDistance = 0;

for (const line of lines)
{
  const nums = line.split(/\s+/);
  leftList.push(parseInt(nums[0]));
  rightList.push(parseInt(nums[1]));
}

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

for (let i = 0; i < leftList.length; i++)
{
  totalDistance += Math.abs(leftList[i] - rightList[i]);
}

console.log("Part 1:", totalDistance);

let similarityScore = 0;

const frequency: Record<number, number> = {};
for (const num of rightList)
{
  frequency[num] = frequency[num] ?? 0;
  frequency[num]++;
}

for (const num of leftList)
{
  similarityScore += num * (frequency[num] ?? 0);
}

console.log("Part 2:", similarityScore);

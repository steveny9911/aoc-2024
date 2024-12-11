const text = await Deno.readTextFile("input.txt");
const input = text.split("").map(Number);

let fs: (number | string)[] = [];
for (let idx = 0, id = 0; idx < input.length; idx++)
{
  if (idx % 2 === 0)
  {
    fs.push(...new Array(input[idx]).fill(id));
    id += 1;
  }
  else
  {
    fs.push(...new Array(input[idx]).fill("."));
  }
}

let R = fs.length - 1;
for (let L = 0; L <= R; L++)
{
  if (fs[L] === ".")
  {
    fs[L] = fs[R];
    fs[R] = ".";

    do
    {
      R -= 1;
    }
    while (fs[R] === ".");
  }
}

function checkSum(arr: (number | string)[]): number
{
  let result = 0;
  for (let idx = 0; idx < arr.length; idx++)
  {
    if (arr[idx] === ".")
    {
      continue; // continue instead of break for part 2 where "." simply means empty
    }
    result += idx * Number(arr[idx]);
  }

  return result;
}

console.log("Part 1", checkSum(fs));

fs = [];

// starting location/index of a file
// and the length/size of that file
const fileIdx: number[] = [];
const fileSizes: number[] = [];

// starting location/index of an empty region
// and the length/size of that empty region
const emptyIdx: number[] = [];
const emptySizes: number[] = [];

for (let idx = 0, fid = 0; idx < input.length; idx++)
{
  const size = input[idx];

  if (idx % 2 === 0)
  { // create a file (file-id)
    fileIdx[fid] = fs.length;
    fileSizes[fid] = size;

    fs.push(...new Array(size).fill(fid));
    fid += 1;
  }
  // empty space
  else
  {
    emptyIdx.push(fs.length);
    emptySizes.push(size);

    fs.push(...new Array(size).fill("."));
  }
}

// console.log(`${fileIdx}`);
// console.log(`${fileSizes}`);
// console.log(`${fs.join("")}`);

// console.log(`${emptyIdx}`);
// console.log(`${emptySizes}`);
// console.log(`${fs.join(" ")}`);

if (fileIdx.length !== fileSizes.length || emptyIdx.length !== emptySizes.length)
{
  console.error("Length mismatch!");
}

for (let i = fileIdx.length - 1; i >= 0; i--)
{
  const fIdx = fileIdx[i];
  const freeNeed = fileSizes[i];

  // try to find an empty region, starting from the left / start of the file-system
  for (let j = 0; j < emptyIdx.length; j++)
  {
    const freeIdx = emptyIdx[j];
    const freeSpace = emptySizes[j];

    // don't move file to the right
    if (freeIdx > fIdx)
    {
      continue;
    }

    if (!freeSpace)
    {
      continue;
    }

    // found an empty region
    // update file-system
    // update emptyIdx and emptySizes
    // update fileIdx (fileSizes still the same)
    if (freeNeed <= freeSpace)
    {
      // break out of loop, when the entire file is moved
      // (can check if k is out of empty region's bound)
      for (let k = 0; k < freeNeed; k++)
      {
        fs[k + freeIdx] = fs[fIdx + k];
        fs[fIdx + k] = ".";
      }

      emptySizes[j] -= freeNeed;
      emptyIdx[j] += freeNeed;

      fileIdx[i] = freeIdx;

      break; // attempt to move once
    }
  }

  // console.log(`${fs.join(" ")}`);
}

// console.log(`${fs.join(" ")}`);
console.log("Part 2", checkSum(fs));

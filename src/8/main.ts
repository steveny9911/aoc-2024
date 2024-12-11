const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

const grid: string[][] = [];
const frequencies: Record<string, Set<string>> = {};

for (const line of lines)
{
  grid.push(line.split(""));
}

const MAX_ROW = grid.length;
const MAX_COL = grid[0].length;

for (let row = 0; row < MAX_ROW; row++)
{
  for (let col = 0; col < MAX_COL; col++)
  {
    const letter = grid[row][col];

    // convert to 1-index
    // transpose
    const position = `${col + 1},${row + 1}`;
    if (letter !== ".")
    {
      if (!frequencies[letter])
      {
        frequencies[letter] = new Set([position]);
      }
      else
      {
        frequencies[letter].add(position);
      }
    }
  }
}

// input: [[x, y]]
// check against "row, col" format
// 1-index
// transpose
function inBound(position: number[])
{
  const [x, y] = position;
  const [row, col] = [y - 1, x - 1];
  return row < MAX_ROW && row >= 0 && col < MAX_COL && col >= 0;
}

const antiNodes: Set<string> = new Set();
for (const [_, antennas] of Object.entries(frequencies))
{
  // has some duplicate works
  for (const a1 of antennas)
  {
    const [x1, y1] = a1.split(",").map(Number);

    for (const a2 of antennas)
    {
      const [x2, y2] = a2.split(",").map(Number);

      if (x1 === x2 && y2 === y1)
      {
        continue;
      }

      // transposed
      // can optimize duplicate loop here
      const antiNode = [(x2 - x1) * 2 + x1, (y2 - y1) * 2 + y1];
      if (inBound(antiNode))
      {
        antiNodes.add(`${antiNode[0]},${antiNode[1]}`);
      }
    }
  }
}

console.log("Part 1", antiNodes.size);

antiNodes.clear();
for (const [_, antennas] of Object.entries(frequencies))
{
  for (const a1 of antennas)
  {
    const [x1, y1] = a1.split(",").map(Number);

    for (const a2 of antennas)
    {
      const [x2, y2] = a2.split(",").map(Number);

      if (x1 === x2 && y1 === y2)
      {
        continue;
      }

      for (let i = 1;; i++)
      {
        const antiNode = [(x2 - x1) * i + x1, (y2 - y1) * i + y1];
        if (inBound(antiNode))
        {
          // console.log("pair:", [x1, y1], [x2, y2], "antinode:", `${antiNode[0]},${antiNode[1]}`);
          antiNodes.add(`${antiNode[0]},${antiNode[1]}`);

          // debug
          // const [row, col] = [antiNode[1] - 1, antiNode[0] - 1];
          // grid[row][col] = "#"
        }
        else
        {
          break;
        }
      }
    }
  }
}

console.log("Part 2", antiNodes.size);

/*

 1234567890
1T....#....
2...T......
3.T....#...
4.........#
5..#.......
6..........
7...#......
8..........
9....#.....
0..........


 123456789012
1##....#....#
2.#.#....0...
3..#.#0....#.
4..##...0....
5....0....#..
6.#...#A....#
7...#..#.....
8#....#.#....
9..#.....A...
0....#....A..
1.#........#.
2...#......##
*/

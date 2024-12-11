const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

let result = 0;
for (const line of lines)
{
  const values = line.split(" ");
  const answer = Number(values[0].slice(0, -1));
  const numbers = values.slice(1).map(Number);

  const dfs = (answer: number, numbers: number[], result: number): boolean =>
  {
    // must've used all numbers to get to a result
    if (numbers.length === 0)
    {
      return result === answer;
    }

    return dfs(answer, numbers.slice(1), result * numbers[0])
      || dfs(answer, numbers.slice(1), result + numbers[0]);
  };

  // set the first number as starting "result"
  // so can be used to * or + later in recusion
  //
  // 3267: 81 40 27
  // answer = 3267
  // numbers = [40, 27]
  // result = 81
  if (dfs(answer, numbers.slice(1), numbers[0]))
  {
    result += answer;
  }
}

console.log("Part 1", result);

result = 0;
for (const line of lines)
{
  const values = line.split(" ");
  const answer = Number(values[0].slice(0, -1));
  const numbers = values.slice(1).map(Number);

  const dfs = (answer: number, numbers: number[], result: number): boolean =>
  {
    // must've used all numbers to get to a result
    if (numbers.length === 0)
    {
      return result === answer;
    }

    return dfs(answer, numbers.slice(1), result * numbers[0])
      || dfs(answer, numbers.slice(1), result + numbers[0])
      || dfs(answer, numbers.slice(1), Number(`${result}${numbers[0]}`));
  };

  if (dfs(answer, numbers.slice(1), numbers[0]))
  {
    result += answer;
  }
}

console.log("Part 2", result);

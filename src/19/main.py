with open("input.txt") as f:
    s = f.read().strip()

s1, s2 = s.split("\n\n")

# dynamic programming memorization
# e.g. patterns: r, wr, b, g, bwu, rb, gb, br
# --- number of ways to get "brwrr"
#     for every prefix towel that can actually be used
#     solve(brwrr)
#     solve(rwrr) + solve(wrr)
#     ^ use "b"     ^ use "br"

patterns = set(s1.split(", ")) # towel patterns

cache = {}
def solve(s: str) -> int:
    """
    return number of ways to form the towel pattern
    """
    if s in cache:
        return cache[s]

    if len(s) == 0:
        return 1

    result = 0
    for towel in patterns:
        if s.startswith(towel):
            result += solve(s[len(towel):])

    cache[s] = result
    return result


result = 0
for l in s2.split("\n"):
    if solve(l) > 0:
        result += 1

print("Part 1:", result)

with open("input.txt") as f:
    s = f.read().strip().split("\n\n")

keys: list[tuple[int]] = []
locks: list[tuple[int]] = []

for l in s:
    l = l.split("\n")
    is_lock = False
    if l[0].startswith("###"):
        is_lock = True

    g = [list(r) for r in l]
    heights = [sum(1 for x in range(len(g)) if g[x][y] == "#") - 1 for y in range(len(g[0]))]

    if is_lock:
        locks.append(tuple(heights))
    else:
        keys.append(tuple(heights))

result = 0
for k in keys:
    for l in locks:
        good = True
    
        for ki, li in zip(k, l):
            if ki + li > 5:
                good = False
                break

        if good:
            result += 1

print("Part 1:", result)

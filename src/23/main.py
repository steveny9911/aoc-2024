from collections import defaultdict


with open("input.txt") as f:
    s = f.read().strip().split("\n")

g: dict[str, set[str]] = defaultdict(set)
for l in s:
    a, b = l.split("-")
    g[a].add(b)
    g[b].add(a)
"""
find all triplet / 3-connected / triangles in the graph
have many triangles have at least 1 starts with "t"
500 nodes should be find to brute force

make sure not to double/triple count triangles
since nodes are strings, we can compare them
a < b < c

result = 0
for a in g:
    for b in g[a]:
        if b > a:
            continue

        for c in g[b]:
            if c > b:
                continue

            if c not in g[a]:
                continue

            if a.startswith("t") or b.startswith("t") or c.startswith("t")
                result += 1
"""

result = 0
for a in g.keys():
    ag = a.startswith("t")

    for b in g.keys():
        if b not in g[a]:
            continue

        if a <= b:
            continue

        bg = b.startswith("t")
        cset = g[a] & g[b]
        for c in cset:
            if (c > a and c > b) and (ag or bg or c.startswith("t")):
                result += 1

print("Part 1:", result)

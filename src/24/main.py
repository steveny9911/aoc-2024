with open("input.txt") as f:
    s = f.read().strip()

inits, gates = s.split("\n\n")

g: dict[str, int] = {}
for l in inits.split("\n"):
    a, b = l.split(": ")
    b = int(b)
    g[a] = b

gd: dict[str, tuple[str, str, str]] = {}
for l in gates.strip().split("\n"):
    l = l.split(" ")
    a = l[0]
    op = l[1]
    b = l[2]
    out = l[-1]
    gd[out] = (a, b, op)

def dfs(reg: str) -> int:
    if reg not in g:
        a, b, op = gd[reg]
        left = dfs(a)
        right = dfs(b)
        if op == "OR":
            res = left | right
        elif op == "AND":
            res = left & right
        else:
            res = left ^ right
        g[reg] = res

    return g[reg]

zouts: dict[str, int] = {}
for reg in gd.keys():
    if reg.startswith("z"):
        zouts[reg] = dfs(reg)

keys = sorted(list(zouts.keys()))[::-1]
result = 0
for k in keys:
    result <<= 1
    result |= zouts[k]

print("Part 1:", result)

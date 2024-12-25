from heapq import heappush, heappop
from collections import defaultdict

with open("input.txt") as f:
    s = f.read().strip()

g = [list(r) for r in s.split("\n")]
row, col = len(g), len(g[0])

sx, sy = 0, 0
ex, ey = 0, 0
for r in range(row):
    for c in range(col):
        if g[r][c] == "S":
            sx, sy = r, c
            g[r][c] = "."
        elif g[r][c] == "E":
            ex, ey = r, c
            g[r][c] = "."

def adjs(state: tuple, allowed: int):
    x, y, c, q = state

    for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        nx, ny = x+dx, y+dy
        if nx not in range(row) or ny not in range(col):
            continue
        if g[nx][ny] == ".":
            yield 1, (nx, ny, c, False)
        elif g[nx][ny] == "#":
            if c < allowed and not q:
                yield 1, (nx, ny, c+1, True)


# dijkstra's

def solve() -> int:
    allowed = 0

    start = (sx, sy, 0, False) # start x, start y, cheats, allowed to cheat
    pq = []
    heappush(pq, (0, start))
    dists = defaultdict(lambda: float("inf"))

    while len(pq) > 0:
        dist, cur = heappop(pq)
        if cur[0] == ex and cur[1] == ey:
            return dist
        
        for d, adj in adjs(cur, allowed):
            if dist + d < dists[adj]:
                dists[adj] = dist + d
                heappush(pq, (dists[adj], adj))

base = solve()
result = 0
for r in range(row):
    # print(r)
    for c in range(col):
        if g[r][c] == "#": # remove every wall
            empty = 0
            for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                if r+dx in range(row) and c+dy in range(col) and g[r+dx][c+dy] == ".":
                    empty += 1

            if empty >= 2:
                g[r][c] = "."
                if base - solve() >= 100: # solve again to see if it's better
                    result += 1
                g[r][c] = "#"

# really slow
print("Part 1:", result)

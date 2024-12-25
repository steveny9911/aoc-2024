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

sd = 0
dirs = [(0,1), (-1,0), (0,-1), (1,0)]

def adjs(cur):
    """
    adjacency (x,y,dir)
                (x,y,dir-1)
                (x,y,dir+1)
                (x+dx,y+dy,dir) || wall
    """
    cx, cy, cd = cur
    yield 1000, (cx, cy, (cd-1) % 4)
    yield 1000, (cx, cy, (cd+1) % 4)
    dx, dy = dirs[cd]
    nx, ny = cx+dx, cy+dy
    if g[nx][ny] != "#":
        yield 1, (nx, ny, cd)

# dijkstra's
start = (sx, sy, sd)
pq: list[tuple[int, tuple[int, int]]] = []
heappush(pq, (0, start))
dists = defaultdict(lambda: float("inf"))
while len(pq) > 0:
    dist, cur = heappop(pq)
    (cx, cy, cd) = cur
    if (cx, cy) == (ex, ey):
        print("Part 1:", dist)
        break
    
    for d, adj in adjs(cur):
        if dist + d < dists[adj]:
            dists[adj] = dist + d
            heappush(pq, (dists[adj], adj))

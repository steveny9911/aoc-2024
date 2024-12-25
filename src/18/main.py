from heapq import heappush, heappop
from collections import defaultdict
from typing import Generator


with open("input.txt") as f:
    s = f.read().strip()

g: dict[tuple[int, int], str] = defaultdict(lambda: ".")
n = 71
m = 71

for l in s.split("\n")[:1024]:
    x, y = [int(i) for i in l.split(",")]
    g[x,y] = "#"

start = (0, 0)
target = (70, 70)

def adjs(cur: tuple[int, int]) -> Generator[tuple[int, tuple[int, int]]]:
    cx, cy = cur
    for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        nx, ny = cx + dx, cy + dy
        if nx in range(n) and ny in range(m) and g[nx, ny] == ".":
            yield 1, (nx, ny)
        
# dijkstra's
pq: list[tuple[int, tuple[int, int]]] = []
heappush(pq, (0, start))
dists = defaultdict(lambda: float("inf"))
dists[start] = 0
while len(pq) > 0:
    dist, cur = heappop(pq)
    if cur == target:
        print("Part 1:", dist)
        break
    
    for d, adj in adjs(cur):
        if dist + d < dists[adj]:
            dists[adj] = dist + d
            heappush(pq, (dists[adj], adj))

with open("input.txt") as f:
    s = f.read().strip().split("\n")

def step(n):
    z = n
    z ^= z * 64
    z %= 16777216
    z ^= z // 32
    z %= 16777216
    z ^= z * 2048
    z %= 16777216
    
    return z

result = 0
for l in s:
    z = 0
    n = int(l)
    for _ in range(2000):
        n = step(n)

    result += n

print("Part 1:", result)

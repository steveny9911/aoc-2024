with open("input.txt") as f:
    s = f.read().strip()

l1, l2 = s.split("\n\n")

regs = {}
for reg in l1.split("\n"):
    regs[reg[reg.find(":")-1]] = int(reg.split(" ")[2])

prog = [int(x) for x in l2.split(" ")[1].split(",")]

def select(operand):
    if 0 <= operand <= 3:
        return operand
    elif operand == 4:
        return regs["A"]
    elif operand == 5:
        return regs["B"]
    elif operand == 6:
        return regs["C"]
    else:
        raise Exception()

out = []
ip = 0
while ip < len(prog):
    ins = prog[ip]
    ip += 1
    operand = prog[ip]
    ip += 1

    if ins == 0:
        regs["A"] = regs["A"] // (1 << select(operand))
    elif ins == 1:
        regs["B"] ^= operand
    elif ins == 2:
        regs["B"] = select(operand) % 8
    elif ins == 3:
        if regs["A"] != 0:
            ip = operand
    elif ins == 4:
        regs["B"] = regs["B"] ^ regs["C"]
    elif ins == 5:
        out.append(select(operand) % 8)
    elif ins == 6:
        regs["B"] = regs["A"] // (1 << select(operand))
    elif ins == 7:
        regs["C"] = regs["A"] // (1 << select(operand))

print("Part 1:", ",".join(str(x) for x in out))

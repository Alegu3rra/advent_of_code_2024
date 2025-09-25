with open("./day_06.in") as fin:
    matri = [list(linea) for linea in fin.read().strip().split("\n")]

n = len(matri)
m = len(matri[0])

encontrado = False
for i in range(n):
    for j in range(m):
        if matri[i][j] == "^":
            encontrado = True
            break

    if encontrado:
        break

dd = [[-1, 0], [0, 1], [1, 0], [0, -1]]

ii = i
jj = j


dir = 0
visto = set()
while True:
    visto.add((i, j))

    next_i = i + dd[dir][0]
    next_j = j + dd[dir][1]

    if not (0 <= next_i < n and 0 <= next_j < n):
        break

    if matri[next_i][next_j] == "#":
        dir = (dir + 1) % 4
    else:
        i, j = next_i, next_j

def lopp(oi, oj):
    if matri[oi][oj] == "#":
        return False
    
    matri[oi][oj] = "#"
    i, j = ii, jj

    dir = 0
    seen = set()
    while True:
        if (i, j, dir) in seen:
            matri[oi][oj] = "."
            return True
        seen.add((i, j, dir))

        next_i = i + dd[dir][0]
        next_j = j + dd[dir][1]

        if not (0 <= next_i < n and 0 <= next_j < n):
            matri[oi][oj] = "."
            return False

        if matri[next_i][next_j] == "#":
            dir = (dir + 1) % 4
        else:
            i, j = next_i, next_j

ans = 0
for oi, oj in visto:
    loop = lopp(oi, oj)
    ans += loop

print(ans)
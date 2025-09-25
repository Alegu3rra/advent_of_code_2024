from collections import deque


def is_valid(x, y, rows, cols, grid, letter):
    return 0 <= x < rows and 0 <= y < cols and grid[x][y] == letter


def bfs(x, y, letter, rows, cols, grid, visited):
    queue = deque()
    queue.append((x, y, ''))
    area = 0
    perimeter = 0
    sides = set()
    side_count = 0

    while queue:
        cx, cy, direction = queue.popleft()

        if not is_valid(cx, cy, rows, cols, grid, letter):
            #revisar si ya tengo el lado
            if not (
                (cx + 1, cy, direction) in sides
                or (cx - 1, cy, direction) in sides
                or (cx, cy + 1, direction) in sides
                or (cx, cy - 1, direction) in sides
            ):
                side_count += 1

            # por si se contaron 2 veces, que esten conectaras a la misma posicion
            if ((cx + 1, cy, direction) in sides and (cx - 1, cy, direction) in sides) or (
                (cx, cy + 1, direction) in sides and (cx, cy - 1, direction) in sides
            ):
                side_count -= 1

            sides.add((cx, cy, direction))
            perimeter += 1
            continue

        
        if (cx, cy) in visited:
            continue

       
        visited.add((cx, cy))
        area += 1

        
        queue.append((cx + 1, cy, 'r'))  
        queue.append((cx, cy - 1, 'u'))
        queue.append((cx - 1, cy, 'l'))
        queue.append((cx, cy + 1, 'd'))

    return area, perimeter, side_count




def calculate_fencing_prices(grid):
    rows, cols = len(grid), len(grid[0])
    visited = set()
    total_perimeter_price = 0
    total_side_price = 0

    for i in range(rows):
        for j in range(cols):
            if (i, j) not in visited:
                letter = grid[i][j]
                area, perimeter, side_count = bfs(i, j, letter, rows, cols, grid, visited)

    
                total_perimeter_price += area * perimeter
                total_side_price += area * side_count

    return total_perimeter_price, total_side_price



grid = []
while True:
    try:
        line = input()
        grid.append(line)
    except EOFError:
        break

p1, p2 = calculate_fencing_prices(grid)
print(p1, p2)
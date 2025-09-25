const fs = require("fs");

const matxir = fs.readFileSync("./day_08.in", "utf8").trim().split("\n");

const n = matxir?.length;

function limite(x, y) {
    return x >= 0 && x < n && y >= 0 && y < n;
}

function* getAntinodos(a, b) {
    const [ax, ay] = a;
    const [bx, by] = b;

    const cx = ax - (bx - ax);
    const cy = ay - (by - ay);
    const dx = bx + (bx - ax);
    const dy = by + (by - ay);

    if (limite(cx, cy)) {
        yield [cx, cy];
    }
    if (limite(dx, dy)) {
        yield [dx, dy];
    }
}

const antinodos = new Set();
const locaciones = {};

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (matxir[i][j] !== ".") {
            if (!locaciones[matxir[i][j]]) {
                locaciones[matxir[i][j]] = [];
            }
            locaciones[matxir[i][j]].push([i, j]);
        }
    }
}

function getCombinaciones(array, r) {
    const results = [];

    function fnTemp(start, combo) {
        if (combo?.length === r) {
            results.push([...combo]);
            return;
        }

        for (let i = start; i < array?.length; i++) {
            combo.push(array[i]);
            fnTemp(i + 1, combo);
            combo.pop();
        }
    }

    fnTemp(0, []);
    return results;
}

for (const freq in locaciones) {
    const locs = locaciones[freq];
    const pairs = getCombinaciones(locs, 2);
    for (const [a, b] of pairs) {
        for (const antinode of getAntinodos(a, b)) {
            antinodos?.add(JSON.stringify(antinode)); // JSON.stringify para poder almacenar coordenadas únicas
        }
    }
}

console.log(antinodos?.size);
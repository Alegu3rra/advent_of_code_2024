const fs = require('fs');

let coordenadas = [[0,-1],[1,0],[0,1],[-1,0]];
let sidess = ["u", "r", "d", "l"];

const validOrillas = (i, j, n) => {
    return (0 <= i && i < n) && (0 <= j && j < n)
}

// DFS
let visitadosAllRegiones = new Set();
const regions = (i, j, matrix, n) => {
    let area = 0;
    let perimetro = 0;
    let lados = 0;


    let arrTempx = [];
    arrTempx.push(i);
    let arrTempy = [];
    arrTempy.push(j)
    let visitRegionSame = new Set();
    let visitSide = new Set();
    while (arrTempx?.length > 0) {
        let currentx = arrTempx.pop();
        let currenty = arrTempy.pop();

        // visitado para contemplar en cualquier region
        visitadosAllRegiones.add(JSON.stringify([currentx,currenty]));
        // visitado para su region y su respectivo conteo 
        if(visitRegionSame.has(JSON.stringify([currentx,currenty]))){
            continue;
        }
        visitRegionSame.add(JSON.stringify([currentx,currenty]));
        area ++;

        console.log("letra:", matrix[currentx][currenty], JSON.stringify([currentx,currenty]));
        // mira todas las coordenadas y mete en la pila todas las que se puedan recorrer
        for (let i = 0; i < coordenadas?.length; i++) {
            let k = currentx + coordenadas[i][0];
            let g = currenty + coordenadas[i][1];
            let s = sidess[i];

            // si se pasó
            //si es letra diferente
            if (!validOrillas(k, g, n) || matrix[currentx][currenty] != matrix[k][g]) {

                perimetro ++;
                // si no es un nodo vecino ya visitado
                if(!visitSide.has(JSON.stringify([k, g, s]))){
                    visitSide.add(JSON.stringify([k,g, s]));
                    lados ++;
                }

                if((visitSide.has(JSON.stringify([k+1, g, s])) && visitSide.has(JSON.stringify([k-1,g,s]))) ||
                (visitSide.has(JSON.stringify([k, g+1, s])) && visitSide.has(JSON.stringify([k,g-1,s])))){
                    lados--;
                }
                continue;
            }

            // si no visitado
            // console.log(JSON.stringify([k,g]))
            arrTempx.push(k)
            arrTempy.push(g)

            // console.log("después pila", arrTempx, arrTempy, k,g)
        }
    }
    console.log("area:", area, ", ", "perimetro:",perimetro, ",", "lados:", lados);
    return area * perimetro;
}

fs.readFile('file.txt', (err, data) => {
    if (err) throw err;

    // contar perímetro por cada nodo (sin contar otro nodo igual)
    // contar área por varios nodos juntos
    // marcar visitados los que ya fueron contados en un área
    // definir matriz de coordenadas sin diagonal

    let mapRegions = data.toString().split("\n");
    let mapSize = mapRegions.length;

    let res = 0;

    for (let i = 0; i < mapRegions.length; i++) {
        for (let j = 0; j < mapRegions[0].length; j++) {
            if(!visitadosAllRegiones.has(JSON.stringify([i,j]))){
                res += regions(i,j,mapRegions,mapSize);
            }
        }
    }

    console.log(res)

});
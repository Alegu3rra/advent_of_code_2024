const fs = require('fs');

let coordenadas = [[0,1], [1,0], [-1,0], [0,-1]];

const validOrillas = (i,j, n) => {
    return (0 <= i && i < n) && (0 <= j && j < n)
}

// DFS
const mapa = (i,j, matrix, n) => {

    if(matrix[i][j] != "0"){
        return 0;
    }

    let res = 0;


    let arrTempx = [];
    arrTempx.push(i);
    let arrTempy = [];
    arrTempy.push(j)
    let visitados = new Set();
    while(arrTempx?.length > 0){
        let currentx = arrTempx.pop();
        let currenty = arrTempy.pop();
        let crrentNumber = parseInt(matrix[currentx][currenty]);
        // si visitado
        if(visitados.has(JSON.stringify([currentx,currenty]))){
            // console.log("in")
            continue;
        }
        visitados.add(JSON.stringify([currentx,currenty]));
        // console.log(visitados)

        // si ultimo
        if(crrentNumber == 9){
            res += 1;
            // console.log(crrentNumber,res)
            continue;
        }
        // mira todas las coordenadas y mete en la pila todas las que se puedan recorrer
        for(let i = 0; i < coordenadas?.length; i ++){
            let k = currentx + coordenadas[i][0];
            let g = currenty + coordenadas[i][1];
            
            // si no se pasó
            if(!validOrillas(k,g,n)){
                continue;
            }
            let kgNumber = parseInt(matrix[k][g])
            if(kgNumber != crrentNumber+1){
                continue;
            }
            // console.log("antes pila", arrTempx, arrTempy, k,g)
            arrTempx.push(k)
            arrTempy.push(g)
            // console.log("después pila", arrTempx, arrTempy, k,g)
        }
    }
    console.log(res)
    return res;
}


fs.readFile('./file.txt', (err, data) => {
   if (err) throw err;

   let lines = data.toString().split("\n");

    console.log(lines)

    let n = lines?.length;

    let res = 0;
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            res += mapa(i,j, lines, n);
        }
    }

    console.log(res)

});
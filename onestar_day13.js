const fs = require('fs');

let findMinMoves = (prize, buttonA, buttonB) => {
    let res = 0;

    console.log(prize)
    console.log("a")


    return res;
}


fs.readFile('file.txt', (err, data) => {
    if (err) throw err;

    // contar perímetro por cada nodo (sin contar otro nodo igual)
    // contar área por varios nodos juntos
    // marcar visitados los que ya fueron contados en un área
    // definir matriz de coordenadas sin diagonal

    let lines = data.toString().split("\n");
    var regex = /(\d+)/g;
    
    let buttonA = new Set();
    let buttonB = new Set();
    let prizes = new Set();
    for (let i = 0; i < lines.length; i++) {
        if(!lines[i].search("Button A:")){
            buttonA.add(lines[i].match(regex));
        }
        if(!lines[i].search("Button B:")){
            buttonB.add(lines[i].match(regex));
        }
        if(!lines[i].search("Prize")){
            prizes.add(lines[i].match(regex));
        }
    }
    // console.log("buttonA",buttonA)
    // console.log("buttonB",buttonB)
    // console.log("prizes",prizes)


    let res = 0;

    for (let i = 0; i < prizes?.length; i++) {
        res += findMinMoves(prizes[i], buttonA[i], buttonB[i]);
    }

    console.log(res)

});
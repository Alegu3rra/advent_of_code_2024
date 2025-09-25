
const fs = require('fs');

let res = 0;
let fileSystem = null;
let line = null;

let grande = new Array(0).fill(line)
let tamaño = new Array(0).fill(line)


const make_fileSystem = (diskmap) => {
    let bloques = [];

    is_file = true;
    let id = 0;
    for (x in diskmap) {
        x = parseInt(diskmap[x]);
        if (is_file) {
            grande[id] = bloques?.length;
            tamaño[id] = x;
            bloques = [...bloques, ...new Array(x).fill(id)];
            id += 1;
            is_file = false;
        } else {
            bloques = [...bloques, ...new Array(x).fill(null)];
            is_file = true;
        }
        // console.log(bloques)
    }
    return bloques;
}

const mover = (arr) => {
    let temp = 0;

    while (tamaño[temp] > 0) {
        temp += 1
    }
    temp -= 1

    for (let i = temp; i >= 0; i--) {
        // console.log("a")
        let primer_libre = 0;
        let lugar_libre = 0;
        while (primer_libre < grande[i] && lugar_libre < tamaño[i]) {
            primer_libre += lugar_libre;
            lugar_libre = 0;
            
            while(arr[primer_libre] != null){
                primer_libre += 1;
            }
            while(primer_libre + lugar_libre < arr?.length && arr[primer_libre + lugar_libre] == null){
                lugar_libre += 1;
            }
        }
        if(primer_libre >= grande[i]){
            continue;
        }
        for(let j = primer_libre; j < primer_libre + tamaño[i]; j++){
            arr[j] = i;
        }
        for(let j = grande[i]; j < grande[i] + tamaño[i]; j++){
            arr[j] = null
        }
    }
    return arr
}

const suma = (arr) => {
    let res = 0;

    for (const [idx, elem] of arr.entries()) {
        if (elem != null) {
            res += idx * elem;
        }
    }

    return res;
}

fs.readFile('./day_09.in', (err, data) => {
    if (err) throw err;

    line = data.toString();
    // console.log(line);

    fileSystem = make_fileSystem(line);
    // console.log(fileSystem.toString());
    // console.log("\n");

    let movido = mover(fileSystem)


    // console.log(mover(fileSystem).toString());
    console.log(suma(movido));
});

// 6332189866718


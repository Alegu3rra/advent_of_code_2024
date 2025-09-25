
const fs = require('fs');

const make_fileSystem = (diskmap) => {
  let bloques = [];

  is_file = true;
  let id = 0;
  for(x in diskmap){
    x = parseInt(diskmap[x]);
    if(is_file){
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
  let primer_libre = 0;
  while(arr[primer_libre] != null){
    primer_libre += 1;
  }

  let i = arr?.length -1;
  while(arr[i] == null){
    i -= 1;
  }

  while(i > primer_libre){
    arr[primer_libre] = arr[i];
    arr[i] = null;
    while(arr[i] == null){
      i-= 1
    }
    while(arr[primer_libre] != null){
      primer_libre += 1
    }
  }
  return arr
}

const suma = (arr) => {
  let res = 0;

  for (const [idx, elem] of arr.entries()) {
    if(elem != null){
      res += idx * elem;
    }
  }

  return res;
}


let res = 0;
let fileSystem = null;
let line = null;


fs.readFile('./day_09.in', (err, data) => {
  if (err) throw err;

  line = data.toString();
  // console.log(line);
  
  fileSystem = make_fileSystem(line);
  // console.log(fileSystem.toString());
  // console.log("\n");
  
  res = suma(mover(fileSystem))
  // console.log(mover(fileSystem).toString());
  console.log(res);
});


const fs = require('fs');

let acc = new Set();
const broke_stones_tree = (stone, times) =>{
    let resAcc = 0;
    if(acc[(stone, times)] != undefined){
        // console.log(acc[(stone, times)])
        return acc[(stone, times)];
    }

    if(times == 0){
        //se devuelve uno
        resAcc = 1
    }

    else if(stone == 0){
        //se vuelve uno
        resAcc = broke_stones_tree(1,times-1)
    }

    else if((stone).toString().length % 2 == 0){
        //rompe en la mitad
        let stoneStr = (stone).toString();
        let left = parseInt(stoneStr.substring(0, stoneStr.length/2));
        let right = parseInt(stoneStr.substring(stoneStr.length/2, stoneStr.length));
        
        resAcc = broke_stones_tree(left, times-1) + broke_stones_tree(right, times-1);
    }

    else {
        // se multiplica por 2024
        resAcc = broke_stones_tree(stone * 2024, times - 1)
    }
    acc[(stone,times)] = resAcc;
    console.log(resAcc)
    return resAcc;
}

fs.readFile('file.txt', (err, data) => {
   if (err) throw err;

   let stones = data.toString().split(" ").map(Number);

    console.log(stones)

    let times = 25;

    let res = 0;
    
    for(let i = 0; i < stones.length; i++){
        res += broke_stones_tree(stones[i], times);
    }
    console.log(res)

});
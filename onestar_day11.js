const fs = require('fs');


const broke_stones = (stones) =>{
    let already_broken = [];
    for(let i=0; i<stones.length; i++){
        let stone = stones[i];
        if((stone).toString().length % 2 == 0){
            //rompe en la mitad
            already_broken.push(parseInt(((stone).toString()).substring(0, ((stone).toString().length)/2)));
            already_broken.push(parseInt(((stone).toString()).substring(((stone).toString().length)/2, ((stone).toString()).length)));
        }
        else if(stone == 0){
            //se vuelve uno
            already_broken.push(1);
        }
        // se multiplica por 2024
        else {
            already_broken.push(stone * 2024)
        }
    };
    // console.log(already_broken)
    return already_broken;
}

fs.readFile('file.txt', (err, data) => {
   if (err) throw err;

   let stones = data.toString().split(" ").map(Number);

    console.log(stones)

    let times = 25;

    let res = 0;
    
    for(let i = 0; i < times; i++){
        let actualStones = null;
        actualStones = broke_stones(stones);
        stones = actualStones;
        console.log(stones?.length)
    }
    console.log(stones?.length)

});
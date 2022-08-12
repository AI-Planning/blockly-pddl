const fs = require('fs');

fs.readFile('test.c', 'utf8', (err, data) => {
    if(err){
        console.log(err);
        return;
    }
    //console.log(data.toString());

    const regex = /\bs+(_Input)+[_a-zA-Z]*/g;
    const found = data.match(regex);
    const regex2 = /\bs+(_Entry)+[_a-zA-Z]*/g;
    const found2 = data.match(regex2);

    const hashSet1 = new Set();
    const hashSet2 = new Set();
    
    for(let i=0; i<found.length; i++){
        if(!hashSet1.has(found[i])){
            hashSet1.add(found[i]);
        }
    }

    for(let i=0; i<found2.length; i++){
        if(!hashSet2.has(found2[i])){
            hashSet2.add(found2[i]);
        }
    }

    console.log(hashSet1);
    console.log(hashSet2);
})

// module.exports = hashSet1;
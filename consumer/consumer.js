const client = require('./client');

async function go() {
    const names = await client.getNames();
    console.log("names");
    console.log(names);
    
    const createdName = await client.createName({first: 'Shima'});
    console.log("createdName");
    console.log(createdName);

    const namesAfterCreate = await client.getNames();
    console.log("namesAfterCreate");
    console.log(namesAfterCreate);
    
    const deletedName = await client.deleteName(createdName.id);
    console.log("deletedName");
    console.log(deletedName);
    
    const namesAfterDelete = await client.getNames();
    console.log("namesAfterDelete");
    console.log(namesAfterDelete);
}

go();

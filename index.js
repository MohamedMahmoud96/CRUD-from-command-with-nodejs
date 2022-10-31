
import fs from 'fs';
import yargs from 'yargs';


yargs.command({
    command:'add',
    decription:'create new user',
    bulider:{name: {demandOption:true, },},
    handler(argv){
     fs.readFile('./users.json', {encoding:"utf-8"}, (err,data) => {
        const users  = JSON.parse(data);
      
        const id = users[users.length - 1].id + 1;
        users.push({id , name : argv.name});
        fs.writeFileSync('./users.json', JSON.stringify(users));
        console.log('wlecome ' + argv.name);
   
        });
    },
})

yargs.command({
    command:'edit',
    decription:'create new user',
    bulider:{name: {demandOption:true, }, id :{demandOption:true} },
    handler(argv){
     fs.readFile('./users.json', {encoding:"utf-8"}, (err,data) => {
        const users  = JSON.parse(data);
        let id = null;
        const usersUpdata = users.map((user)=>{
            if(user.id == argv.id)
            {
                id = true;
                user.name = argv.name;
            }
            return user;
        })
        if(id){
            fs.writeFileSync('./users.json', JSON.stringify(usersUpdata));
            console.log('updata name: ' + argv.name + ' is done');
        }else {
            console.log('id ' + argv.id + ' not found');
        }
       
        });
    },
})

yargs.command({
    command:'delete',
    decription:'delete user',
    bulider:{id :{demandOption:true} },
    handler(argv){
     fs.readFile('./users.json', {encoding:"utf-8"}, (err,data) => {
        const users  = JSON.parse(data);
        let id= null;
        const usersUpdata = users.filter((user)=>{
            if(user.id == argv.id)
            {
                id = true;
            }
            return user.id != argv.id;
        })
        
        if(id){
            fs.writeFileSync('./users.json', JSON.stringify(usersUpdata));
            console.log('delete done');
        }else {
            console.log('id ' + argv.id + ' not found');
        }
       
        });
    },
})

yargs.command({
    command:'users',
    decription:'show all users',
    bulider:{id :{demandOption:true} },
    handler(argv){
     fs.readFile('./users.json', {encoding:"utf-8"}, (err,data) => {
        const users  = JSON.parse(data);
      
        console.log(users);
       
        });
    },
})

yargs.command({
    command:'getuser',
    decription:'get spsific user with id ',
    bulider:{id :{demandOption:true} },
    handler(argv){
     fs.readFile('./users.json', {encoding:"utf-8"}, (err,data) => {
        const users  = JSON.parse(data);

        const user = users.find((user)=>{
           
            return user.id == argv.id;
        })
          
        if(user){
            console.log(user);
        }else {
            console.log('id ' + argv.id + ' not found');
        }
      
       
        });
    },
})
yargs.parse();

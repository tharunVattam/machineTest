const {pool} =require('pg');
const pool = new pool({

    user:'postgres',
    host:'localhost',
    port:'5432',
    database:'testApp',
    password:'postgres'
})

let database={};
database.checkUser=(userName)=>{
    return pool.query('SELECT * FROM users WHERE user_name=$1',[userName]).then(users=>{
        if(users.rows.length==0){
            return {valid:true}
        }
        else{

            return {valid:false}
        }
    }).catch(err=>{
        throw err;
    })

}


database.signUp=(data)=>{
    let query='INSERT INTO users(user_name,password) VALUES ($1,$2)';
    return pool.query(query,[data.userName,data.password]).then(res=>{
        return res;
    }).catch(err=>{
        throw err;
    })
}

database.login=(data)=>{
    return pool.query('SELECT * FROM users WHERE user_name=$1 AND password=$2',[data.userName,data.password]).then((res)=>{
        if(res.rows.length==0){
            throw new Error('Invalid userName or password')
        }
        else{
            return res;
        }
    }).catch(err=>{
        throw err;
    })
}


database.upload=(data,userName)=>{
    return pool.query('UPDATE users SET user_file=$1,last_updated=NOW() WHERE user_name=$2 RETURNING last_updated',[JSON.stringify(data),userName]).then(res=>{
        return {
            data:data,
            last_updated:res.rows[0].last_updated
        }
    }).catch(err=>{
        throw err;
    })
}

database.getData=(userName)=>{
    return pool.query('SELECT user_file,last_updated FROM users WHERE user_name=$1',[userName]).then(res=>{
        if(res.rows[0].user_file){
            return res.rows[0];
        }
        else{
            return [];
        }
    }).catch(err=>{
        throw err;
    })
}

module.exports=database;
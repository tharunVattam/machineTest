const dbLayer= require('../db/model');
let service={};

service.signUp=(data)=>{
    return dbLayer.signUp(data).then(res=>{
        return res;
    })
}
service.login=(data)=>{
    return dbLayer.login(data).then(res=>{
        return res;
    })
}
service.checkUser=(data)=>{
    return dbLayer.checkUser(data).then(res=>{
        return res;
    })
}
service.upload=(data,userName)=>{
    return dbLayer.upload(data,userName).then(res=>{
        return res;
    })
}
service.getData=(userName)=>{
    return dbLayer.getData(userName).then(res=>{
        return res;
    })
}

module.exports=service;
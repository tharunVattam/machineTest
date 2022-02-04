const express = require('express');
const router = express.Router();
const service = require("../service/account");

router.post('/signup',(req,res)=>{
    service.signUp(req.body).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send(err.message);
    })
})

router.post('/login',(req,res)=>{
    service.login(req.body).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send(err.message);
    })
})

router.post('/upload',(req,res)=>{
    service.upload(req.body.data,req.body.userName).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send(err.message);
    })
})

router.get('/getData',(req,res)=>{
    service.getData(req.query.userName).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send(err.message);
    })
})

router.get('/checkUser',(req,res)=>{
    service.checkUser(req.query.userName).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send(err.message);
    })
})

module.exports = router;
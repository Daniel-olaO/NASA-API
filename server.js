const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
const HTTP_PORT = process.env.PORT || 3000;

app.use(cors('*'));

app.get('/', (req,res)=>{
    console.log(new Date().toUTCString());
    res.json({
        'message':'API Listening'
    });
});
app.get('/api/tle/', async(req, res)=>{
    let id = req.params.id;
    try{
        let { data } = await axios.get(`http://tle.ivanstanojevic.me/api/tle/`,{
            headers: {
                api_key: process.env.NASA_API_KEY,
            }
        });
        res.status(202).json(data);
    }
    catch(error){
        res.status(404).json(error);
    }
});
app.get('/api/tle/:id', async(req, res)=>{
    let id = req.params.id;
    try{
        let { data } = await axios.get(`http://tle.ivanstanojevic.me/api/tle/${id}`,{
            headers: {
                api_key: process.env.NASA_API_KEY,
            }
        });
        res.status(202).json(data)
    }
    catch(error){
        res.status(404).json(error);
    }
});
app.get('/api/tle/:id/propagate', async(req, res)=>{
    let id = req.params.id;

    try{
        let { data } = await axios.get(`http://tle.ivanstanojevic.me/api/tle/${id}/propagate`,{
            headers: {
                api_key: process.env.NASA_API_KEY,
            }
        });
        res.status(202).json(data)
    }
    catch(error){
        res.status(404).json(error);
    }
});

app.listen(HTTP_PORT, ()=> console.log(`server running on port: ${HTTP_PORT}`));
// index.js
const express = require("express");
const { connectMongodb } = require("./connection.js");
const urlRoute = require("./routes/url");
const URL=require("./models/url")
const app = express();
const PORT = 8001;

// connect
connectMongodb('mongodb://127.0.0.1:27017/short-URL')
    .then(() => console.log(`MongoDb server started`));

//Middleware
app.use(express.json());

// Routers
app.use('/url', urlRoute); 
app.get('/:shortId',async(req,res)=>{
     const shortId=req.params.shortId;
    const entry =await URL.findOneAndUpdate({
        shortId,
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        },
    },
},
);
res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server Started at Port:${PORT}`));

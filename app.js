const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000,(err)=>{
if(err)
{
console.log("An internal error occured");    
return;
}
console.log("WeatherApp server  is listening on port 3000");
});

app.post("/",function(req,res){


const query=req.body.city;
const apiKey="d72454fedd33f5d145c32b8c2f275420";
const unit="metric";
const url=`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
        https.get(url,function(response){
        response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const icon=weatherData.weather[0].icon;
        const imageURL=`https://openweathermap.org/img/wn/${icon}@2x.png`;
        res.write(`<h1>The temperature of ${query} is ${weatherData.main.temp} degree celcius</h1>`);
        res.write(`<h2>The weather is currently  ${weatherData.weather[0].description}<h2/>`);
        res.write(`<img src=${imageURL}>`);
        res.send();
        });
        });
        
});

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});


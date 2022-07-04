
const path=require('path');
const express=require('express');
const hbs=require("hbs");
const res = require('express/lib/response');
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")

const app=express();

const port=process.env.PORT || 3000;
//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const patialsPath=path.join(__dirname,"../templates/partials");

//setup handlebars engine and view location
app.set("view engine","hbs"); 
app.set("views",viewsPath); 
hbs.registerPartials(patialsPath);
//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About page",
        name:"Shubham Namjoshi"
    });
})

app.get("/help",(req,res)=>{
    res.render("help",{
       msg:"How can we help you?",
       title:"Help",
       name:"Shubham Namjoshi"
    });
})

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather App",
        name:"Shubham Namjoshi"
    });
});
app.get("/weather",(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"Please enter an Address!!"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})


app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404 Page",
        msg:"Help page not found!",
        name:"Shubham Namjoshi"
    });})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404 Page",
        msg:"Page not found!",
        name:"Shubham Namjoshi"
    });});
// app.get("/help",(req,res)=>{

//     // res.send("Help Page");

//     res.send({
//         name:"SHubham",
//         age:23
//     });
// })
// app.get("/about",(req,res)=>{

//     res.send("About Page");
// })

//app.com
//app.com/help
//app.com/about

app.listen(port, ()=>{
    console.log("Server is started on port "+port);
}); 

    const express = require('express')
    const app = express()

    const port = 3000
   
    const path = require ("path")
    const publicDirectory =  path.join(__dirname , '../public')
    app.use (express.static (publicDirectory))


app.set('view engine', 'hbs');

 const viewsDirectory = path.join (__dirname , '../temp1/views')
 app.set('views', viewsDirectory);


 var hbs = require('hbs');
const partialsPath = path.join(__dirname , "../Temp1/partials")
hbs.registerPartials(partialsPath)

 
app.get ('/' , (req,res) => {
    res.render('index' , {
        title : "HOME",
        desc : "This is home page"
    })
})

app.get ('/service' , (req,res) => {
    res.render('service' , {
        title : "SERVICE",
        name: "HODA",
        city:"Cairo",
        age: 23,
   
    })
})


app.get ('/team' , (req,res) => {
    res.render('team' , {
        title : "TEAM",
        name: "FATMA",
        city:"CAIRO",
        age: 25,
  
    })
})

const geocode = require('./tools/geocode')
const forecast = require('./tools/forecastFile')

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
        
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:req.query.address,
                latitude1 :data.latitude,
                longitude1:data.longitude
            })
        })
    })
})


  app.get('*' , (req , res)=> {
     res.send('404 Page Not Founded')
  })


    app.listen(port, () => {
    console.log(` port is ${port}`)
    })
    



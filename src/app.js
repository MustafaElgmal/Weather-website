const path = require('path')
const express = require('express')
const geocoding=require('./utils/geocoding')
const forcast=require('./utils/forcast')
const app = express()
const port =process.env.PORT || 3000
const hbs = require('hbs')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup static dir to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('indx', {
        title: "weather",
        name: "mostafa"
    })




})

app.get('/about', (req, res) => {
    res.render('about', {

        title: "About Me",
        name: "mostafa"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: "This is some helpful text",
        title: "Help",
        name: "mostafa"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            Error:"You must provied address"
        })
    }
    geocoding(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})

        }
        forcast(latitude,longitude,(error,{ temperature,feelslike})=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast:temperature,
                location,
                address:req.query.address

            })
                

        })


    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            Error:"You must provied search"
        })
    }

    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 page!",
        name: "mostafa",
        errormassage: "Help articale not found."

    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: "404 page!",
        name: "mostafa",
        errormassage: "This page isn't available. Sorry about that.Try searching for something else."
    })
})

app.listen(port, () => {
    console.log('Server is running....')

})

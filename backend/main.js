const express = require('express')
const db = require('./databaseConfig.js') 
const cors = require('cors')

let productRouter = require('./routes/productRoute.js')
let adminRouter=require('./routes/adminRoute.js')

let cartRouter = require('./routes/cartRoute.js')
let clientRouter = require("./routes/clientRoute.js")


let app = express()
let port = 3000
app.use(express.json()) //data in json file 
app.use(cors()) // it is a middeleware
app.use(express.static('uploads')) //image file which is uploaded

//connect to database
db.connect((err)=>{
    if(err) throw err
    else{
        console.log('database connected')
    }
})

//create product table
let productTableQuery = `CREATE TABLE if not exists product ( 
    id INT NOT NULL AUTO_INCREMENT,
    productBrand VARCHAR(255) NULL,
    productPrice VARCHAR(255) NULL,
    productRating VARCHAR(255) NULL,
    productType VARCHAR(255) NULL,
    image VARCHAR(255) NULL,
    PRIMARY KEY (id));`

 db.query(productTableQuery,(err,result)=>{
    if(err) throw err
    else{
        console.log("product Table created")
    }
 })  
 
 //create cart table
 let cartTableQuery  = `CREATE TABLE if not exists cart (
    id INT NOT NULL AUTO_INCREMENT,
    productBrand VARCHAR(255) NULL,
    productPrice VARCHAR(255) NULL,
    productRating VARCHAR(255) NULL,
    productType VARCHAR(255) NULL,
    image VARCHAR(255) NULL,
    PRIMARY KEY (id));`

    db.query(cartTableQuery, (err, result)=>{
        if(err) throw err
        else{
            console.log("cart Table created")
        }
    })
    
//create clientDetail table---------------------
let clientDetailTableQuery = `CREATE TABLE if not exists clientDetail(
   id INT NOT NULL AUTO_INCREMENT,
    clientName VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    image VARCHAR(255) NULL,
    PRIMARY KEY (id));`  
db.query(clientDetailTableQuery,(err, result)=>{
    if(err) throw err
    else{
        console.log("clientDetail Table created")
    }
})


//Product Router
 app.use('/api', productRouter)

 app.use('/api', adminRouter)

 app.use('/api', cartRouter)

 app.use('/api', clientRouter)


app.listen(port,()=>{
    console.log(`server is runing at http://localhost:${port}`)    
})

let db = require('../databaseConfig')
let bcrypt= require('bcryptjs')
let jwt = require('jsonwebtoken')

// function to create generateToken function
function generateToken(User){
    return jwt.sign({id: User.id}, "hello", {expiresIn: '1h'})
}



// save client data in 'clientDetail' table---------------
exports.clientSave = async (req, res) => {
    let clientName = req.body.clientName
    let email = req.body.email
    let password = req.body.password 
    
    let hash = await bcrypt.hash(password , 10) // second part num is break the password into given integer
    let image = req.file.filename

    // let value = [[clientName, email, password, image]]
    let value = [[clientName, email, hash, image]]
    let sql = 'insert into clientDetail(clientName, email, password, image) value ?'

    db.query(sql, [value], (err, result) => {
        if (err) throw err
        else {
            res.send('data saved')
        }
    })
    
}

// Login by email and password, to check the data in the 'clientDetail' table----------------
exports.clientLogin = (req, res)=>{
    let email = req.body.email
    let password = req.body.password // user login password
    let sql  = "select * from clientDetail where email = ?"
    
    db.query(sql, [email], (err, result) => {
        if (err) throw err
        else{ 
        bcrypt.compare(password, result[0].password, async (err, isMatch)=>{  // result[0].result->database saved password
            if(err) throw err
            else{
                if(isMatch == true){
                    let token = await generateToken(result[0])
                    console.log(token)
                    res.json({token, isMatch})

                    // res.send(true)
                }else{
                    res.send(false)
                }
            }
        })
    }
})
//------
// let sql  = "select * from clientDetail where email = ? and password  = ?"
    // db.query(sql, [email, password], (err, result)=>{
    //     if(err)  throw err;
    //     else{
    //         if(result.length > 0){
    //             res.send(true)
    //             // console.log(true)
    //         }else{
    //             res.send(false)
    //             // console.log(false)
    //         }
    //     }
    // })
}

// create tabel according to your url data when you submit login form then the table will created------------------------
exports.createClient = (req, res)=>{
    let unique = req.params.unique   // params to take the data from the url

let clientTableQuery  = `CREATE TABLE if not exists ${unique} (
    id INT NOT NULL AUTO_INCREMENT,
    productBrand VARCHAR(255) NULL,
    productPrice VARCHAR(255) NULL,
    productRating VARCHAR(255) NULL,
    productType VARCHAR(255) NULL,
    image VARCHAR(255) NULL,
    PRIMARY KEY (id));`   // In 'unique' variable to access the data as 'table name' from the url

    db.query(clientTableQuery, (err, result)=>{
        if(err) throw err
        else{
            console.log("client Table created")
        }
    })
}
 
//get client detail from 'clientDetail' table 
exports.getClient = (req, res)=>{

    let unique = req.params.unique

    let sql = 'select * from clientDetail where email = ?'

    db.query(sql, [unique + '@gmail.com'], (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}





let db = require('../databaseConfig.js')
// admin controller----------------
exports.adminLogin = (req, res)=>{
    let email = req.body.email
    let password = req.body.password

    let sql  = "select * from admin where email = ? and password  = ?"
    db.query(sql, [email, password], (err, result)=>{
        if(err)  throw err;
        else{
            if(result.length > 0){
                res.send(true)
                // console.log(true)
            }else{
                res.send(false)
                // console.log(false)
            }
        }
    })
}


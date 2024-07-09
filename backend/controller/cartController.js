let db = require('../databaseConfig.js')

// save cart data
exports.cartSave =  (req, res)=>{
  let productBrand = req.body.productBrand
  let productPrice = req.body.productPrice
  let productRating = req.body.productRating
  let productType = req.body.productType
  let image = req.body.image   //image
  let unique = req.params.unique
  let value = [[productBrand,productPrice,productRating,productType,image]]
  // db.query('insert into cart(productBrand,productPrice,productRating,productType) values ?', [value], (err, result)=>{
    db.query(`insert into ${unique} (productBrand,productPrice,productRating,productType,image) values ?`, [value], (err, result)=>{
      if(err) throw err
      else{
        res.send(true)
      }
    })
  }
  // get cart 
  exports.getCart = (req, res)=>{
  let unique = req.params.unique
  // let sql = "select * from cart"
  let sql = `select * from ${unique}`
  db.query(sql, (err, result)=>{
    if(err) throw err
    else{
      res.json(result)
    }
  })
}

//delete cart
exports.deleteCart = (req, res)=>{
    let unique = req.params.unique
    let id  = req.params.id
    // let sql  = "delete from cart where id  = ?"
    let sql  = `delete from ${unique} where id  = ?`
    db.query(sql, [id], (err, result)=>{
      if(err) throw err
      else{
        res.send('data deleted')
      }
    })
  }
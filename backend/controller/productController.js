let db = require('../databaseConfig.js')
// let path = require('path')

// 'POST' method to save the product
exports.productSave = (req,res)=>{
    let productBrand = req.body.productBrand
    let productPrice = req.body.productPrice
    let productRating = req.body.productRating
    let productType = req.body.productType
    let image = req.file.filename //require to image file
    let value = [[productBrand, productPrice, productRating,productType, image]]
    db.query('insert into product ( productBrand, productPrice, productRating, productType, image ) values ?', [value], (err, result)=>{
     if(err) throw err
     else{
         res.send('data saved')
     }
    })
 }

 //'GET' method to find the data in json form
 exports.getProduct = (req, res)=>{
    let sql = 'select * from product'

    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)  
        }
    })
 }

 // Get method to view data
 exports.getProductById = (req, res)=>{
    let id = req.params.id
    let sql = "select * from product where id  = ?"
    db.query(sql,[id], (err, result)=>{
      if(err) throw err
      else{
        res.json(result)
      }
    })
  }

 //'DELETE' method to delete the data from the database
 exports.deleteProduct = (req,res)=>{
    let id = req.params.id
    let sql = 'delete from product where id = ?'
    db.query(sql, [id], (err, result)=>{
        if(err) throw err
        else{
            res.send('delete data !')
        }
    })
 }

//'PUT' method to update the data in database
 exports.updateProduct = (req, res)=>{
    let id = req.params.id  // params to help to taking data from url 
    let newdata = req.body
    // let sql = 'update product set productType = "Shose", productPrice="1200" where id = 2'
    
    let sql = 'update product set ? where id = ?'
    db.query(sql,[newdata, id] , (err, result)=>{
        if(err) throw err
        else{
            res.send('data updated !')
        }
    })
 }

 // search product data from the database
 exports.searchProduct = (req, res)=>{
    let inp = req.params.inp
    let sql = `select * from product where productType like ?`  
    db.query(sql, ['%' + inp + '%'], (err, result)=>{
      if(err) throw err
      else{
        res.json(result)
      }
    })
  }




 
   
 
   
 



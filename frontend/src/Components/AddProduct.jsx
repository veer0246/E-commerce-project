import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddProduct() {
    let navigation = useNavigate()

   // // it is handle only text not for image  file -----------------
    //     let [data, setData] = useState({
    //     productBrand: "",
    //     productType: "",
    //     productPrice: "",
    //     productRating:""
       
    // })

    // let {productBrand, productType, productPrice, productRating} = data

    // function handleChange(e){
    //     e.preventDefault()
    //     setData({...data,[e.target.name]: e.target.value})  // ...data --> it is sprade method
    // }

  //   async function handleSubmit(e){
  //     e.preventDefault()
  //     await axios.post('http://localhost:3000/api/productSave', data)
  //     navigation('/admin')
  // }

    //spread operator (...) allows us to quickly copy all or part of an existing array or object into another array or object.
    //----------------------------------------------------------

 // it take the text and image  file----------------------------------
    let [productBrand, setProductBrand] = useState('')
    let [productPrice, setProductPrice] = useState('')
    let [productType, setProductType] = useState('')
    let [productRating, setProductRating] = useState('')
    let [image, setImage] = useState(null)

    async function handleSubmit(e){
        e.preventDefault()
        let data = new FormData()  // create new object
        data.append('productBrand', productBrand)
        data.append('productPrice', productPrice)
        data.append('productType', productType)
        data.append('productRating', productRating)
        data.append('image', image)

        await axios.post('http://localhost:3000/api/productSave', data, {
          headers:{
            'Content-Type' : 'multiPart/Form-Data'
          }  
        })
        navigation('/admin')
    }

  return (
    <section>
      <div className="bg-[url('watch.jpg')] object-contain w-full h-full "></div>
      <div className="grid grid-cols-1 lg:grid-cols-2  ">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Add Product</h2>
            
            <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit}> 
             
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Product Brand{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder=" Product Brand"
                      id="name"
                      // name='productBrand'
                      // value={productBrand}
                      // onChange={handleChange}
                      onChange={(e)=>setProductBrand(e.target.value)}
                    ></input>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Product Price{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder=" Product Price"
                      id="name"
                      // name='productPrice'
                      // value={productPrice}
                      // onChange={handleChange}
                      onChange={(e)=>setProductPrice(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Product Rating{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder=" Product Rating"
                      id="name"
                      // name='productRating'
                      // value={productRating}
                      // onChange={handleChange}
                      onChange={(e)=>setProductRating(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Product Type{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder=" Product Type"
                      id="name"
                      // name='productType'
                      // value={productType}
                      // onChange={handleChange}
                      onChange={(e)=>setProductType(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                   Image{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="file"
                     
                  accept='images/*'
                  onChange={(e)=>setImage(e.target.files[0])}
                    ></input>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Add Product <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign up with Google
              </button>
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-[#2563EB]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </span>
                Sign up with Facebook
              </button>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          {/* <div className="h-[500px] w-[300px] rounded-[30px]"></div> */}
          <img
            className="mx-auto h-full w-full rounded-md object-contain "
            // src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            src='https://img.freepik.com/premium-vector/product-sale-social-media-post-template_47987-970.jpg?w=900'
            
            alt=""
          />
        </div>
      </div>
    </section>
  )
}
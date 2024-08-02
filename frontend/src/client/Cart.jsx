import React, { useContext, useEffect, useState } from 'react'
import { Trash, Heart } from 'lucide-react'
import axios from 'axios'
import UserContext from '../context/UserContext'
import { Link } from 'react-router-dom'




export default function Cart() {
    let [data, setData] = useState([])

    let {setCount} = useContext(UserContext)
    // let {login} = useContext(UserContext)
    let {auth} = useContext(UserContext)

    useEffect(() => {
        fetchCartData()  // function call
    // }, [])
    }, [auth])


    //create function to fetch cart data----------------------
    async function fetchCartData() {
      // let result = await axios.get('http://localhost:3000/api/getCart')
      // let result = await axios.get(`http://localhost:3000/api/getCart/${login}`)

       if(auth.userId){
        let result = await axios.get(`http://localhost:3000/api/getCart/${auth.userId}`)
      setData(result.data)
      setCount(result.data.length)
    }
  }

//create function to delete cart data-----------------------
async function deleteCart(id){  // function to delete cart
    let flag  = confirm("Are u sure to delete item")
   if(flag){
    //  await axios.delete(`http://localhost:3000/api/deleteCart/${id}`)
    // await axios.delete(`http://localhost:3000/api/deleteCart/${id}/${login}`)
    
    await axios.delete(`http://localhost:3000/api/deleteCart/${id}/${auth.userId}`)
    fetchCartData() // function call
   }
  }

  let cost  = data.reduce((acc , curent)=> acc + JSON.parse(curent.productPrice),0) // calculating total cost of products

  return (
    <div className=" mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">

      <h2 className="text-5xl font-bold text-center mt-10 text-red-800">Your cart</h2>
      <p className="mt-3 text-sm font-medium text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius repellat ipsam, sit
        praesentium incidunt.
      </p>
      <ul className="flex flex-col divide-y divide-gray-200">
        {data.map((data) => (
          <li key={data.id} className="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                src={`http://localhost:3000/${data.image}`}
              
              />
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">{data.productBrand}</h3>
                    <p className="text-sm">{data.productType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{data.productPrice}</p>
                  </div>
                </div>
                <div className="flex divide-x text-sm">
                  <button type="button"
                  onClick={()=>deleteCart(data.id)}  // delete cart
                  className="flex items-center space-x-2 px-2 py-1 pl-0">
                    <Trash size={16} />
                    <span>Remove</span>
                  </button>
                  <button type="button" className="flex items-center space-x-2 px-2 py-1">
                    <Heart size={16} />
                    <span>Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-right"> 
        <p>  
          Total amount:
          <span className="font-semibold"> {cost}</span> 
          {/* print total amount */}
        </p> 
      </div>  
      <div className="flex justify-end space-x-4">
        <Link  // button to link 
        to='/'
          type="button"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Back to shop
        </Link>
        <button
          type="button"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
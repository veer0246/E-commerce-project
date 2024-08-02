import React, { useContext, useEffect, useState } from 'react'
import { BarChart, Wallet, Newspaper, BellRing, Paperclip, Brush, Wrench, Sidebar } from 'lucide-react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../context/UserContext'
import { Carousel } from "flowbite-react"
import image1 from '../assets/lap3.jpg'
import image2 from '../assets/watch.jpg'




export default function Home() {

  let [inp, setInp] = useState('')  // for searchbar to search product
  // console.log(inp)
  let navigation = useNavigate()
  let [data, setData] = useState([])

   

    useEffect(()=>{
      handleSearch()
    },[inp])

    // fatch all product-----------
    async function fetchProductData() {
      let result = await axios.get('http://localhost:3000/api/getProduct')
      setData(result.data)
    }
    useEffect(() => {
      fetchProductData()
      }, [])
  // filter asuse products data-----------
    async function Asus(){
         let result = await axios .get('http://localhost:3000/api/getProduct')
         let final = result.data.filter((item)=>item.productBrand == 'Asus')  
         setData(final)
    }
// filter hp products data
    async function HP(){
         let result = await axios .get('http://localhost:3000/api/getProduct')
         let final = result.data.filter((item)=>item.productBrand == 'HP')     
         setData(final)
    }
  //----------------
  //  async function filterData(value){
  //    let result = await axios .get('http://localhost:3000/api/getProduct')
  //    if(value == 'Asus'){
  //      let final = result.data.filter((item)=>item.productBrand = value )
  //     setData(final)
  //    }      
  //   }
  //--------------------
  async function handleSearch(){
    let result  = await axios.get(`http://localhost:3000/api/searchProduct/${inp}`)
    setData(result.data)
  }

  //function to save cart data------
  // let { login } = useContext(UserContext)
  let { auth } = useContext(UserContext)

  async function saveCart(data){
    // if (login) {
    // let result =  await axios.post('http://localhost:3000/api/cartSave', {
    // let result =  await axios.post(`http://localhost:3000/api/cartSave/${login}`, {

    if (auth.userId) {
      let result = await axios.post(`http://localhost:3000/api/cartSave/${auth.userId}`,
         {
         productBrand: data.productBrand,
         productPrice: data.productPrice,
         productType:data.productType,
         productRating:data.productRating,
         image: data.image      
       })
 
      if(result.data == true){
        fetchCartData()  // function to fetch the cart data
       alert("product saved into cart !")
      }
     }else {
      navigation('/clientLogin')
    }

  }

      // cart length
    let {setCount} = useContext(UserContext)

    useEffect(() => {
        fetchCartData()
    // }, [])
    }, [auth])

    async function fetchCartData() {
      // let result = await axios.get('http://localhost:3000/api/getCart')
      // let result = await axios.get(`http://localhost:3000/api/getCart/${login}`)

      if(auth.userId){
        let result = await axios.get(`http://localhost:3000/api/getCart/${auth.userId}`)
      setCount(result.data.length)
    }
  }
  
// let str = "dsgadfg"
// console.log(!!str)

    return (
      <>
    {/* asidebar section to start here------------------------------------------------------------------------------------------------- */}
    <aside className="fixed flex h-screen w-64 flex-col overflow-y-auto border-r bg-gray-100 px-5 py-8 hidden lg:block ">
   
      
      <div className="mt-6 flex flex-1 flex-col justify-between ">

        <nav className="-mx-3 space-y-6 ">
         
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-700">analytics</label>
           
<form className="max-w-md mx-auto"> 
  
    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
        bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
        dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Product Type...." required 
        onChange={(e)=>setInp(e.target.value)}/>
       
    </div>
</form>
{/* search by button--------------- */}
{/* <button className='p-1 bg-gray-200 rounded-[5px] text-sm font-bold hover:bg-gray-200 hover:text-red-400'
onClick={handleSearch}
>Search</button> */} 
  {/* <div className='ml-20'>
        <img src={img} alt="img" className='h-20 w-20 rounded-full' />
      </div> */} 


          </div>
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-700">Brand</label>
            <button   // anchor tag to buttoon
            onClick={fetchProductData}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
              href="#"
            >
              {/* <Newspaper className="h-5 w-5" aria-hidden="true" /> */}
              <span className="mx-2 text-sm font-medium">All</span>
            </button>

            <button
            onClick={Asus}

          //   value="Asus"
          //   id='data'
          //  onClick={filterData}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
              href="#"
            >
              {/* <BellRing className="h-5 w-5" aria-hidden="true" /> */}
              <span className="mx-2 text-sm font-medium">Asus</span>
            </button>
            <button
            onClick={HP} 
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
              href="#"
            >
              {/* <Paperclip className="h-5 w-5" aria-hidden="true" /> */}
              <span className="mx-2 text-sm font-medium">HP</span>
            </button>
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-700">Customization</label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
              href="#"
            >
              <Brush className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Themes</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-300 hover:text-gray-800"
              href="#"
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Setting</span>
            </a>
         
          </div>
        </nav>
      </div>
    </aside>

{/* card section to strat here------------------------------------------------------------------ */}


    {/* <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src={image1} alt="..." className='h-400 w-full' />
        <img src={image2} alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
      </Carousel>
    </div> */}
    <div className='relative left-[290px] top-[70px] flex justify-start w-[1200px] flex-wrap gap-[18px]'>



    {/* <div className="relative  border-2 border-red-800 w-[1155px] h-[100px] rounded-lg border bg-pink-500 text-balck-300">
             <div className='text-center mt-[10px] text-[40px]'>  Welcome to Global Market </div>
</div> */}

    {data.map((data)=>(
        <div className="w-[280px]   rounded-lg border bg-pink-100 hover:bg-blue-200 cursor-pointer shadow-xl  shadow-neutral-200 
         "  key = {data.id}>
          {/*  transition ease-in-out delay-100  hover:-translate-y-[10px] hover:bg-indigo-500 duration-300 ... */}
        <img
          // src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        
          src={`http://localhost:3000/${data.image}`}
          alt="Laptop"
          className="h-[200px] w-full rounded-t-md object-cover "
        />
        <div className='' >
        <div className="p-4 text-center">
          <h1 className="inline-flex items-center text-lg font-semibold ">Product Brand:- {data.productBrand}</h1>
          <h1 className="inline-flex items-center text-lg font-semibold">Product Type:-{data.productType}</h1>
          <h1 className="inline-flex items-center text-lg font-semibold">Product Price:- {data.productPrice}</h1>
          <h1 className="inline-flex items-center text-lg font-semibold">Product Rating:- {data.productRating}</h1>
          
          <button
            type="button"
            onClick={()=>saveCart(data)}  // click to save cart
            className="mt-4 w-[120px] rounded-lg bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add To Cart
          </button>
        </div>
        </div>
      </div>
    ))}
    </div>



  
   </>
   
  )
}
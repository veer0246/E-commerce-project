import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'


export default function ClientDetail() {

    let [data, setData] = useState([])
    let {login} = useContext(UserContext)

    async function fetchClientData(){
        let result = await axios.get(`http://localhost:3000/api/getClient/${login}`) 
        setData(result.data)
        // console.log(result.json())
    }
    useEffect(()=>{
        fetchClientData()
    },[login])

  return (
    <section className="px-2 py-10 md:px-0">
      <div className="mx-auto max-w-4xl mt-20">
        {data.map((data)=>(

        <div className="md:flex md:items-center md:justify-center md:space-x-14">
          <div className="relative h-48 w-48 flex-shrink-0">
            <img
              className="relative h-48 w-48 rounded-full object-cover"
            //   src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            src={`http://localhost:3000/${data.image}`}
              alt=""
            />
          </div>

          <div className="mt-10 md:mt-0">
           
            <div className='text-5xl font-bold mt-5 text-red-900 '>
                <h1>Your Profile</h1>
            </div>

            <div className="p-4 ">
              <h1 className="text-lg font-semibold  mt-2 ">Name:- 
                <span className='text-bold text-xl text-fuchsia-600'>{data.clientName}</span>
                </h1>
             <h1 className="text-lg font-semibold  mt-2 ">Email:- 
                <span className='text-bold text-xl text-fuchsia-600'>{data.email}</span>
                </h1>
             <h1 className="text-lg font-semibold  mt-2 ">Address:- 
                <span className='text-bold text-xl text-fuchsia-600'>{data.email}</span>
             
                </h1>
        
            <p className="mt-1 text-base text-gray-600">Full Stack Developer</p>
            </div>

            <blockquote>
              <p className="text-xl text-black">
                “Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aliquam repellat
                laborum minima tempore deserunt explicabo placeat! Fugit, molestias nesciunt.”
              </p>
            </blockquote>
          </div>
        </div>
          ))}
      </div>
    </section>
  )
}

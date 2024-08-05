import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios'
export default function UserContextProvider({children}) {
    let [count, setCount] = useState(false)
    // let [login, setLogin] = useState(false)
    // let [login, setLogin] = useState('')



    // JWT code ------------------------
    let [ auth , setAuth] = useState({   // 'auth' is a variable and it contain three variable 
      token: localStorage.getItem('token') || null,
      isAuthenticated: !!localStorage.getItem('token'),
      userId: ''
    })

    let userLogin  = async (data)=>{
      let result  = await axios.post('http://localhost:3000/api/clientLogin', data)
console.log(result)
console.log(data)

      if(result.data.isMatch){
        let token = result.data.token
        localStorage.setItem('token', token)
        let unique  = data.email.split('@')[0]
        createClientTable(unique)

        setAuth({token, isAuthenticated: true, userId: unique})
        return true
      }
    }

  async function createClientTable(unique){
    await axios.post(`http://localhost:3000/api/createClient/${unique}`)
  }


let profile = async ()=>{
      let token = localStorage.getItem('token')
      if(token){
        let result  = await axios.get('http://localhost:3000/api/verify')
        // console.log(result)
        // setAuth(preAuth => ({...preAuth,userId: result.data.email.split("@")[0]} ))

        let unique =  result.data.email.split("@")[0]
        console.log(result)
        setAuth((preAuth) => ({...preAuth,userId: unique} ))
      }else{
        userLogout()
      }
}

useEffect(()=>{
  let token = localStorage.getItem('token')
  if(token){
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  profile()
}, [])

// userlogout function it's work on global------------
let userLogout = ()=>{
  localStorage.removeItem('token')
  setAuth({token:null, isAuthenticated: false, userId: ''})

}

  return (

    // <UserContext.Provider value={{count, setCount, login, setLogin}}>
    <UserContext.Provider value={{count, setCount, auth , userLogin, userLogout}}>
        {children}
    </UserContext.Provider>
  )
}
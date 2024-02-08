import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //navigate to another page
import '../styles/Register.css'; 


export default function Register() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: '',
    })

    const registerUser = async (e) => {
        e.preventDefault()
        const {username, firstName, lastName, password} = data
        try {
         const {data} = await axios.post('/register', {
            username, firstName, lastName, password
         })
         if(data.error) {
            console.log(data.error)
         } else {
            setData({})
            alert('Thank you for signing up for Zoe\'s Chat App!')
            navigate('/login')
         }
        } catch(error){
            console.log(error)
        }
    }
  return (
    <div>
        <h1>Register</h1>
        <div className="center-container">
            <div className="form-container">
                <form onSubmit={registerUser}>
                    {/* usernmae, first name, last name, password */}
                    <label>Username:</label>
                    <input type="text" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
                    <label>First Name:</label>
                    <input type="text" placeholder='i.e John' value={data.firstName} onChange={(e) => setData({...data, firstName: e.target.value})}/>
                    <label>Last Name:</label>
                    <input type="text" placeholder='i.e Smith' value={data.lastName} onChange={(e) => setData({...data, lastName: e.target.value})}/>
                    <label>Password:</label>
                    <input type="password" placeholder='Enter Password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

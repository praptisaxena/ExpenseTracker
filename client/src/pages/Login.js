import React,{useState,useEffect} from 'react';
import {Form,Input,message} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


import Spinner from '../components/Spinner';

function Login() {
    const [loading,setloading]=useState(false)
    const navigate=useNavigate()
    // form submit
    const submitHandler=async(values)=>{
       try {
        setloading(true)
       const {data}= await axios.post('/users/login',values)
       setloading(false)
        message.success('login success')
        localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
        navigate('/')
    } catch (error) {
        setloading(false);
        message.error("Invalid username or  password");
       }
   
    };
    //prevent for login user
        useEffect(()=>{
            if(localStorage.getItem('user')){
                navigate('/')
            }
        },[navigate]);
  return (
    <>
         <div className='register-page'>
             {loading && <Spinner/>} 
                <Form layout='vertical' onFinish={submitHandler}>
                    <h1>Login Form</h1>
                    
                    <Form.Item label="Email" name="email">
                        <Input type="email"/>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" />
                    </Form.Item>
                    <div className='d-flex justify-content-between'>
                        <Link to="/register">Not a User ? Click here to Register</Link>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </Form>
            </div>
    </>
  )
}

export default Login
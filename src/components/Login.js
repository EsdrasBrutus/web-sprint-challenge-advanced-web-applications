import React, { useState } from "react";
import { useForm } from '../hooks/useForm'
import axios from 'axios'


const Login = (props) => {
  const initialState ={
    credentials: {
      username: '',
      password: ''
    },

    error:{
      message: ''
    }
  }

  const [error, setError] =useState(initialState.error.message)
  const [values, handleChanges] =useForm(initialState.credentials)

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const login = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', values)
      .then(res=> {console.log("happy path!", res.data.payload);
                   localStorage.setItem('token', res.data.payload);
                   props.history.push('/private')
    })
    .catch(err => setError('Username or Password not valid'))
  }

  //const error = "";
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
        <form onSubmit={login}>
          <label>Username</label>
          <input 
            id="username" 
            data-testid="username"
            type='text'
            name='username'
            value={values.username}
            onChange={handleChanges}  
          />
          <label>Password</label>
          <input 
            id="password"
            data-testid="password"
            type='password'
            name='password'
            value={values.password}
            onChange={handleChanges}  
          />
          <button id="submit" >Log In</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"
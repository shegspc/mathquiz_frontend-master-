import { useState, useRef } from 'react';
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";
import "./register.css";


export default function Register() {
    const validationError = useRef(""); 
	// States for registration
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [autherr, setAutherr] = useState(false);
    const [confirmPass, setConfirmPass] = useState(false);
	
		

  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  
// Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if( password !==  confirmPassword){
        return setConfirmPass(true);
    }
    else {
        setConfirmPass(false);
    }
 
   try{
      const newUser = {
       email: email,
	   password: password,
	   name: name 
      };

      const response = await axios.post("https://mymathquizapi.onrender.com/backend/auth/register", newUser);
	  if (response.status === 422 || response.status === 401) {
		setAutherr(true);
		console.log(response);
	  }else{
		navigate("/login")
	  }
      
      
    } catch (err) {
      console.log(err);
      setAutherr(true);
      //validationError.current.value=err
    }
  };

    // Confirm Password error message
	const confirmPasswordMsg = () => {
		return (
			<div
				className="error"
				style={{
					display: confirmPass ? '' : 'none',
				}}>
				<h3>Password fields don't match</h3>
			</div>
		);
	};

	return (

		<div>
			{/* Calling to the methods */}
			<div className="messages">
				
                {confirmPasswordMsg()}
			</div>
			{/* <h3 style={{textAlign: "center"}}>Registration</h3> */}
		<div className="register">
	
			<div className="rContainer">
				<input
				type="text"
				placeholder="name"
				id="name"
				onChange={handleChangeName}
				className="rInput"
				required
				/>
				<input
				type="email"
				placeholder="email"
				id="email"
				onChange={handleChangeEmail}
				className="rInput"
				required
				/>
				<input
				type="password"
				placeholder="password"
				id="password"
				onChange={handleChangePassword}
				className="rInput"
				required
				/>
				<input
				type="password"
				placeholder="confirm password"
				id="confirmPassword"
				onChange={handleChangeConfirmPassword}
				className="rInput"
				required
				/>
				<button  onClick={handleSubmit} className="rButton">
				   Register
				</button>
              <p>Already a member? <Link to="/login">Login instead</Link></p>
           {autherr && <div className='error'>Something went wrong... Email problably already exists. Also ensure your password is at least 6 characters long.</div>}
      </div>
      
		</div>
		</div>
	);
}




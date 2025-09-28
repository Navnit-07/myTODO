import React, { useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {

    const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext)
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const otpArray = inputRefs.current.map(e => e.value);
            const otp = otpArray.join('');

            const { data } = await axios.post(backendUrl + '/api/auth/verify-account', {otp})

            if(data.success){
                toast.success(data.message);
                getUserData();
                navigate('/');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'something went wrong');
        }
    }

    const handleInput = (e, index) => {
        if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
            inputRefs.current[index+1].focus();
        } 
    }

    const handleKeyDown = (e, index) => {
        if(e.key === 'Backspace' && e.target.value === '' && index > 0){
            inputRefs.current[index-1].focus();
        }
    }

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text');
        const pasteArr = paste.split('');
        pasteArr.forEach((char, index) => {
            if(inputRefs.current[index]){
                inputRefs.current[index].value = char;
            }
        })
    }

    useEffect(() =>{
        if(isLoggedIn && userData && userData.isAccountVerified){
            toast.success('Email Already Verified!')
            navigate('/');
        }
    }, [isLoggedIn, userData])

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form className="p-10 rounded-lg shadow-lg w-96 text-sm rounded-lg shadow-lg" onSubmit={handleSubmitHandler}>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6">
          Enter the 6-digit code sent to your email
        </p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => {
                return (
                    <input type="text" maxLength='1' key={index} required 
                    ref={(e) => inputRefs.current[index] = e}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className='w-12 h-12 bg-gray-200 text-center text-xl rounded-md'
                    />
                )
            })}
        </div>
        <button className='w-full py-3 bg-black text-white rounded-full cursor-pointer'>Verify Email</button>
      </form>
    </div>
  );
};

export default EmailVerify;

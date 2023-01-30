import React, {useEffect} from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logowhite from '../assets/logo-white.png'
import {gapi} from 'gapi-script'
import {client} from '../client'

const Login = () => {
  const navigate = useNavigate();
  const ClientId = process.env.REACT_APP_GOOGLE_API_TOKEN;
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: ClientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });
 
  const responseGoogleSuccess = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const {name, googleId, imageUrl} = response.profileObj;

    const doc = {
      _id: googleId,
      _type: 'user',
      username: name,
      image: imageUrl,
    }

    client.createIfNotExists(doc)
    .then(() =>{
     navigate('/', {replace: true })
    })

  }
  const responseGoogleFailure = (response) => {
    console.log("Error Occured.")
  }
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='w-full h-full relative '>
        <video 
        src={shareVideo}
        type="video/mp4"
        controls = {false}
        muted
        autoPlay
        className='w-full h-full object-cover'
        />
      </div>
    <div
    className='flex absolute flex-col justify-center top-0 bottom-0 left-0 right-0 items-center bg-blackOverlay'
    >
      <div className='p-5'>
        <img src={logowhite} alt="Logo_Connect" width="250px" />
      </div>

      <div className='shadow-2xl'>
        <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
        render={(renderProps) => (
          <button
          type='button'
          className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
          onClick={renderProps.onClick}
          disabled = {renderProps.disabled}
          >
            <FcGoogle className='mr-4' /> SignIn with Google
          </button>
        )}
        onSuccess = {responseGoogleSuccess}
        onFailure = {responseGoogleFailure}
        cookiePolicy = {"single_host_origin"}
        isSignedIn = {false}
        />
      </div>

    </div>
    </div>
  )
}

export default Login

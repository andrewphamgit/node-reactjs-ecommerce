import React, {useState} from "react";
import {toast} from "react-toastify";
import LoginService from "../services/login.service.js";

const LoginPage = () => {

  const [paramLogin, setParamLogin] = useState({
    userName: '',
    password: '',
  });
  const [isProcessLogin, setIsProcessLogin] = useState(false);

  async function onSubmitHandler(event) {
    setIsProcessLogin(true);
    try {
      event.preventDefault();
      const resUser = await LoginService.login(paramLogin);
      if (resUser.success) {
        localStorage.setItem('token', resUser.token);
      } else {
        toast.error(resUser.message);
      }
    } catch (error) {
      console.log('Login fail: ', error);
      toast.error(error.message);
    } finally {
      setIsProcessLogin(false);
    }
  }

  function onChangeInputField(event) {
    setParamLogin((prevState) => {
      return {...prevState, [event.target.name]: event.target.value};
    });
  }

  return (
    <div className={'min-h-screen flex items-center justify-center w-full'}>
      <div className={'bg-white shadow-md rounded-lg px-8 py-6 max-w-md'}>
        <h1 className={'text-2xl font-bold mb-4'}>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className={'mb-3 min-w-72'}>
            <p className={'text-sm font-medium text-gray-700 mb-2'}>Username</p>
            <input className={'rounded-md w-full px-3 py-2 border border-gray-300 outline-none'}
                   onChange={onChangeInputField} value={paramLogin.userName} name={"userName"}
                   type={"text"} placeholder={"Username"} required={true} />
          </div>
          <div className={'mb-3 min-w-72'}>
            <p className={'text-sm font-medium text-gray-700 mb-2'}>Password</p>
            <input className={'rounded-md w-full px-3 py-2 border border-gray-300 outline-none'}
                   onChange={onChangeInputField} value={paramLogin.password} name={"password"}
                   type={"password"} placeholder={"Password"} required={true} />
          </div>
          <button type={"submit"}
            className={`mt-2 w-full py-2 px-4 rounded-md text-white ${isProcessLogin ? 'cursor-not-allowed bg-gray-300' : 'bg-black'}`}
            disabled={isProcessLogin}
          >Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;
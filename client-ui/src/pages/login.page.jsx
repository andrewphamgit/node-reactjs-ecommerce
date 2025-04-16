import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ROUTES} from "../contants/routes.contant.js";
import LoginService from "../services/login.service.js";

const LoginPage = ({fromLogin}) => {

  // const dispatch = useDispatch();

  const navigate = useNavigate();
  const currentTitle = fromLogin ? 'Login' : 'Sign Up';

  const [paramLogin, setParamLogin] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
  });
  const [isProcessLogin, setIsProcessLogin] = useState(false);

  function validBeforeSubmit(password, confirmPassword) {
    if (!fromLogin && password !== confirmPassword) {
      toast.error('The confirm password is not match');
      return false;
    }

    return true;
  }

  async function onSubmitHandler(event) {
    setIsProcessLogin(true);
    try {
      event.preventDefault();

      if (!validBeforeSubmit(paramLogin.password, paramLogin.confirmPassword)) {
        return;
      }

      const resUser = await (fromLogin
        ? LoginService.login({
          userName: paramLogin.userName,
          password: paramLogin.password,
        })
        : LoginService.register({
          userName: paramLogin.userName,
          password: paramLogin.password,
          email: paramLogin.email,
        }));

      if (resUser?.success) {
        // dispatch(updateToken(resUser.token));
        localStorage.setItem('token', resUser.token);
        navigate(ROUTES.HOME_PAGE);
      } else {
        toast.error(resUser?.message);
      }
    } catch (error) {
      console.log(currentTitle, ' fail: ', error);
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
    <form onSubmit={onSubmitHandler} className={'flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'}>
      <div className={'inline-flex items-center gap-2 mb-2 mt-10'}>
        <p className={'text-3xl'}>{currentTitle}</p>
        <hr className={'border-none h-[1.5px] w-8 bg-gray-800'} />
      </div>

      {fromLogin
      ? (<>
          <input className={'w-full px-3 py-2 border border-gray-800'}
                 type={"text"} placeholder={"Name"} required={true}
                 name={"userName"} value={paramLogin.userName}
                 onChange={onChangeInputField}
          />
          <input className={'w-full px-3 py-2 border border-gray-800'}
                 type={"password"} placeholder={"Password"} required={true}
                 name={"password"} value={paramLogin.password}
                 onChange={onChangeInputField}
          />
          <div className={'w-full flex justify-between text-sm mt-[-8px]'}>
            <Link to={ROUTES.SIGN_UP_PAGE}>Create account</Link>
          </div>
        </>)
      : (<>
          <input className={'w-full px-3 py-2 border border-gray-800'}
                 type={"text"} placeholder={"Name"} required={true}
                 name={"userName"} value={paramLogin.userName}
                 onChange={onChangeInputField}
          />
          <input className={'w-full px-3 py-2 border border-gray-800'}
                 type={"email"} placeholder={"Email"} required={true}
                 name={"email"} value={paramLogin.email}
                 onChange={onChangeInputField}
          />
          <input className={'w-full px-3 py-2 border border-gray-800'}
                 type={"password"} placeholder={"Password"} required={true}
                 name={"password"} value={paramLogin.password}
                 onChange={onChangeInputField}
          />
          <input className={'w-full px-3 py-2 border border-gray-800'}
                 type={"password"} placeholder={"Confirm Password"} required={true}
                 name={"confirmPassword"} value={paramLogin.confirmPassword}
                 onChange={onChangeInputField}
          />
          <div className={'w-full flex justify-between text-sm mt-[-8px]'}>
            <Link to={ROUTES.LOGIN_PAGE}>Login Here</Link>
          </div>
        </>)
      }

      <button type={"submit"}
              disabled={isProcessLogin}
              className={`font-light px-8 py-2 mt-4 text-white ${isProcessLogin ? 'cursor-not-allowed bg-gray-300' : 'bg-black'}`}
      >{currentTitle}</button>
    </form>
  )
}

export default LoginPage;

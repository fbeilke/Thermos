import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validators = {}

    if (!email.length) validators.email = "Email is required"
    if (!password.length) validators.password = "Password is required"

    if (Object.keys(validators).length === 0) {
      const serverResponse = await dispatch(
        thunkLogin({
          email,
          password,
        })
      );

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
      }
    } else {
      setErrors(validators)
    }
  };

  function demoUserLogin() {
    return dispatch(thunkLogin({email:'demo@aa.io', password:'password'}))
      .then(closeModal)
  }

  return (
    <div className='login-form-container'>
      <h1 className='login-label'>Log In</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <div className='login-containers'>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='login-inputs'
          />
          <div className="floating-placeholders" style={ email ? { top: "-18px" } : null }>
            <label>Email</label>
          </div>
          <div className='login-errors-container'>
            {errors.email && <p className='errors'>{errors.email}</p>}
          </div>
        </div>
        <div className='login-containers'>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='login-inputs'
          />
          <div className="floating-placeholders" style={ password ? { top: "-18px" } : null }>
            <label>Password</label>
          </div>
          <div className='login-errors-container'>
            {errors.password && <p className='errors'>{errors.password}</p>}
          </div>
        </div>
        <button className='login-button' type="submit">Log In</button>
      </form>
      <div className='demo-user-link-container'>
        <button onClick={demoUserLogin} className='demo-user-link'>Log in as demo user</button>
      </div>
      <div className='open-signup-modal'>
        <OpenModalMenuItem
          itemText="No account yet? Sign up!"
          modalComponent={<SignupFormModal />}
        />
      </div>
    </div>
  );
}

export default LoginFormModal;

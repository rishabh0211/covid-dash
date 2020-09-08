import React, { useState, useEffect } from 'react';
import Link from "react-router-dom/Link";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import StyledHome from './styled/StyledHome';
import Navbar from './Navbar';
import { isEmailValid, checkPassworkError } from '../utils';
import { loginUser, registerUser } from '../actions/actions';

const Home = ({ data, isAuthenticated, user, loginUser, registerUser }) => {
  const history = useHistory();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated]);

  const switchClickHandler = (type) => {
    return () => {
      setEmail('');
      setPassword('');
      setShowLoginForm(() => {
        return type === 'login';
      });
    };
  };

  const verifyInputs = () => {
    if (!email) {
      setError('Email cannot be empty!');
      return false;
    }
    if (!password) {
      setError('Password cannot be empty!');
      return false;
    }
    if (!isEmailValid(email)) {
      setError('Enter a valid email!');
      return false;
    }
    let passwordError = checkPassworkError(password, confirmPassword);
    if (passwordError) {
      setError(passwordError);
      return false;
    }
    return true;
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    if (!verifyInputs()) {
      return;
    }
    setLoading(true);
    loginUser({ email, password });
  };

  const handleRegisterSubmit = e => {
    e.preventDefault();
    if (!verifyInputs()) {
      return;
    }
    registerUser({ email, password });
  };

  return (
    <StyledHome>
      <section className="login-section">
        <div className="modal">
          <div className="switch-container">
            <button className={`switch-btn first ${showLoginForm && 'active'}`} onClick={switchClickHandler('login')}>Login</button>
            <button className={`switch-btn second ${!showLoginForm && 'active'}`} onClick={switchClickHandler('register')}>Register</button>
          </div>
          <form className="form" autoComplete="off" hidden={!showLoginForm} onSubmit={handleLoginSubmit}>
            <Link to="/dashboard"><h1 className="header">Login</h1></Link>
            <div className="form-group">
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={e => { setError(''); setEmail(e.target.value) }} />
              <label className="form-label" htmlFor="email">
                Email
                </label>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={e => { setError(''); setPassword(e.target.value) }} />
              <label className="form-label" htmlFor="password">Password</label>
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button className="submit-btn" disabled={loading}>Submit</button>
          </form>
          <form className="form" autoComplete="off" hidden={showLoginForm} onSubmit={handleRegisterSubmit} >
            <h1 className="header">Register</h1>
            <div className="form-group">
              <input
                type="text"
                name="email"
                id="register-email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={e => { setError(''); setEmail(e.target.value) }} />
              <label className="form-label" htmlFor="register-email">Email</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="register-password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={e => { setError(''); setPassword(e.target.value) }} />
              <label className="form-label" htmlFor="register-password">password</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="form-control"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={e => { setError(''); setConfirmPassword(e.target.value) }} />
              <label className="form-label" htmlFor="confirm-password">Confirm password</label>
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button className="submit-btn" disabled={loading}>Register</button>
          </form>
        </div>
      </section>
    </StyledHome>
  )
}

const mapStateToProps = (state) => {
  return { ...state }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
    registerUser: (user) => dispatch(registerUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

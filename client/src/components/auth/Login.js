import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';

export const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log('Log In')
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into your account
      </p>
      <form className="form" onSubmit={ e => onSubmit(e) }>
        <div className="form-group">
          <input type="email" name="email" placeholder="Email address" required
                 value={ email } onChange={ e => onChange(e) } />
        </div>
        <div className="form-group">
          <input type="password" name="password" placeholder="Password" minLength="6" required
                 value={ password } onChange={ e => onChange(e) } />
        </div>
        <input className="btn btn-primary" type="submit" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </Fragment>
  )
}
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      const newUser = {
        name,
        email,
        password
      };

      try {
        const config = {
          headers: {
            'Content-Type': 'Application/json'
          }
        }
        const body = JSON.stringify(newUser);
        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
      } catch (error) {
        console.error(error.response.data);
      }

    }
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create your account
      </p>
      <form className="form" onSubmit={ e => onSubmit(e) }>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required
                 value={ name } onChange={ e => onChange(e) } />
        </div>
        <div className="form-group">
          <input type="email" name="email" placeholder="Email address" required
                 value={ email } onChange={ e => onChange(e) } />
          <small className="form-text">
            This site uses Gravatar. So, if you want a profile image, use a Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input type="password" name="password" placeholder="Password" minLength="6" required
                 value={ password } onChange={ e => onChange(e) } />
        </div>
        <div className="form-group">
          <input type="password" name="password2" placeholder="Confirm password" minLength="6" required
                 value={ password2 } onChange={ e => onChange(e) } />
        </div>
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </Fragment>
  )
}

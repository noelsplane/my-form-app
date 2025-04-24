import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email' : '';
      case 'phone':
        const phoneRegex = /^\d{10}$/;
        return !phoneRegex.test(value) ? 'Please enter a valid 10-digit phone number' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // real‑time field validation
    const error = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // form‑level validation
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    console.log('Form submitted:', formData);
    // …your submit logic…
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {['name','email','phone'].map(field => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type={field==='email'?'email':field==='phone'?'tel':'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
            {fieldErrors[field] && <span className="error">{fieldErrors[field]}</span>}
            {errors[field]     && <span className="error">{errors[field]}</span>}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;

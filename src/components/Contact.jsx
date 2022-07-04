import React from 'react';
import { formatDate } from './Notes';

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: {
      value: '',
      regex: /^[a-zA-Z]+$/,
      active: false,
    },
    email: {
      value: '',
      regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      active: false,
    },
    title: {
      value: '',
      regex: null,
      active: false,
    },
    message: {
      value: '',
      regex: null,
      active: false,
    },
  });

  const [errorMessages, setErrorMessages] = React.useState({
    name: {
      message: 'Name cannot be empty or contain non-letter characters.',
      display: null,
    },
    email: {
      message: 'Invalid Email.',
      display: null,
    },
    title: {
      message: 'Title cannot be empty.',
      display: null,
    },
    message: {
      message: 'Message cannot be empty.',
      display: null,
    },
  });

  const [submitMessage, setSubmitMessage] = React.useState({
    message: '',
    color: '',
    display: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    let correct = Object.values(errorMessages).every((el) => !el.display);
    let message = correct ? 'Success.' : 'Empty fields or invalid input.';
    let color = correct ? '#92d050' : '#dc3545';
    setSubmitMessage((prev) => {
      return {
        ...prev,
        message: message,
        color: color,
        display: true,
      };
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value: value,
          active: true,
        },
      };
    });
  }

  React.useEffect(() => {
    const formDataEntries = Object.entries(formData);

    formDataEntries.forEach(([key, { value, regex, active }]) => {
      if (!active) return;

      let valid;

      if (!regex) {
        valid = value.length > 0;
      } else {
        valid = regex.test(value);
      }

      setErrorMessages((prev) => {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            display: !valid,
          },
        };
      });
    });
  }, [formData]);

  return (
    <main>
      <div className='flex-main flex-contact'>
        <form onSubmit={handleSubmit}>
          <h4 className='contact-title span-two'>Contact</h4>
          <div className='input-group'>
            <label htmlFor='name'>Name*</label>
            <input
              className={errorMessages.name.display ? 'invalid-input' : ''}
              onChange={handleChange}
              value={formData.name.value}
              type='text'
              name='name'
              id='name'
            />

            <h6 className='contact-error-message'>
              {errorMessages.name.display && errorMessages.name.message}
            </h6>
          </div>
          <div className='input-group'>
            <label htmlFor='email'>Email*</label>
            <input
              className={errorMessages.email.display ? 'invalid-input' : ''}
              onChange={handleChange}
              value={formData.email.value}
              type='text'
              name='email'
              id='email'
            />

            <h6 className='contact-error-message'>
              {errorMessages.email.display && errorMessages.email.message}
            </h6>
          </div>
          <div className='input-group span-two'>
            <label htmlFor='title'>Title</label>
            <input
              className={errorMessages.title.display ? 'invalid-input' : ''}
              onChange={handleChange}
              value={formData.title.value}
              type='text'
              name='title'
              id='title'
            />

            <h6 className='contact-error-message'>
              {errorMessages.title.display && errorMessages.title.message}
            </h6>
          </div>
          <div className='input-group span-two'>
            <label htmlFor='message'>Your message</label>
            <textarea
              className={`message ${
                errorMessages.message.display ? 'invalid-input' : ''
              }`}
              onChange={handleChange}
              value={formData.message.value}
              name='message'
              id='message'
            />

            <h6 className='contact-error-message'>
              {errorMessages.message.display && errorMessages.message.message}
            </h6>
          </div>

          <button className='contact-button'>Post Comment</button>
          {submitMessage.display && (
            <h4
              className='contact-submit-message'
              style={{ color: submitMessage.color }}
            >
              {submitMessage.message}
            </h4>
          )}
        </form>
      </div>
    </main>
  );
}

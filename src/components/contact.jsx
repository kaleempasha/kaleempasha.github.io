import { useState } from 'react'
import axios from 'axios'


const config = {
  cors: 'https://cors.io/',
  formUrl: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScWJXRW_IPaS8IcY8eFFR7sveRPEQ3b--Utf0kuUo1JcvqiUw/formResponse' 
};

const Input = ({ name, label, doChange, type='text'}) => {
  return (
    <input type={type} required placeholder={label} className='form-control' id={name} name={name} onChange={doChange} />
  )
}

const initialState = {
  inputs: {
    name: { id: 644362919, value: '' },
    email: { id: 1502826422, value: '' },
    phone: { id: 1679436207, value: '' },
    message: { id: 1283806891, value: '' }
  }
}
export const Contact = (props) => {
  const [{ inputs }, setState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target;

    inputs[name].value = value;
    setState((prevState) => ({ ...prevState, inputs }))
  }
  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let [key, value] of Object.entries(inputs)) {
      console.log(key + ':' + value);
      formData.append(`entry.${value.id}`, value.value);
    }

    axios.post(`${config.cors}${config.formUrl}`, formData)
    .then((response) => {
      console.log('response', response);
      clearState();
      alert("Submitted your message. Will contact you soon..!");
    })
    .catch(err => {
      console.log('err', err);
    })
  }
  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8' style={{display:'none'}}>
            <div className='row'>
              <div className='section-title'>
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name='sentMessage' validate='true' onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <Input name="name" label="Name" doChange={handleChange} />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <Input name="email" label="Email" doChange={handleChange} type="email" />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <input type="text" pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" placeholder="Mobile Number"
                        name="phone"  onChange={handleChange} className="form-control contact-field" required />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <textarea
                    name='message'
                    id='message'
                    className='form-control'
                    rows='4'
                    placeholder='Message'
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className='help-block text-danger'></p>
                </div>
                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className='col-md-12 col-md-offset-1 contact-info'>
            <div className='contact-item'>
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className='fa fa-map-marker'></i> Address
                </span>
                {props.data ? props.data.address : 'loading'}
              </p>
            </div>
            {/* <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-phone'></i> Phone
                </span>{' '}
                {props.data ? props.data.phone : 'loading'}
              </p>
            </div> */}
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-envelope-o'></i> Email
                </span>{' '}
                {props.data ? props.data.email : 'loading'}
              </p>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <ul>
                  <li>
                    <a target='_blank' rel='noreferrer' href={props.data ? props.data.linkedIn : '/'}>
                      <i className='fa fa-linkedin'></i>
                    </a>
                  </li>
                  <li>
                    <a target='_blank' rel='noreferrer' href={props.data ? props.data.twitter : '/'}>
                      <i className='fa fa-twitter'></i>
                    </a>
                  </li>
                  <li>
                    <a target='_blank' rel='noreferrer' href={props.data ? props.data.gitHub : '/'}>
                      <i className='fa fa-github'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 2021. Design by{' '}
            <a href={props.data ? 'mailto:' + props.data.email : '/'} rel='nofollow'>
              MK Web
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

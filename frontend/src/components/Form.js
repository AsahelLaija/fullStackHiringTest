import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    zip_code: '',
    equipment_type: '',
    description: '',
    estimated_value: '',
  })

  const [formError, setFormError] = useState({})
  const onChangeHandler = (event) => {
    if (event.target.name === 'languages') {

      let copy = { ...formData }

      if (event.target.checked) {
        copy.languages.push(event.target.value)
      } else {
        copy.languages = copy.languages.filter(el => el !== event.target.value)
      }

      setFormData(copy)

    } else {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value
      }))
    }
  }

  let navigate = useNavigate();

  const validateForm = () => {
    let err = {}

    if (formData.name === '') {
      err.name = 'Username required!'
    }

    if (formData.email === '' && formData.phone === ''){
      err.email = 'Email required! or Phone required!';
      err.phone = 'Phone required! or Email required!'
    } else if (formData.email !== '' && formData.phone === ''){
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!regex.test(formData.email)) {
        err.email = 'Email not valid!'
      } 
    } else if (formData.email === '' && formData.phone !== ''){
    }

    if (formData.state === '') {
      err.state = 'State required!';
    } 
    if (formData.equipment_type === '') {
      err.equipment_type = 'Equipment type required!';
    }

    if (formData.description === '') {
      err.description = 'Description required!'
    }

    setFormError({ ...err })
    //console.log(setFormError)

    return Object.keys(err).length < 1;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log("Form Data: ", formData);
    let isValid = validateForm()
    /*
    if (isValid) {
      alert('Submitted')
      //API call to server
    } else {
      alert('In-Valid Form')
    }
    */
    if(isValid) {
      fetch("/api/inbound_leads", {
	crossDomain: true,
	mode: "cors",
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(formData),
      }).then((response) => {
	if(response.status === 200) {
	  return navigate("/success");
	} else {
	  return navigate("/fail");
	}
      }).catch ((error) => {
	alert("fail );")
      });
    } else {
      alert('please fill the form correctly')
    }

  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <h3 className="title">Personal Information</h3>
            <div className="inputBox">
              <label>Name</label>
              <input
                type="text"
		name="name"
                value={formData.name}
                onChange={onChangeHandler}
              />
	      <span className='non-valid'>{formError.name}</span>
            </div>

            <div className="inputBox">
              <label>Email</label>
              <input
                type="email"
		name="email"
                value={formData.email}
                onChange={onChangeHandler}
              />
	      <span className='non-valid'>{formError.email}</span>
            </div>

            <div className="inputBox">
              <label>Phone</label>
              <input
                type="number"
		name="phone"
                value={formData.phone}
                onChange={onChangeHandler}
              />
	      <span className='non-valid'>{formError.phone}</span>
            </div>
            <div className="inputBox">
              <label>Address</label>
              <input
                type="text"
		name="address"
                value={formData.address}
                onChange={onChangeHandler}
              />
            </div>

            <div className="inputBox">
              <label>State</label>
              <input
                type="text"
		name="state"
                value={formData.state}
                onChange={onChangeHandler}
              />
	      <span className='non-valid'>{formError.state}</span>
            </div>
          </div>
          <div className="col">
            <div className="inputBox">
              <label>city</label>
              <input
                type="text"
		name="city"
                value={formData.city}
                onChange={onChangeHandler}
              />
            </div>
            <div className="inputBox">
              <label>Postal Code</label>
              <input
                type="text"
		name="zip_code"
                value={formData.zip_code}
                onChange={onChangeHandler}
              />
            </div>
            <h3 className="title">Asset Information</h3>

            <div className="inputBox">
              <label>type</label>
              <select
		className="select"
		name="equipment_type"
                value={formData.equipment_type}
                onChange={onChangeHandler}
              >
                <option>choose</option>
                <option value="Heavy/construction equipment">
                  Heavy/construction equipment
                </option>
                <option value="AG equipment">AG equipment</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Government">Government</option>
                <option value="Other">Other</option>
              </select>
	      <span className='non-valid'>{formError.equipment_type}</span>
            </div>

            <div className="inputBox">
              <label>Description</label>
              <textarea
                type="text"
		name="description"
                value={formData.description}
                onChange={onChangeHandler}
              />
	      <span className='non-valid'>{formError.description}</span>
            </div>

            <div className="inputBox">
              <label>Estimated Value</label>
              <input
                type="number"
		name="estimated_value"
                value={formData.estimated_value}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>
        <button className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default Form;

import React, { useState } from "react";

function Form() {
  const [name, setName] = useState("Asahel Laija");
  const [email, setEmail] = useState("asahellaija@gmail.com");
  const [phone, setPhone] = useState(7853178080);
  const [address, setAddress] = useState("2110 Mike Pl");
  const [state, setState] = useState("Kansas");
  const [city, setCity] = useState("Manhattan");
  const [zip_code, setZip_code] = useState("66502");
  const [equipment_type, setEquipment_type] = useState("Vehicle");
  const [description, setDescription] = useState("small vehicle 4 cyl. 2L");
  const [estimated_value, setEstimated_value] = useState(1000);

  const handleSubmit = (event) => {
    event.preventDefault();
    const forms = {
      name,
      email,
      phone,
      address,
      state,
      city,
      zip_code,
      equipment_type,
      description,
      estimated_value,
    };
    fetch("/api/inbound_leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forms),
    }).then(() => {
      return (
	<div>
	  <p> Welcome </p>
	</div>
      );
    }).catch ((error) => {
      alert("fail );")
    })
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
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="inputBox">
              <label>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="inputBox">
              <label>Phone</label>
              <input
                type="number"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="inputBox">
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>

            <div className="inputBox">
              <label>State</label>
              <input
                type="text"
                required
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="inputBox">
              <label>city</label>
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div className="inputBox">
              <label>Postal Code</label>
              <input
                type="text"
                value={zip_code}
                onChange={(event) => setZip_code(event.target.value)}
              />
            </div>
            <h3 className="title">Asset Information</h3>

            <div className="inputBox">
              <label>type</label>
              <select
			  	className="select"
                required
                value={equipment_type}
                onChange={(event) => setEquipment_type(event.target.value)}
              >
                <option value="Heavy/construction equipment">
                  Heavy/construction equipment
                </option>
                <option value="AG equipment">AG equipment</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Government">Government</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="inputBox">
              <label>Description</label>
              <textarea
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="inputBox">
              <label>Estimated Value</label>
              <input
                type="number"
                value={estimated_value}
                onChange={(event) => setEstimated_value(event.target.value)}
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

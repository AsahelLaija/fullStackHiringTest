import React, {useState, useEffect} from "react";

function NavBar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/hello", {
      crossDomain: true,
      mode: "cors",
      method: "GET"
    }).then((res) => res.json())
      .then((data) => setData(data.message))
  }, []);
	
  return (
    <div>
      <nav className="navbar">
	<div className="brand-title">Purple Wave</div>
	<a href="#" className="toggle-button">
	  <span className="bar"></span>
	  <span className="bar"></span>
	  <span className="bar"></span>
	</a>
	<div className="navbar-links">
	  <p>{!data ? "Loading..." : data}</p>
	  <ul>
	    <li><a href="/">home</a></li>
	    <li><a href="/about">About</a></li>
	    <li><a href="/contact/1234">Contact</a></li>
	  </ul>
	</div>
      </nav>
    </div>
  )
}

export default NavBar

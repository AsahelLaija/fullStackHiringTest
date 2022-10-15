import React, {useState, useEffect} from "react";

function BDFetch() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <p>
	{!data ? "Loading..." : data}
      </p>
    </div>
  )
}

export default BDFetch

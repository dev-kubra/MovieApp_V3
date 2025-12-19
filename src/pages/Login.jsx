import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextProvider";
import { useState } from "react";

export default function Login () {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    address:""
  })

  function handleChangeFormData(e) {
    const { name , value } = e.target; //destructing yapiyoruz, objeyi parcalayip icinden istedigimiz property leri aaldik
    setFormData((prevFormData)=>({...prevFormData, [name]: value }));
    console.log(name, value);

  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(formData);
    setFormData({
      email: "",
      password: "",
      username: "",
      phone: "",
      address:""
    });
  }
  return(
    <div className="container py-3">
      <div className="row">
        <div className="col-7 mx-auto">
          <div className={`card border ${cardColor}`}>
            <div className="card-header">
              <h2>Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChangeFormData} id="email" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChangeFormData} id="password" className="form-control" />
                </div>
                <button className={`btn btn-outline-${btnColor}`}>Submit</button>
          
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
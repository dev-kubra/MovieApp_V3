import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextProvider";

export default function Register () {
  
  console.log("Register sayfa");

  const { theme } = useContext( ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  function handleFormSubmit(e){
    e.preventDefault();

    const formData = new FormData(e.target);

    //Asagidaki gibi bunlari tek tek almak yerine key/value seklinde de alabiliriz daha kisa daha pratik
    console.log(formData.get("name"));
    console.log(formData.get("email"));
    console.log(formData.get("password"));
    console.log(formData.get("repassword"));
    console.log(formData.getAll("hobbies"));


    //key-value seklinde de boyle aliriz
    //name:kubra' , email:'kubra@gmail.com' vb. gibi..
    const hobbies = formData.getAll("hobbies");
    const data = Object.fromEntries(formData.entries());
    data.hobbies = hobbies;
    console.log(data);


  }

  return(
    <div className="container py-3">
      <div className="row">
        <div className="col-7 mx-auto">
          <div className={`card border ${cardColor}`}>
            <div className="card-header">
              <h2>Register</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" name="name" id="name" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name="email" id="email" className="form-control"/>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                  </div>
                  <div className="col-6">
                    <label htmlFor="repassword">Re-Password</label>
                    <input type="password" name="repassword" />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="hobbies" className="form-label">Hobiler</label>
                  <div className="card card-body">
                    <div className="form-check">
                      <input type="checkbox" name="hobbies" id="cars" className="form-check-input" value="cars"/>
                      <label htmlFor="cars" className="form-check-label">Arabalar</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" name="hobbies" id="books" className="form-check-input" value="books"/>
                      <label htmlFor="books" className="form-check-label">Kitaplar</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" name="hobbies" id="travel" className="form-check-input" value="travel"/>
                      <label htmlFor="travel" className="form-check-label">Gezi</label>
                    </div>
                  </div>
                </div>

                <button className={`btn btn-outline-${btnColor}`}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
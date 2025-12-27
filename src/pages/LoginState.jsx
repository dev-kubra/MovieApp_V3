import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextProvider";
import { useState } from "react";

export default function LoginState () {
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

  const [isEdited, setIsEdited] = useState({email:false, password:false});

  //const emailGecersizmi =(formData.email!=="") && (!formData.email.includes("@"));
  const emailGecersizmi =isEdited.email && (!formData.email.includes("@"));

  //const passwordGecersizmi = (formData.password !== "") && (formData.password.length < 5);
  const passwordGecersizmi = isEdited.password && (formData.password.length < 5);

  function handleChangeFormData(e) {
    const { name , value } = e.target; //destructing yapiyoruz, objeyi parcalayip icinden istedigimiz property leri aaldik
    setFormData((prevFormData)=>({...prevFormData, [name]: value }));
    //console.log(name, value);

    //Burada kullanici inputa tekrar yazmaya basladigi an altta cikan hata mesajinin kaldirilmasini istiyoruz, o yuzden isEdited'in hemen/bir karakter sonra false olmasini saglamaliyiz
    setIsEdited((prev)=>({
      ...prev,
      [name]: false
    }))
  }

  function handleInputBlur(e) {
    const name = e.target.name;

    //isEdited'i burada duzenleme sebebimiz de kullanici inputa yazma eylemini tamamlamis baska bir yere tikladigi anda yani blur event'ini tetikledigi anda hata mesajini gorunur olmaya hazir hale getiriyoruz, eger @ karakter kuralina ya da min-5-karakter kuralina uymuyorsa hata mesaji name:true oldugu icin gorunur olacak
    setIsEdited((prev)=>({
      ...prev,
      [name]: true
    }))
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if(!formData.email.includes("@") || formData.password.length <5){
      return;
    }
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
                  <input type="email" name="email" value={formData.email} onChange={handleChangeFormData} id="email" className="form-control" onBlur={handleInputBlur}/>
                  {emailGecersizmi && (
                    <div className="invalid-feedback d-block">
                      Geçerli bir email giriniz!
                    </div>
                  )
                  }
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChangeFormData} id="password" className="form-control" onBlur={handleInputBlur}/>
                  {passwordGecersizmi && (
                    <div className="invalid-feedback d-block">
                      Parolanız 5 karakterden küçük olamaz!
                    </div>
                  )}
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
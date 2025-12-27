import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextProvider";
import { useRef } from "react";
import { useState } from "react";
import Input from "../components/Input";

export default function Login () {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";


  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  //   username: "",
  //   phone: "",
  //   address:""
  // })


  //State tanimlamak yerine useRef kullanacagiz
  const email = useRef();
  const password = useRef();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [isEdited, setIsEdited] = useState({email:false, password:false});


  // function handleChangeFormData(e) {
  //   // const { name , value } = e.target; //destructing yapiyoruz, objeyi parcalayip icinden istedigimiz property leri aaldik
  //   setFormData((prevFormData)=>({...prevFormData, [name]: value }));
  //   console.log(name, value);

  // }

  function handleFormSubmit(e) {
    e.preventDefault();

    if(emailError || passwordError){
      return;
    }

    setEmailError(false);
    setPasswordError(false);

    const emailVal = email.current.value;
    const passwordVal = password.current.value;

    const emailIsInvalid = isEdited.email && !emailVal.includes("@");
    const passwordIsInvalid = isEdited.password && passwordVal.length < 5;
    

    if(emailIsInvalid) {
      setEmailError(true);
      return;
    }
    if(passwordIsInvalid) {
      setPasswordError(true);
      return;
    }

    console.log(email.current.value);
    console.log(password.current.value);
    email.current.value = "";
    password.current.value = "";

    // console.log(formData);
    // setFormData({
    //   email: "",
    //   password: "",
    //   username: "",
    //   phone: "",
    //   address:""
    // });
  }

  function handleEmailChange(){

    setEmailError(false);
  }
  function handlePasswordChange(){

    setPasswordError(false);
  }
  function handleOnBlur(e){
    const {name} = e.target;

    if(name==="email") {
      const val = !email.current.value.includes("@") ;
      if(val){
        setEmailError(true);
        return;
      }
    }
    if(name=== "password") {
      const val = password.current.value.length<5;
      if(val){
        setPasswordError(true);
        return;
      }
      
    }


    //isEdited'i burada duzenleme sebebimiz de kullanici inputa yazma eylemini tamamlamis baska bir yere tikladigi anda yani blur event'ini tetikledigi anda hata mesajini gorunur olmaya hazir hale getiriyoruz, eger @ karakter kuralina ya da min-5-karakter kuralina uymuyorsa hata mesaji name:true oldugu icin gorunur olacak
    setIsEdited((prev)=>({
      ...prev,
      [name]: true
    }))
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
              <form onSubmit={handleFormSubmit} noValidate>

                <Input id="email" labelText="Email" error={emailError && "Geçerli bir email giriniz"} ref={email} handleOnChange={handleEmailChange} handleOnBlur={handleOnBlur}/>
                
                {/* <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                  type="email" 
                  name="email" 
                  // value={formData.email} 
                  // onChange={handleChangeFormData} 
                  ref={email}
                  id="email" 
                  className="form-control" />
                  {emailError &&(
                    <div className="invalid-feedback d-block">
                      Geçerli bir email giriniz!
                    </div>
                  )}
                </div> */}



                <Input id="password" labelText="Password" error={passwordError && "Parolanız 5 karakterden fazla olmak zorunda"} ref={password} handleOnChange={handlePasswordChange} handleOnBlur={handleOnBlur}/>

                {/* <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                  type="password" 
                  name="password" 
                  // value={formData.password} 
                  // onChange={handleChangeFormData} 
                  ref={password}
                  id="password" 
                  className="form-control" />
                  {passwordError &&(
                    <div className="invalid-feedback d-block">
                      Geçerli bir password giriniz!
                    </div>
                  )}
                </div> */}





                <button className={`btn btn-outline-${btnColor}`}>Submit</button>
          
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();


//bu klasik bir component aslinda, isminden dolayi karistirmayalim ozel bir isim degil biz verdik ismi
export function ThemeContextProvider ({children}) {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);


  useEffect(() => {
    localStorage.setItem("theme", (theme));
  }, [theme]);



  /* Hoca bu sekilde yazmisti, hatali oldugunu dusundugum icin yukaridaki gibi yazdim. storedTheme zaten string sakliyor o yuzden tekrar stringe cevirmek gereksiz ve projenin farkli yerlerinde hata verebilir*/ 
  /*
  const storedTheme = localStorage.getItem("theme");
  const initialTheme = storedTheme ? JSON.stringify(storedTheme) : "light" ;
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]) */


  return(
    <ThemeContext.Provider value={{theme, setTheme}}>   {/* burada yazilan value'lar diger component'larin erisebilecegi key'ler oluyor */}
      {children}
    </ThemeContext.Provider>
  )
}
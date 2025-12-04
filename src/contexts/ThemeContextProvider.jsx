import { useState } from "react";
import { Children } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();


//bu klasik bir component aslinda, isminden dolayi karistirmayalim ozel bir isim degil biz verdik ismi
export function ThemeContextProvider ({children}) {
  const [theme, setTheme] = useState("dark");

  return(
    <ThemeContext.Provider value={{theme, setTheme}}>   {/* burada yazilan value'lar diger component'larin erisebilecegi key'ler oluyor */}
      {children}
    </ThemeContext.Provider>
  )
}
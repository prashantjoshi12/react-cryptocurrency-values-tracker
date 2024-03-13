import { useState, useEffect } from "react";

export default function useDarkSide() {
  document.getElementById("root").style = `background-color: ${
    localStorage.theme === "dark" ? "#121212" : "white"
  }; color: ${localStorage.theme === "dark" ? "white" : "#121212"};`;

  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  useEffect(() => {
    if (localStorage.theme == "dark") localStorage.removeItem("theme");
    else localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}

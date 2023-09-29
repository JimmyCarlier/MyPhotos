import Cookies from "js-cookie";

export function UseSession() {
  const tokenStorage = localStorage.getItem("session");
  const tokenCookie = Cookies.get("session");
  const tokenArray = [tokenStorage, tokenCookie];
  const token = tokenArray.join("");

  return token;
}

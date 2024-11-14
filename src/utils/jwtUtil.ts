import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface DecodedToken {
  exp: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  const decodedToken = jwtDecode<DecodedToken>(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
}

export function checkTokenAndLogout() {
  const token = Cookies.get("jwtToken");
  
  if (!token || isTokenExpired(token)) {
    Cookies.remove("jwtToken");
    localStorage.removeItem("userDetails");
    return true;
  }
  return false;
}
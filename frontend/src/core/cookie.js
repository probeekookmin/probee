import { Cookies } from "react-cookie";
const cookies = new Cookies();

//쿠키에 있는 값을 꺼낼때
export const getCookie = (name) => {
  return cookies.get(name);
};
//쿠키를 지울때
export const removeCookie = (name) => {
  return cookies.remove(name);
};

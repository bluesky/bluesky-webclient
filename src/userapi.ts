import decodeJwt from 'jwt-decode';
import axios from "axios";

var axiosUserInstance = axios.create({
  baseURL: process.env.REACT_APP_USER_API_PREFIX,
});

export const loginAPI = async(email: string, password: string): Promise<Object> => {
  const res = await axiosUserInstance.post('auth/login',
      {
          email: email,
          password: password,
      });
  console.log(res);
  return res.data;
}

export const registerAPI = async(firstName: string, lastName: string, email: string, password: string): Promise<Object> => {
  const res = await axiosUserInstance.post('auth/register',
      {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
      });
  console.log(res);
  return res.data;
}

/*
  getUser = async () => {
    const token = localStorage.getItem('token');
    // Create request
    const request = new Request('http://localhost:9000/auth/users/me', {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`}
    });
    // Fetch request
    const response = await fetch(request);
    const data = await response.json();
    return data
  };

  isAuthenticated = () => {
    const permissions = localStorage.getItem('permissions');
    if (!permissions) {
      return false;
    }
    return permissions === 'user' ? true : false;
  };
}
export default new Auth();
*/
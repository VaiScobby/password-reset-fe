import { instance } from "./instance";

const userServices = {
  register: async (name, email, password) => {
    return await instance.post(`/users`, {
      name,
      email,
      password,
    });
  },
  login: async (email, password) => {
    return await instance.post(
      "/users/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  },
  submit: async (email) => {
    return await instance.put(`/users/forgot`, {
      email,
    });
  },
  verify: async (key) => {
    return await instance.get(`/users/verify/${key}`);
  },
  reset: async (key, password) => {
    return await instance.put(`/users/reset`, {
      key,
      password,
    });
  },
};

export default userServices;

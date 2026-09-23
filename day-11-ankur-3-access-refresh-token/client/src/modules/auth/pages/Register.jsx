import React, { useState } from "react";
import { useNavigate } from "react-router";
import useApi from "../../../shared/axios/api";
import { useAuth } from "../context/AuthProvider";


const Register = () => {
  const navigate = useNavigate()
  const {setAccessToken,setUser} = useAuth()
  const api = useApi()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      let response = await  api.post('/register',form)
      console.log(response);
      setAccessToken(response.data.accessToken)
      setUser(response.data.data.user)
      navigate('/profile')


    } catch (error) {
      console.log('something is wrong', error.message);

    }

  };

  return (
    <main className="flex justify-center items-center min-h-screen" >
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          className="border p-2 rounded-sm"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          type="email"
          name="email"
          className="border p-2 rounded-sm"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          className="border p-2 rounded-sm"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <button
          type="submit"
          className="border p-2 bg-blue-200 rounded-sm"
        >
          Register
        </button>
      </form>
    </main>
  );
};

export default Register;

import React, { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import useApi from "../../../shared/axios/api";

const Profile = () => {
  const { user, setUser } = useAuth();

  const api = useApi();

  const fetchProfile = async () => {

    try {
      const response = await api.get("/me");

      setUser(response.data.data.user);
    }
     catch (error) {
      console.log("respsonse not fetched yet", error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="p-6">
      <h1>Profile</h1>
      <p>Name -{user.name}</p>
      <p>Email-{user.email}</p>
    </div>
  );
};

export default Profile;

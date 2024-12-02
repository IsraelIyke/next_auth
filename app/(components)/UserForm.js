"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      const response = res.json;
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className=" flex flex-col gap-3 w-1/2"
      >
        <h1>Create New User</h1>
        <label>Full Name</label>
        <input
          id="name"
          name="name"
          onChange={handleChange}
          required={true}
          value={formData.name}
          type="text"
          className=" m-2 bg-slate-400 rounded"
        />

        <label>Email</label>
        <input
          id="email"
          name="email"
          onChange={handleChange}
          required={true}
          value={formData.email}
          type="text"
          className=" m-2 bg-slate-400 rounded"
        />

        <label>Password</label>
        <input
          id="password"
          name="password"
          onChange={handleChange}
          required={true}
          value={formData.password}
          type="password"
          className=" m-2 bg-slate-400 rounded"
        />
        <input
          type="submit"
          value="Create User"
          className=" bg-blue-500 hover:bg-blue-100"
        />
      </form>
      <p className=" text-orange-500">{errorMessage}</p>
    </>
  );
};

export default UserForm;

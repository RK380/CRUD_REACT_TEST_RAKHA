import React, { useState } from "react";
import UserDataService from "../service/DataService";

const AddUser = () => {
  const initialUserState = {
    id: null,
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    currentPassword: "",
    expiredDate: "",
    groupAccess: "",
    published: false
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    var data = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: user.password,
      currentPassword: user.currentPassword,
      expiredDate: user.expiredDate,
      groupAccess: user.groupAccess
    };

    UserDataService.create(data)
      .then(response => {
        setUser({
          id: response.data.id,
          firstname: response.data.firstname,
            lastname: response.data.lastname,
            username: response.data.username,
            email: response.data.email,
            password: response.data.password,
            currentPassword: response.data.currentPassword,
            expiredDate: response.data.expiredDate,
            groupAccess: response.data.groupAccess,
            published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5 px-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0 px-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-5 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Users Information</h3>
              <p className="mt-1 text-sm text-gray-600">Gunakan alamat email asli untuk dapat mengirim email.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newUser}>
                    Add
                    </button>
                </div>
            ): (
                <form>
                <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                            First name
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            value={user.firstname}
                            onChange={handleInputChange}
                            id="firstname"
                            autoComplete="given-name"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                            Last name
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            value={user.lastname}
                            onChange={handleInputChange}
                            id="lastname"
                            autoComplete="family-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleInputChange}
                            id="username"
                            autoComplete="family-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            id="email"
                            autoComplete="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            id="password"
                            autoComplete="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                            Current Password
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={user.currentPassword}
                            onChange={handleInputChange}
                            id="currentPassword"
                            autoComplete="current-password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="expiredDate" className="block text-sm font-medium text-gray-700">
                            Expired Date
                        </label>
                        <input
                            type="date"
                            name="expiredDate"
                            value={user.expiredDate}
                            onChange={handleInputChange}
                            id="expiredDate"
                            autoComplete="expire-date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="groupAccess" className="block text-sm font-medium text-gray-700">
                            Group Access
                        </label>
                        <select
                            id="groupAccess"
                            name="groupAccess"
                            value={user.groupAccess}
                            onChange={handleInputChange}
                            autoComplete="group-access"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                            <option>HR</option>
                            <option>IT</option>
                            <option>Sales</option>
                        </select>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                        onClick={saveUser}
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Add
                    </button>
                    </div>
                </div>
                </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;

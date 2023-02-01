import React, { useState, useEffect } from "react";
import UserDataService from "../service/DataService";

const User = props => {
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
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentUser.id,
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      username: currentUser.username,
      password: currentUser.password,
      currentPassword: currentUser.currentPassword,
      expiredDate: currentUser.expiredDate,
      groupAccess: currentUser.groupAccess,
      published: status
    };

    UserDataService.update(currentUser.id, data)
      .then(response => {
        setCurrentUser({ ...currentUser, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateUser = () => {
    UserDataService.update(currentUser.id, currentUser)
      .then(response => {
        console.log(response.data);
        setMessage("The user was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    UserDataService.remove(currentUser.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/user");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <h4>User</h4>
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
                            value={currentUser.firstname}
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
                            value={currentUser.lastname}
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
                            value={currentUser.username}
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
                            value={currentUser.email}
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
                            value={currentUser.password}
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
                            value={currentUser.currenPassword}
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
                            value={currentUser.expiredDate}
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
                            value={currentUser.groupAccess}
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
                    </div>
                </div>
                </form>

          {currentUser.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteUser}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateUser}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Tolong click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;

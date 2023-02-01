import React, { useState, useEffect, useMemo, useRef } from "react";
import UserDataService from "../service/DataService";
import { useTable } from "react-table";

const ListUser = (props) => {
  const [user, setUser] = useState([]);
  const [searchName, setSearchName] = useState("");
  const userRef = useRef();

  userRef.current = user;

  useEffect(() => {
    retrieveUser();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveUser = () => {
    UserDataService.getAll()
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUser();
  };

  const removeAllUser = () => {
    UserDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByUser = () => {
    UserDataService.findByUser(searchName)
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openUser = (rowIndex) => {
    const id = userRef.current[rowIndex].id;

    props.history.push("/user/" + id);
  };

  const deleteUser = (rowIndex) => {
    const id = userRef.current[rowIndex].id;

    UserDataService.remove(id)
      .then((response) => {
        props.history.push("/user");

        let newUser = [...userRef.current];
        newUser.splice(rowIndex, 1);

        setUser(newUser);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstname",
      },
      {
        Header: "Last Name",
        accessor: "lastname",
      },
      {
        Header: "User Name",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Password",
        accessor: "password",
      },
      {
        Header: "Current Password",
        accessor: "currentPassword",
      },
      {
        Header: "Expired Date",
        accessor: "expiredDate",
      },
      {
        Header: "Group Access",
        accessor: "groupAccess",
      },
      {
        Header: "Status",
        accessor: "published",
        Cell: (props) => {
          return props.value ? "Published" : "Pending";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openUser(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteUser(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: user,
  });

  return (
    <div className="list row">
      <div className="row-span-8">
        <div className="input-group px-6 py-8">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by Name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append py-2">
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              type="button"
              onClick={findByUser}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 list">
        <table
          className="table-auto"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6">
        <button className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" onClick={removeAllUser}>
          Remove All
        </button>
      </div>
    </div>
  );

};

export default ListUser;

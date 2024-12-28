import React, { useEffect, useState } from "react";
import Table from "./Table";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import { getAuthToken } from "../utils/auth";
import { useLoading } from "../utils/LoadingContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/user-api/list", {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        if (!err?.response) {
          toast.error("Failed to fetch users due to a network error.");
        } else {
          toast.error(
            "Failed to fetch users: " + err.response?.data?.message ||
              "Unknown error",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setLoading]);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/user-api/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      toast.success("User deleted successfully!", { position: "bottom-right" });
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div>
      <h3>Users</h3>
      <Table
        data={users}
        columns={[
          { label: "ID", key: "userId" },
          { label: "Username", key: "username" },
          { label: "First Name", key: "firstName" },
          { label: "Last Name", key: "lastName" },
          { label: "Email", key: "email" },
          {
            label: "Actions",
            key: "actions",
            render: (row) => (
              <button
                onClick={() => deleteUser(row.userId)}
                className="deleteButton"
              >
                Delete
              </button>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Users;

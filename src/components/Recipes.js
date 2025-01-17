import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import Table from "./Table";
import { toast } from "react-toastify";
import { getAuthToken } from "../utils/auth";
import { useLoading } from "../utils/LoadingContext";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/recipe-api?pageNumber=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          },
        );
        setRecipes(response.data);
        console.log(response);
      } catch (err) {
        if (!err?.response) {
          toast.error("Failed to fetch recipes due to a network error.");
        } else {
          toast.error(
            "Failed to fetch recipes: " + err.response?.data?.message ||
              "Unknown error",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentPage, setLoading]);

  const handlePageChange = (page) => {
    if (page >= 0) {
      setCurrentPage(page);
    }
  };

  const deleteRecipe = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?",
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axiosInstance.delete(`/recipe-api/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      toast.success("Recipe deleted successfully!", {
        position: "bottom-right",
      });
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id),
      );
    } catch (error) {
      toast.error("Failed to delete recipe. Please try again.", {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Recipes</h3>
      <Table
        data={recipes}
        columns={[
          { label: "ID", key: "id" },
          { label: "Name", key: "name" },
          { label: "User ID", key: "userId" },
          { label: "Like Count", key: "likeCount" },
          { label: "Comment Count", key: "commentCount" },
          { label: "Save Count", key: "saveCount" },
          { label: "Created At", key: "createdAt" },
          {
            label: "Actions",
            key: "actions",
            render: (row) => (
              <button
                onClick={() => deleteRecipe(row.id)}
                className="deleteButton"
              >
                Delete
              </button>
            ),
          },
        ]}
      />
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          class="paginationButton"
        >
          Previous
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          class="paginationButton"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Recipes;

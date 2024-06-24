"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { getSession } from "@actions";
import { RecipeModel } from "../../types";
import { IronSession } from "iron-session";
import { SessionData } from "@lib";

const Profil = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [session, setSession] = useState<IronSession<SessionData> | null>(null);
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [editRecipe, setEditRecipe] = useState<RecipeModel | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const deleteRecipe = async (id: any) => {
    if (!session) return;
    try {
      const response = await axios.delete(`http://152.67.77.19:3000/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      console.log(response.data);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const updateRecipe = async () => {
    if (!editRecipe || !session) return;

    try {
      const response = await axios.put(
        `http://152.67.77.19:3000/recipes/${editRecipe.id}`,
        editRecipe,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      console.log(response.data);
      setRecipes(
        recipes.map((recipe) =>
          recipe.id === editRecipe.id ? editRecipe : recipe
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const handleEditClick = (recipe: RecipeModel) => {
    setEditRecipe(recipe);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editRecipe) {
      setEditRecipe({
        ...editRecipe,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://152.67.77.19:3000/recipes/");
        console.log("response:", response);
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const session = await getSession();
        setSession(session);
        setUsername(session.username || "");

        const recipeResponse = await axios.post(
          "http://152.67.77.19:3000/auth/get_id",
          {},
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        setUserId(recipeResponse.data);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => recipe.creator === userId);

  return (
    <div className="flex flex-col ms-7 mr-7 mt-5 space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">Username:</p>
          <p className="text-xl font-bold">{username}</p>
        </div>
        <div>
          <Image
            src="/images/user.jpg"
            width={200}
            height={200}
            alt="Picture of the author"
            className="rounded-full"
          />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-800 leading-tight shadow-sm mb-5">
          Deine Rezepte
        </h1>
        {filteredRecipes.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <li
                key={recipe.id}
                className="bg-white p-5 rounded-lg shadow-lg flex flex-col"
              >
                <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
                <p className="text-gray-700 mb-4">{recipe.description}</p>
                <div className="mt-auto flex space-x-2">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                    onClick={() => deleteRecipe(recipe.id)}
                  >
                    Delete Recipe
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    onClick={() => handleEditClick(recipe)}
                  >
                    Edit Recipe
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-700">Keine Rezepte gefunden.</p>
        )}
      </div>
      {isEditModalOpen && editRecipe && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
            <input
              type="text"
              name="name"
              value={editRecipe.name}
              onChange={handleEditChange}
              className="border border-gray-300 p-2 rounded mb-4 w-full"
              placeholder="Recipe Name"
            />
            <textarea
              name="description"
              value={editRecipe.description}
              onChange={handleEditChange}
              className="border border-gray-300 p-2 rounded mb-4 w-full"
              placeholder="Description"
            />
            <div className="flex space-x-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                onClick={updateRecipe}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;

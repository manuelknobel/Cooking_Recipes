"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { RecipeModel } from "../../types";
import Link from "next/link";

const Recipes = () => {
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://152.67.77.19:3000/recipes/");
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);


  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <div className="container mt-5">
        <h1>Cooking Recipes</h1>
        <Link href="/recipes/create-recipes">Rezept erstellen</Link>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span>Suchen:</span>
            <input
              type="text"
              className="form-control d-inline-block mx-2"
              style={{ width: "200px" }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="list-group">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <div key={index} className="list-group-item mb-3">
                <div>
                  <strong>{recipe.creator}</strong>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{recipe.name}</h5>
                    <p>{recipe.description}</p>
                  </div>
                  <div>
                    <a href="#" className="text-primary me-3">
                      Mehr ansehen
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Keine Rezepte gefunden.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Recipes;

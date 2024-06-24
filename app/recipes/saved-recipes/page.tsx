//Not used, but possible extension for the future


"use client";

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SavedRecipes = () => {
  const placeholderRecipes = [
    {
      name: 'Rezeptname 1',
      course: 'Vorspeise',
      mealType: 'Abendessen',
    },
    {
      name: 'Rezeptname 2',
      course: 'Vorspeise',
      mealType: 'Abendessen',
    },
  ];

  return (
    <main>
      <div className="container mt-5">
        <h1>Gespeicherte Rezepte</h1>
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {placeholderRecipes.map((recipe, index) => (
                <tr key={index}>
                  <td>Rezeptname: {recipe.name}</td>
                  <td>{recipe.course}</td>
                  <td>{recipe.mealType}</td>
                  <td>
                    <a href="#" className="text-primary">
                      Mehr ansehen
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default SavedRecipes

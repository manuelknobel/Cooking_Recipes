import React, { useRef } from 'react';

interface Ingredient {
  name: string;
  weight: string;
}

interface FormProps {
  ingredients: Ingredient[];
  recipeName: string;
  instructions: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleIngredientChange: (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleRemoveClick: (index: number) => void;
  addIngredient: () => void;
}

const Form: React.FC<FormProps> = ({
  ingredients,
  recipeName,
  instructions,
  handleSubmit,
  handleIngredientChange,
  handleRemoveClick,
  addIngredient
}) => {
  const ingredientsContainerRef = useRef(null);

  return (
    <main>
      <div className="container mt-5">
        <h1>Create Recipes</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="recipeName" className="form-label">
              Recipe Name
            </label>
            <input
            type="text"
            className="form-control"
            id="recipeName"
            name="recipeName"
            placeholder="Recipe Name"
            value={recipeName}
            onChange={(e) => handleIngredientChange(0, e)}
            />
          </div>

          <div id="ingredientsContainer" ref={ingredientsContainerRef}>
            <label className="form-label">Ingredients:</label>
            {ingredients.map((ingredient, index) => (
              <div className="row mb-3 ingredientRow" key={index}>
                <div className="col">
                <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                />
                </div>
                <div className="col">
                <input
                type="text"
                className="form-control"
                name="weight"
                placeholder="Weight (g)"
                value={ingredient.weight}
                onChange={(e) => handleIngredientChange(index, e)}
                />
                </div>
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-danger removeIngredient"
                    onClick={() => handleRemoveClick(index)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-secondary mb-3"
            onClick={addIngredient}
          >
            Add Ingredient
          </button>

          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">
              Instructions:
            </label>
            <textarea
                className="form-control"
                id="instructions"
                name="instructions"
                rows={4}
                value={instructions}
                onChange={(e) => handleIngredientChange(0, e)}
                ></textarea>
          </div>

          <button type="submit" className="btn btn-primary mb-5">
            Create
          </button>
        </form>
      </div>
    </main>
  );
};

export default Form;

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { getSession } from '@actions'; 
import Form from '@components/Form'; 
import { IronSession } from 'iron-session';
import { SessionData } from '@lib';

const CreateRecipes = () => {
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', weight: '' }]);
  const router = useRouter();
  const [session, setSession] = useState<IronSession<SessionData> | null>(null); 

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession(); 
        setSession(session);
      } catch (error) {
        console.error('Failed to fetch session:', error);
      }
    };

    fetchSession();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session || !session.isLoggedIn) {
      router.push('/login');
      return;
    }

    try {
      const recipeResponse = await axios.post('http://152.67.77.19:3000/recipes/', {
        name: recipeName,
        creationDate: Date.now(),
        description: instructions
      },{
        headers:{
          Authorization: `Bearer ${session.accessToken}`
        }
      });

      const recipeId = recipeResponse.data.id;

      await Promise.all(
        ingredients.map(async (ingredient) => {
          await axios.post('http://152.67.77.19:3000/ingredients/', {
            name: ingredient.name,
            amount: ingredient.weight,
            recipes: recipeId,
            unit: "G"
          },{
            headers:{
              Authorization: `Bearer ${session.accessToken}`
            }
          }
          );
        })
      );

      setRecipeName('');
      setInstructions('');
      setIngredients([{ name: '', weight: '' }]);
      alert('Recipe created successfully!');
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Failed to create recipe. Please try again.');
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', weight: '' }]);
  };

  const handleIngredientChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
  
    if (name === 'recipeName') {
      setRecipeName(value);
    } else if (name === 'instructions') {
      setInstructions(value);
    } else {
      const updatedIngredients = [...ingredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [name]: value
      };
      setIngredients(updatedIngredients);
    }
  };
  
  

  const handleRemoveClick = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  return (
    <Form
      ingredients={ingredients}
      recipeName={recipeName}
      instructions={instructions}
      handleSubmit={handleSubmit}
      handleIngredientChange={handleIngredientChange}
      handleRemoveClick={handleRemoveClick}
      addIngredient={addIngredient}
    />
  );
};

export default CreateRecipes;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { supabase } from '../supabaseClient';

function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoritesWithImages = async () => {
      try {
        // Get the authenticated user's session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session || !session.user) {
          setError('Unable to fetch user session');
          return;
        }

        const user = session.user;

        // Fetch user's favorite recipes from the database
        let { data: favorites, error: fetchError } = await supabase
          .from('favorited_recipe')
          .select('recipe_name') // Fetch only the recipe names
          .eq('user_id', user.id);

        if (fetchError) {
          setError('Error fetching favorite recipes');
          return;
        }

        // Fetch images for each recipe from the API
        const recipesWithImages = await Promise.all(
          favorites.map(async (recipe) => {
            try {

              console.log('API Key:', process.env.REACT_APP_API_KEY);

              const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${recipe.recipe_name}`
              );

              if (!response.ok) {
                throw new Error('Failed to fetch recipe details');
              }

              const data = await response.json();
              const firstResult = data.results?.[0] || {}; // Get the first result
              return {
                ...recipe,
                image: firstResult.image || '', // Add image URL or fallback
              };
            } catch {
              return { ...recipe, image: '' }; // Fallback if API call fails
            }
          })
        );

        setFavoriteRecipes(recipesWithImages);
      } catch (error) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesWithImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Grid>
      {favoriteRecipes.length > 0 ? (
        favoriteRecipes.map((item, index) => (
          <Card key={index}>
            <Link to={'/recipe/' + item.recipe_name}>
              <img src={item.image || '/default-recipe.jpg'} alt={item.recipe_name} />
              <h4>{item.recipe_name}</h4>
            </Link>
          </Card>
        ))
      ) : (
        <p>No saved recipes yet.</p>
      )}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(8rem, 1fr));
  grid-gap: 2rem;
  padding-left: 9rem;
  padding-right: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  overflow: hidden;
  border-radius: 1rem;

  img {
    width: 100%;
    height: auto;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    font-size: 1rem;
    text-align: center;
    padding: 1rem;
    background-color: rgb(249, 244, 233);
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
`;

export default Favorites;

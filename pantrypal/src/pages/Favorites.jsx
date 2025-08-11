import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { supabase } from '../supabaseClient';

function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllFavorites = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('You must be logged in to see favorites.');

        // Fetch the list of saved recipe IDs from your corrected table
        const { data: favoriteIds, error: fetchError } = await supabase
          .from('favorited_recipe')
          .select('recipe_id')
          .eq('user_id', user.id);

        if (fetchError) throw fetchError;

        if (!favoriteIds || favoriteIds.length === 0) {
          setFavoriteRecipes([]);
          return;
        }

        // Use the reliable "Get Recipe Information" endpoint for each ID
        const recipeDetailPromises = favoriteIds.map(async (fav) => {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/${fav.recipe_id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
          );
          if (!response.ok) {
            console.error(`Failed to fetch details for ID ${fav.recipe_id}`);
            return null;
          }
          return response.json();
        });

        const allRecipeDetails = await Promise.all(recipeDetailPromises);
        setFavoriteRecipes(allRecipeDetails.filter(recipe => recipe !== null));

      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFavorites();
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
        favoriteRecipes.map((item) => (
          item && (
            <Card key={item.id}>
              <Link to={'/recipe/' + item.id}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          )
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
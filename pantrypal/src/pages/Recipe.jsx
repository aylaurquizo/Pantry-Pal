import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');
  const [isFavorited, setIsFavorited] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUserData();
  }, []);

  const checkFavoriteStatus = useCallback(async (recipeId) => {
    if (!user || !recipeId) return;

    try {
      const { data, error } = await supabase
        .from('favorited_recipe')
        .select('recipe_id')
        .match({ user_id: user.id, recipe_id: recipeId })
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      setIsFavorited(!!data);

    } catch (error) {
      console.error('Error checking favorite status:', error.message);
    }
  }, [user]);

  useEffect(() => {
    if (details.id) {
      checkFavoriteStatus(details.id);
    }
  }, [details.id, checkFavoriteStatus]);

  const fetchDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch recipe details");
      const detailData = await response.json();
      setDetails(detailData);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  }, [params.name]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const addToFavorites = async () => {
    if (!user) {
        alert("You must be logged in to save recipes.");
        return;
    }
    try {
      const { error } = await supabase
        .from('favorited_recipe')
        .upsert([{
            user_id: user.id,
            recipe_id: details.id,
            recipe_name: details.title,
            description: details.summary,
        }]);

      if (error) throw error;
      
      setIsFavorited(true);
      alert('Recipe added to favorites!');
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
    }
  };

  const removeFromFavorites = async () => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('favorited_recipe')
        .delete()
        .match({ user_id: user.id, recipe_id: details.id });

      if (error) throw error;
      
      setIsFavorited(false);
      alert('Recipe removed from favorites!');
    } catch (error) {
      console.error("Error removing from favorites:", error.message);
    }
  };

  return (
    <Container>
    <DetailWrapper>
        <div>
          <h2>
            {details.title}
          </h2>
          <img src={details.image} alt={details.title} />
        </div>
        {isFavorited ? (
          <Button className="removeFromFavorite" onClick={removeFromFavorites}>
            Remove from Favorites
          </Button>
        ) : (
          <Button className="addToFavorite" onClick={addToFavorites}>
            Add to Favorites
          </Button>
        )}
        <Info>
          <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>
            Instructions
          </Button>
          <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>
            Ingredients
          </Button>
          {activeTab === 'instructions' && (
              <div>
                <h3 className="recipe-info" dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                <h3 className="recipe-info" dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
            </div>
          )}
          {activeTab === 'ingredients' && (
            <ul>
            {details.extendedIngredients?.map((ingredient) => <li className='ingredients-tab' key={ingredient.id}>{ingredient.original}</li>)}
          </ul>
          )}
        </Info>
    </DetailWrapper>
    </Container>
  );
}

const DetailWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 5rem;
  margin-left: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }
  }

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 768px) {
      align-items: flex-start;
    }
  }

  li {
    font-family: 'Montserrat', sans-serif;
    color: rgba(109, 80, 53);
    margin-right: 1rem;
    font-size: 0.8rem;
    line-height: 1.2rem;
  }

  ul {
    margin-top: 1rem;
    padding-left: 1rem;
  }

  img {
    max-width: 90%;
    height: auto;
    border-radius: 8px;
    margin-top: 1rem;

    @media (min-width: 768px) {
      margin-top: 0;
    }
  }
`;

const Info = styled.div`
  flex: 1;
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
    gap: 1rem;
  }
`;

const Button = styled.button`
  padding: 1rem 1rem;
  color: rgba(109, 80, 53);
  background: white;
  border: 2px solid rgba(109, 80, 53);
  margin: 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;

  &.active {
    background: rgba(109, 80, 53);
    color: white;
  }

  @media (min-width: 768px) {
    margin: 0;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.7rem;
    font-size: 0.9rem;
  }
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 1rem;
`;

export default Recipe;
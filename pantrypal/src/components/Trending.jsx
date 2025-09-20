import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Trending() {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrending = async () => {
      try {
        const checkCache = localStorage.getItem('trending');

        if (checkCache) {
          setTrendingRecipes(JSON.parse(checkCache));
        } else {
          const api = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
          );
          if (!api.ok) {
            throw new Error('Could not fetch trending recipes. Please try again later.');
          }
          const data = await api.json();

          localStorage.setItem('trending', JSON.stringify(data.recipes));
          setTrendingRecipes(data.recipes);
        }
      } catch (err) {
        setError(err.message);
      } 
    };

    getTrending();
  }, []); 

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h3>Trending Picks</h3>
      <Grid>
        {trendingRecipes.map((recipe) => (
          <Card key={recipe.id}>
            <Link to={'/recipe/' + recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <h4>{recipe.title}</h4>
            </Link>
          </Card>
        ))}
      </Grid>
    </div>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 2rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
    font-size: 1rem;
  }
`;

export default Trending;

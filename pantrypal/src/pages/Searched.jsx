import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [error, setError] = useState(null); 
  let params = useParams();

  const getSearched = async (name) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();

      if (data.results) {
        setSearchedRecipes(data.results);
      } else {
        setSearchedRecipes([]); 
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching recipes");
    }
  };

  useEffect(() => {
    if (params.search) {
      getSearched(params.search);
    }
  }, [params.search]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Grid>
      {searchedRecipes.length > 0 ? (
        searchedRecipes.map((item) => (
          <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            </Link>
          </Card>
        ))
      ) : (
        <p>No recipes found. Try another search term!</p>
      )}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
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
    padding: 0.5rem;
  }
`;

export default Searched;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useFilters } from "../contexts/FilterContext";
import { dietOptions } from "../components/DietaryPreferences/CheckBox";

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [error, setError] = useState(null);
  let params = useParams();
  const { selectedIds } = useFilters();

  const getSearched = async (name, currentIds) => {
    try {
      const diets = [];
      const intolerances = [];

      currentIds.forEach(id => {
        const option = dietOptions.find(opt => opt._id === id);
        if (option) {
          if (option.type === 'diet') {
            diets.push(option.paramName);
          } else if (option.type === 'intolerance') {
            intolerances.push(option.paramName);
          }
        }
      });

      let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`;

      if (diets.length > 0) {
        apiUrl += `&diet=${diets.join(',')}`;
      }

      if (intolerances.length > 0) {
        apiUrl += `&intolerances=${intolerances.join(',')}`;
      }

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();
      setSearchedRecipes(data.results || []);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching recipes");
    }
  };

  useEffect(() => {
    if (params.search) {
      getSearched(params.search, selectedIds);
    }
  }, [params.search, selectedIds]);

  if (error) {
    return <div>{error}</div>
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
  grid-template-columns: repeat(3, minmax(8rem, 1fr));
  grid-gap: 2rem;
  padding-left: 9rem;
  padding-right: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for medium screens */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 column for small screens */
  }
`;


const Card = styled.div`
  overflow: hidden; /* Ensures child elements respect the parent border radius */
  border-radius: 1rem; /* Apply border-radius to the entire card */

  img {
    width: 100%;
    height: auto; /* Ensure the image maintains its aspect ratio */
    border-top-left-radius: 1rem; /* Correct CSS property */
    border-top-right-radius: 1rem; /* Correct CSS property */
  }

  a {
    text-decoration: none;
  }

  h4 {
    font-size: 1rem; /* Smaller font size for the title */
    text-align: center;
    padding: 1rem; /* Less padding for the text */
    background-color: rgb(249, 244, 233);;
    border-bottom-left-radius: 1rem; /* Correct CSS property */
    border-bottom-right-radius: 1rem; /* Correct CSS property */
  }
`;


export default Searched;

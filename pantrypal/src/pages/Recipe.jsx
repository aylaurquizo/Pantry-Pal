import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipe details");
      }

      const detailData = await response.json();
      setDetails(detailData);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const addToFavorites = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error('Unable to fetch user:', userError.message);
        return;
      }

      const userId = user.id;

      console.log("Here is the users id:", userId);

          // Log the data being added
    console.log("Adding new row to favorited_recipe:", {
      user_id: userId,
      recipe_name: details.title,
      description: details.summary,
    });

    // Insert the new row into the table
    const { error: dbError } = await supabase
      .from('favorited_recipe')
      .insert([ // Insert expects an array of rows
        {
          user_id: userId,
          recipe_name: details.title,
          description: details.summary,
        },
      ]);
      if (dbError) {
        console.error("Error adding to favorites:", dbError.message);
        return;
      }

      alert('Recipe added to favorites!');
    } catch (error) {
      console.error("Unexpected error adding to favorites:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <Container>
    <DetailWrapper>
        <div>
          <h2>
            {details.title}
          </h2>
          <img src={details.image} alt="" />
        </div>
        <Button className="addToFavorite" onClick={addToFavorites}>
          Add to Saved Recipes
        </Button>
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
            {details.extendedIngredients.map((ingredient) => <li className='ingredients-tab' key={ingredient.id}>{ingredient.original}</li>)}
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
  flex-direction: column; /* Stack items vertically on smaller screens */
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 2rem; /* Larger font size for the title */
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }
  }

  div {
    flex: 1; /* Ensure the title and image section takes up more space */
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
    max-width: 90%; /* Allow the image to use more of the available space */
    height: auto;
    border-radius: 8px;
    margin-top: 1rem;

    @media (min-width: 768px) {
      margin-top: 0;
    }
  }
`;

const Info = styled.div`
  flex: 1; /* Ensure the buttons and ingredients section also take up space */
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column; /* Stack buttons by default */
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row; /* Arrange buttons side-by-side on larger screens */
    justify-content: flex-start;
    text-align: left;
    gap: 1rem; /* Add spacing between buttons */
  }
`;

const Button = styled.button`
  padding: 1rem 1rem;
  color: rgba(109, 80, 53);
  background: white;
  border: 2px solid rgba(109, 80, 53);
  margin: 0.5rem 0; /* Spacing between buttons when stacked */
  font-size: 0.9rem;
  font-weight: 600;

  @media (min-width: 768px) {
    margin: 0; /* Remove vertical margin for side-by-side layout */
  }

  @media (max-width: 480px) {
    width: 100%; /* Make the button full-width on smaller screens */
    padding: 0.7rem; /* Slightly smaller padding for smaller screens */
    font-size: 0.9rem; /* Reduce font size slightly for small screens */
  }
`;


const Container = styled.div`
  width: 90%;
  margin: 0 auto; /* Center the entire container */
  padding: 1rem;
`;


export default Recipe;

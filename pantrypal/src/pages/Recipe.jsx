import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

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

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
        <div>
          <h2>
            {details.title}
          </h2>
          <img src={details.image} alt="" />
        </div>
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
  );
}

const DetailWrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: rgba(109, 80, 53, 0.5);
    color: white;
  }
  h2 {
    margin-top: 0.7rem;
    margin-left: 10rem;
    margin-bottom: 2rem;
    font-size: 1rem;
  }
  li {
    font-family: 'Montserrat', sans-serif;
    color: rgba(109, 80, 53);
    margin-right: 2rem;
    font-size: 0.5rem;
    line-height: 1rem;
  }
  ul {
    margin-top: 2rem;
  }
  img {
    margin-left: 10rem;
    height: 17rem;
    width: 19rem;
  }
`;

const Button = styled.button`
  padding: 1rem 1rem;
  color: rgba(109, 80, 53);
  background: white;
  border: 2px solid rgba(109, 80, 53);;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;
`

export default Recipe;

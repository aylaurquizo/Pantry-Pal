import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import {Link} from 'react-router-dom';

function Trending() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getTrending();
  }, []);

  const getTrending = async () => {

    const check = localStorage.getItem('trending');

    if(check) {
      setTrending(JSON.parse(check));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`);
      const data = await api.json();

      localStorage.setItem('trending', JSON.stringify(data.recipes));
      setTrending(data.recipes);
      console.log(data.recipes);
     };
  };

  return (
    <div>
      <h3>Trending Recipes:</h3>
      <Wrapper>
        <Splide
          options={{
            perPage: 3, 
            gap: '2rem', 
            arrows: false, 
            pagination: false, 
            drag: 'free', 
          }}
        >
          {trending.map((recipe, index) => (
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={'/recipe/' + recipe.id}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                  />
                  <p>{recipe.title}</p>
                </Link>
              </Card>
              
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 2rem 0rem;
`;

const Card = styled.div`
  height: 15rem; 
  border-radius: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column; /* Stack image and text vertically */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Optional shadow for better aesthetics */

  img {
    width: 100%;
    height: 10rem;
    object-fit: cover;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  }

  p {
    width: 100%;
    height: 5rem; 
    background-color: rgb(249, 244, 233);
    color: rgba(109, 80, 53);
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    font-family: 'Montserrat', sans-serif;
  }

  a {
    text-decoration: none; 
  }
`;





export default Trending;

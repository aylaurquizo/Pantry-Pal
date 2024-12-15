import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';

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
            perPage: 4, 
            gap: '2rem', 
            arrows: false, 
            pagination: false, 
            drag: 'free', 
          }}
        >
          {trending.map((recipe, index) => (
            <SplideSlide key={recipe.id}>
              <Card>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                />
                <p>{recipe.title}</p>
              </Card>
              
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  height: 25rem; /* Explicit height for the card */
  border-radius: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column; /* Stack image and text vertically */
  background-color: #f9f9f9; /* Optional background color for card */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Optional shadow for better aesthetics */

  img {
    width: 100%;
    height: 80%; /* Ensure it takes exactly 70% of the card height */
    object-fit: cover;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  }

  p {
    width: 100%;
    height: 20%; /* Ensure it takes exactly 30% of the card height */
    background-color: rgba(138, 123, 110); /* Semi-transparent background */
    color: white;
    text-align: center;
    font-weight: 600;
    font-size: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0; /* Remove any default margins */
    padding: 0; /* Remove any default padding */
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    font-family: 'Montserrat', sans-serif; /* Apply the font here */
  }
`;





export default Trending;

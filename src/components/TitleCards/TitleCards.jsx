import React, { useEffect, useRef } from "react";
import "./TitleCard.css";
import cards_data from "../../assets/cards/Cards_data";

const TitleCard = ({ title, category }) => {
 const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET", headers: {
      accept: "application/json",
      authorization:' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjY0ZWI2YjM4ZDYxN2Q3YjE5YzA1ZDEwZWIyM2Q0ZSIsInN1YiI6IjY0NTc3OTg4NmQ5NzQ0MDA4YjA2NjE5MyIsInNjb3BlcyI6W119.8qkX7r7vXbKxkVd8m9aFf7lqHh4nqv8e1gk6sXy3pXo',
    }
  };

 

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {

     fetch(
       "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
       options
     )
       .then((res) => res.json())
       .then((res) => setApiData(res.results))
       .catch((err) => console.error(err));
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <div className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt={card.name}
              />
              <p>{card.original_title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TitleCard;

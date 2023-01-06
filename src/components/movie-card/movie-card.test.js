import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";
import Movies from "../../mocks/movies";

it(`Render MovieCard with title "Fantastic Beasts: The Crimes of Grindelwald"`, () => {
  const card = renderer
    .create(<MovieCard
      movie={Movies[0]}
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(card).toMatchSnapshot();
});

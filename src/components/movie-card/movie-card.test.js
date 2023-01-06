import React from "react";
import renderer from "react-test-renderer";
import Movies from "../../mocks/movies";
import MovieCard from "./movie-card.jsx";

it(`Render MovieCard with title "Fantastic Beasts: The Crimes of Grindelwald"`, () => {
  const card = renderer
    .create(<MovieCard
      movie={Movies[0]}
      onHover={() => {}}
    />)
    .toJSON();

  expect(card).toMatchSnapshot();
});

import React from "react";
import renderer from "react-test-renderer";
import Movies from "../../mocks/movies";
import SmallMovieCard from "./small-movie-card.jsx";

it(`Render SmallMovieCard with title "Fantastic Beasts: The Crimes of Grindelwald"`, () => {
  const card = renderer
    .create(<SmallMovieCard
      movie={Movies[0]}
      onHover={() => {}}
    />)
    .toJSON();

  expect(card).toMatchSnapshot();
});

import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

it(`Render MovieCard with title "Fantastic Beasts: The Crimes of Grindelwald"`, () => {
  const card = renderer
    .create(<MovieCard
      movie={`Fantastic Beasts: The Crimes of Grindelwald`}
    />)
    .toJSON();

  expect(card).toMatchSnapshot();
});

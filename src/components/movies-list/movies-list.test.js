import React from "react";
import renderer from "react-test-renderer";
import movies from "../../mocks/movies";
import MoviesList from "./movies-list";

it(`Render Movies List`, () => {
  const list = renderer
    .create(<MoviesList
      movies={movies}
    />)
    .toJSON();

  expect(list).toMatchSnapshot();
});

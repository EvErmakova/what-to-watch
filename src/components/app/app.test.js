import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import Movies from "../../mocks/movies";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      movies={Movies}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

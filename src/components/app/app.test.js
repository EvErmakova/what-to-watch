import React from "react";
import renderer from "react-test-renderer";
import Movies from "../../mocks/movies";
import App from "./app.jsx";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      movies={Movies}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

import React from "react";
import renderer from "react-test-renderer";
import Catalog from "./catalog.jsx";
import Movies from "../../mocks/movies";

it(`Render Catalog with 4 cards`, () => {
  const catalog = renderer
    .create(<Catalog
      movies={Movies}
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(catalog).toMatchSnapshot();
});

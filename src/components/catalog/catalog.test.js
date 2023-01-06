import React from "react";
import renderer from "react-test-renderer";
import Catalog from "./catalog.jsx";

it(`Render Catalog with 4 cards`, () => {
  const catalog = renderer
    .create(<Catalog
      movies={[`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`]}
    />)
    .toJSON();

  expect(catalog).toMatchSnapshot();
});

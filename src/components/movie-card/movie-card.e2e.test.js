import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";
import Movies from "../../mocks/movies";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should card title be pressed`, () => {
  const cardTitleHandler = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={Movies[0]}
        onCardTitleClick={cardTitleHandler}
      />
  );

  const cardTitle = movieCard.find(`a.small-movie-card__link`);

  cardTitle.simulate(`click`);

  expect(cardTitleHandler).toBeCalled();
});

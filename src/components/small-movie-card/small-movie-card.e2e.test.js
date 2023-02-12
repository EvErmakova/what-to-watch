import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";
import Movies from "../../mocks/movies";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Get active card, when we hover on it`, () => {
  const onHover = jest.fn();

  const movieCard = shallow(
      <SmallMovieCard
        movie={Movies[0]}
        onHover={onHover}
      />
  );

  const smallMovieCard = movieCard.find(`article.small-movie-card`);
  smallMovieCard.simulate(`mouseOver`);
  expect(onHover).toHaveBeenLastCalledWith(Movies[0]);
});

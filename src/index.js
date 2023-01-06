import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import Movies from "./mocks/movies";

ReactDOM.render(
    <App
      movies={Movies}
    />,
    document.querySelector(`#root`)
);

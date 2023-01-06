import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";

ReactDOM.render(
    <App
      movies={[`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`]}
    />,
    document.querySelector(`#root`)
);

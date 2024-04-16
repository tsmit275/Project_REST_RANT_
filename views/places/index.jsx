import React from "react";
import Def from "../default";

function index(data) {
  let placesFormatted = data.places.map((place, index) => {
    return (
      <div key={index}>
        <h2>{place.name}</h2>
        <img src={place.pic} alt={place.name} />
      </div>
    );
  });
  return (
    <Def>
      <main>
        <h1>Places Index Page</h1>
        {placesFormatted}
      </main>
    </Def>
  );
}

export default index;

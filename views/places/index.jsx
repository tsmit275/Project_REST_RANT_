import React from "react"
import Def from "../default"

function index({ data }) {
  // Ensure data.places is an array before mapping
  let placesFormatted = Array.isArray(data.places)
    ? data.places.map((place, index) => (
        <div className="col-sm-6" key={index}>
          <h2>
            <a href={`/places/${index}`}>{place.name}</a>
          </h2>
          <p className="text-center">{place.cuisines}</p>
          <img src={place.pic} alt={place.name} />
          <p className="text-center">
            Located in {place.city}, {place.state}
          </p>
        </div>
      ))
    : null

  return (
    <Def>
      <main>
        <h1>Places to Rant or Rave About</h1>
        <div className="row">{placesFormatted}</div>
      </main>
    </Def>
  )
}

export default index

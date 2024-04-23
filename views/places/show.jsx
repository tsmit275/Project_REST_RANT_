import React from "react";
import Def from "../default";

function show(data) {
  const place = data.place;
  return (
    <Def>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        ></link>
      </head>

      <main>
        <h1>{place.name}</h1>
        <img
          src={place.pic}
          alt={"Place Image"}
          style={{ maxWidth: "50%", height: "30%" }}
        />
      </main>
      <div>
        <h2>Rating</h2>
        <p>Currently Unrated</p>
      </div>
      <div>
        <h2>Description</h2>
        <p>
          Located in {`${place.city}, ${place.state}`} serving {place.cuisines}
        </p>
      </div>
      <a href={`/places/${data.id}/edit`} className="btn btn-warning">
    Edit
</a>
      <form method="POST" action={`/places/${data.id}?_method=DELETE`}>
        <button type="submit" className="btn btn-danger">
          Delete
        </button>
      </form>
    </Def>
  );
}

export default show;

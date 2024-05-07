import React from "react"
import Def from "../default"

function show(data) {
    const place = data.place

    // Average rating
    let averageRating = (place.comments.reduce((tot, c) => tot + c.stars, 0) / place.comments.length).toFixed(2)
    let result = averageRating.includes(".00")
    if (result === true) {
        let reducedAvg = Number(averageRating).toFixed(0)
        averageRating = reducedAvg
    }

    return (
        <Def>
            <div className="showpage">
                <div className="photoDiv">
                    <img className="showimg" src={place.pic} />
                    <p>Located in {place.city}, {place.state} and serving {place.cuisines}</p>
                </div>
                <div className="showdata">
                    <h1>{place.name}</h1>
                    <br />
                    <h2>Rating</h2>

                    {place.comments.length > 0 ? (
                        <p>{averageRating} stars</p>
                    ) : (
                        <p>Not yet rated!</p>
                    )}

                    <br />
                    <h2>Description</h2>
                    <p>{place.showEstablished()}</p>
                    <p>Serving {place.cuisines}</p>
                    <a href={`/places/${place.id}/edit`} className="btn btn-warning">Edit</a>
                    <form method="POST" action={`/places/${place.id}?_method=DELETE`}>
                        <button type="submit" className="btn btn-danger">Delete</button>
                    </form>
                </div>
            </div>

            <div className="comments">
                <h2>Comments</h2>
                {place.comments.length > 0 ? (
                    place.comments.map((el, i) => (
                        <div key={i}>
                            <p><i>"{el.content}"</i></p>
                            <p>- {el.author}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet!</p>
                )}
            </div>
        </Def>
    );
}

export default show

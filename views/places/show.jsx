const React = require('react')
const Def = require('../default')

function show(data) {
    let comments = (
        <h3 className="inactive">
            No comments yet!
        </h3>
    )
    let rating = (
        <h3 className="inactive">
            Not yet rated
        </h3>
    )
    if (data.place.comments.length > 0) {
        let sumRatings = data.place.comments.reduce((tot, c) => {
            return tot + c.stars;
        }, 0);
        let averageRating = Math.round(sumRatings / data.place.comments.length)
        let stars = '';
        for (let i = 0; i < averageRating; i++) {
            stars += '⭐️';
        }
        rating = (
            <h3>
                {stars} stars
            </h3>
        )
        comments = data.place.comments.map(comment => (
            <div key={comment._id} className="border col-sm-4">
                <h2 className="rant">{comment.rant ? 'Rant! 😡' : 'Rave! 😻'}</h2>
                <h4>{comment.content}</h4>
                <h3>
                    <strong>- {comment.author}</strong>
                </h3>
                <h4>Rating: {comment.stars}</h4>
                <form method="POST" action={`/places/${data.place.id}/comment/${comment._id}?_method=DELETE`}>
                    <input type="submit" className="btn btn-danger" value="Delete Comment" />
                </form>
            </div>
        ))
    }
    return (
        <Def>
            <main>
                <div className="row">
                    <div className="col-sm-6">
                        <img style={{ width: 460, height: 500 }} className="pic" src={data.place.pic} alt={data.place.name} />
                        <h3>
                            Located in {data.place.city}, {data.place.state}
                        </h3>
                    </div>
                    <div className="col-sm-6">
                        <h1>{data.place.name}</h1>
                        <h2 className='Rating'>
                            Rating
                        </h2>
                        {rating}
                        <br />
                        <h2>
                            Description
                        </h2>
                        <h3>
                            {data.place.showEstablished()}
                        </h3>
                        <h4>
                            Serving {data.place.cuisines}
                        </h4>
                        <br />
                        <a href={`/places/${data.place.id}/edit`} className="btn btn-warning">
                            Edit
                        </a>{' '}
                        <form method="POST" action={`/places/${data.place.id}?_method=DELETE`}>
                            <button type="submit" className="btn btn-danger">
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
                <hr />
                <h2>Comments</h2>
                <div className="row">
                    {comments}
                </div>
                <hr />
                <h2>Got Your Own Rant or Rave?</h2>
                <form action={`/places/${data.place.id}/Comment`} method="POST">
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <label htmlFor="content">Content</label>
                            <textarea id="content" name="content" className="form-control" value={data.content}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-4">
                            <label htmlFor="author">Author</label>
                            <input id="author" name="author" className="form-control" value={data.author}/>
                        </div>
                        <div className="form-group col-sm-4">
                            <label htmlFor="stars" className="form-label">
                                Stars
                            </label>
                            <input type="range" className="form-range" min="0" max="5" step="0.5" id="stars" name="stars" value={data.stars}/>
                        </div>
                        <div className="form-group col-sm-3">
                            <input className="form-check-input" type="checkbox" id="rant" name="rant" />
                            <label className="form-check-label" htmlFor="rant">
                                Rant
                            </label>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Add Comment" />
                </form>
            </main>
        </Def>
    )
}

module.exports = show

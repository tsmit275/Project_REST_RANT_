const React = require("react")
const Def = require("./default")

function error404() {
  return (
    <Def>
      <main>
        <h1>404: PAGE NOT FOUND</h1>
        <p>Oops, sorry, we can't find this page</p>
        <div>
          <img
            src="/images/saddog.png" // Update the image path here
            alt="Sad dog wrapped in blanket"
            className="saddog-png"
          />
          <div>
            Photo by <a href="AUTHOR_LINK">Matthew Henry</a> on <a href="UNSLPASH">Unsplash</a> 
          </div>
        </div>
      </main>
    </Def>
  );
}

module.exports = error404

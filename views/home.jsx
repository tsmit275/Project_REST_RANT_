const React = require("react");
const Def = require("./default");

function home() {
  return (
    <Def>
      <main>
        <h1>REST-RANT</h1>
        <div>
          <img
            src="images/mac.png"
            alt="Colorful Macarons"
            className="mac-png"
          />
          <div>
            Photo by <a href="AUTHOR_LINK">Mockaroon</a> on <a href="UNSLPASH">Unsplash</a>
          </div>
        </div>
        <a href="/places">
          <button className="btn-primary">Places Page</button>
        </a>
      </main>
    </Def>
  );
}

module.exports = home;

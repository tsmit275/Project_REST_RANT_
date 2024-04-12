const React = require('react')

function Def (html) {
    return (
        <html>
            <head>
                <title><Title></Ttile></title>
            </head>
            <body>
                {html.children}
            </body>
        </html>
    )
}

module.exports = Def
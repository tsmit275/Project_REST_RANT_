const React = require('react')
const Def = require('../default.jsx')

function edit_form (data) {
    return (
        <Def>
          <main>
            <h1>Edit Place</h1>
            <form  method='POST' action={`/places/${data.place.id}?_method=PUT`}>
                    <div className='row'>
                        <div className='form-group col-sm-6'>
                            <label htmlFor='name' >Place Name</label>
                            <input className='form-control' id='post-name' name='name' defaultValue={data.place.name} required />
                        </div>
                        <div className='form-group col-sm-6'>
                            <label htmlFor="pic">Place Picture</label>
                            <input className='form-control' type="url" name="pic" id="post-pic" defaultValue={data.place.pic}/>
                        </div>
                        <div className='form-group col-sm-6'>
                            <label htmlFor="city">City</label>
                            <input className='form-control' name="city" id="post-city" defaultValue={data.place.city}/>
                        </div>
                        <div className='form-group col-sm-6'>
                            <label htmlFor="state">State</label>
                            <input className='form-control' id='post-state' name='state' defaultValue={data.place.state}/>
                        </div>
                        <div className='form-group col-sm-6'>
                            <label htmlFor="cuisines">Cuisines</label>
                            <input className='form-control' id='post-cuisines' name='cuisines' defaultValue={data.place.cuisines} required />
                        </div>
                        <input className='btn btn-primary' type="submit" value='Add Place' />
                    </div>
                </form>
          </main>
        </Def>
    )
}

module.exports = edit_form
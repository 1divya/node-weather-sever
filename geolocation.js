const request = require('request');
const geolocation = (place,callback)=>{
	const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`+place+`.json?
	proximity=-74.70850,40.78375
	&access_token=pk.eyJ1Ijoia3VtYXJpZGl2eWE5MDAiLCJhIjoiY2p6MWx6Y3UzMGJzNjNkbnJuMGExYzd5NCJ9.RgoPI98vBe7JRV33Zm9KyA`;
	request({url:geoUrl,json:true},(error,{body})=>{
		if(error){
			callback("Unable to get Response!",undefined);
		}else if(body.features.length === 0){
			callback("Error in request",undefined);
		}else{
			callback(undefined,{
				longitude: body.features[0].center[0],
				latitude: body.features[0].center[1],
				location: body.features[0].place_name
			});
		}
	});
}

module.exports = geolocation;
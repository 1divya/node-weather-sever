const request = require('request');

const weather = (latitude,longitude,callback)=>{
	const weatherApiUrl = `https://api.darksky.net/forecast/18d54576b8dd9cdea273df788498bb60/`+
	latitude+`,`+longitude+`?units=si`;
	request({url:weatherApiUrl,json:true},(error,{body})=>{
		if(error){
			callback("could not get weather app response",undefined);
		}else if(body.error){
			callback(body.error,undefined);
		}else{
			callback(undefined,{
				temparature: body.currently.temperature+" (In celsius)",
				summary: body.currently.summary
			})
		}
	})
}

module.exports = weather;

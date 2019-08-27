const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const gelocation = require('./geolocation.js');
const weather = require('./weather.js');

app.get('/weather',(req,res)=>{
	if(!req.query.place){
		return res.send({
			"error":"Please send a place in your request"
		});
	}
	const place = req.query.place;
	gelocation(place,(error,{latitude,longitude,location}={})=>{ // here destructuring of object 
		// and default parameter is also used as {}
		if(error){
			//console.log("Error:"+error);
			return res.send({"error":error});
		}else{
			weather(latitude,longitude,(error,data)=>{
				if(error){
					//console.log(error);
					return res.send({"error":error});
				}else{
					//console.log(data);
					res.send(data);
				}
			});
		}
	});
})

app.get('*',(req,res)=>{
	res.send({"error":"404: Page Not found"});
})

/*const place = process.argv[2];
if(place === undefined){
	console.log("Please enter location!");
}else{
	//console.log('location entered');
	gelocation(place,(error,{latitude,longitude,location})=>{
		if(error){
			console.log("Error:"+error);
		}else{
			weather(latitude,longitude,(error,data)=>{
				if(error){
					console.log(error);
				}else{
					console.log(data);
				}
			});
		}
	});
}*/
app.listen(port,()=>{console.log('app is listening on port '+port);})
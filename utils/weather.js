const request = require('request');


module.exports.getWeather = (lat,lon,callback)=>{
    const weatherURL = `http://api.weatherapi.com/v1/current.json?key=a3ba4116b06545ffa1d143406232111&q=${lat},${lon}`;

    request({url:weatherURL,json:true},(err,response)=>{
        if(err){
    
            callback("Unable to Connect to waether service",undefined);
    
        }else if(response.body.error){
                console.log(response.body.error.message,undefined);
        }else{
            const currentWeather = response.body.current.condition.text;
            const temp = response.body.current.temp_c;
            callback(undefined,{currentWeather,temperature:temp+"C"})
            
        }
    })
}
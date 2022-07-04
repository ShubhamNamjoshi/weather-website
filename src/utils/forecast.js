
const request=require('request')

const forecast=(latitude,longitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=0ce2be8385451343f769947f6c0e40dd&query='+latitude+','+longitude;

    request({url, json:true},(error,{body})=>{

        if(error){
            callback('Unable to connect to weather services!',undefined)
         }
         else if(body.error){
            callback('Unable to find locstion.Try another search.',undefined)
         }
         else{
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out.")
         }
   
    }) 


}

module.exports=forecast;
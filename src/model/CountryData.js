const request=require('request')
_EXTERNAL_URL="https://restcountries.eu/rest/v2/all"
const CountryData=(callback)=>{
    request(_EXTERNAL_URL, { json: true }, (err, res, body) => {
        if (err) { 
            return callback(err);
         }
         
        return callback(body);
        });
    }
module.exports.callApi = CountryData
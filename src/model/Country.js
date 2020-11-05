const express=require('express')
const routes=express.Router()
const apicall=require('./CountryData')
const request=require('request')
routes.get('/country/name/:country_name',(req,res)=>{
    apicall.callApi(function(response){
        //console.log(JSON.stringify(response));
        const Country= response   
        
    const results=[]
    for (var i=0 ; i < Country.length ; i++)
{
    if (Country[i].name == req.params.country_name.charAt(0).toUpperCase()+req.params.country_name.slice(1)) {
        console.log(Country[i]);
        ret={
            name: Country[i].name,
         alpha2Code: Country[i].alpha2Code,
    alpha3Code:Country[i].alpha3Code,
    capital: Country[i].capital,
    region: Country[i].region,
    population: Country[i].population,
    flag: Country[i].flag,
    totalLanguages: Country[i].languages.length,
    totalCurrencies: Country[i].currencies.length
        }
        res.status(200).send({ret});
        return
    }

}
res.status(404).send('Could not find country')
    
})})
routes.get('/country/code/:country_code',async (req,res)=>{
    //console.log(Country)
    const results=[]
    _EXTERNAL_URL="https://restcountries.eu/rest/v2/alpha/"+req.params.country_code
    const countrycode=()=>{
    request(_EXTERNAL_URL, { json: true }, (err, body) => {
        if (err) { 
            res.status(404).send('Could not find country')
            return;
         }
        //console.log(body);
        const Country=body
        console.log(Country.body)
            ret={
                name: Country.body.name,
                alpha2Code: Country.body.alpha2Code,
                alpha3Code:Country.body.alpha3Code,
                capital: Country.body.capital,
                region: Country.body.region,
                population: Country.body.population,
                flag: Country.body.flag,
                totalLanguages: Country.body.languages.length,
                totalCurrencies: Country.body.currencies.length,
                totalTimezones: Country.body.timezones.length
            }
            res.status(200).send(ret);
            return
            
    
        });
        
    }
    countrycode.call(function(response){

    })
    

    

})
routes.get('/country/search',(req,res)=>{
    console.log(req.query.searchText)
    var results =[]
     apicall.callApi(function(response){
        //console.log(JSON.stringify(response));
        const Country= response
    for (var i=0 ; i < Country.length ; i++)
{
    //console.log(Country[i].name,req.query.searchText)
    if (Country[i].name == req.query.searchText || Country[i].alpha2Code== req.query.searchText || Country[i].alpha3Code== req.query.searchText || Country[i].callingCodes==req.query.searchText||Country[i].capital==req.query.searchText) {
        console.log('IN if')
        ret={
        name: Country[i].name,
         alpha2Code: Country[i].alpha2Code,
        alpha3Code:Country[i].alpha3Code,
        capital: Country[i].capital,
        region: Country[i].region,
        population: Country[i].population,
        flag: Country[i].flag,
        totalLanguages: Country[i].languages.length,
        totalCurrencies: Country[i].currencies.length,
        totalTimezones: Country[i].timezones.length
        }
        console.log(ret)
        results.push(ret)
        break
    }

}
if(results.length >0){
res.status(200).send(results)
}
else{
    res.status(404).send('Could not find country')
}
     })

     
})
module.exports=routes

const Countries = ({countries}) => {
    if(countries.length > 10){
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if(countries.length === 1){
        const country = countries[0]
        return(
            <div>
                <h1>{country.name.common}</h1>
                <div>
                    capital: {country.capital} <br />
                    area: {country.area}
                </div>
                <div>
                    <strong>languages:</strong>
                    <ul>
                        {Object.entries(country.languages).map(([key, value]) => (
                            <li>{value}</li>
                        ))}
                    </ul>
                </div>
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
        )
    }else {
        return(
            <div>
                {countries.map(country => 
                    <div>{country.name.common}</div>)}
            </div>
        )       
    }

}

export default Countries
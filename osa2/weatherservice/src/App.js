import { useEffect, useState } from 'react';

import countryService from './services/countries'
import Finder from './components/Finder'
import Countries from './components/Contries'

const App = () => {
  const [keyword, setKeyword] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(response => {
        setAllCountries(response)
      })
  }, [])

  const handleOnChange = (event) => {
    setKeyword(event.target.value)
  }

  const countriesToShow = keyword.length > 0 ? 
  allCountries
  .filter(country => country.name.common.toLowerCase().includes(keyword.toLowerCase())) :
  []

  return(
    <div>
      find countries: <Finder keyword={keyword} handleOnChange={handleOnChange} />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App;


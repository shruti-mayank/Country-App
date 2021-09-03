import React from 'react'
import Head from 'next/head'
import CountryCards from '../comps/countrycards.js'

export default function Home({countries}) {
  const [keyword, setKeyword] = React.useState("");
    const filterCountries = countries.filter(country => 
        country.name.toLowerCase().includes(keyword)||
        country.region.toLowerCase().includes(keyword)||
        country.subregion.toLowerCase().includes(keyword));
    const onInputChange = (e) =>{
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    }
  return (
    <>
      <div className="jumbotron-fluid py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="info py-2">
                            <h1 className="pb-2">Countries</h1>
                            <form action="">
                                <input type="text" className="form-control" id="search" onChange = {onInputChange} placeholder="Search Countries"/>
                                <button className="btn" id="inputBox" type="submit"><i className="fa fa-search"></i></button>
                            </form>
                        </div>
                        <div className="mt-5" id="country">
                          <CountryCards countries={filterCountries} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();
  return {
      props: {
          countries,
      }
  }
}
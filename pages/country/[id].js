import React from 'react';
import Layout from '../../comps/Layout.js';

export const getStaticPaths = async() =>{
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = await res.json();
    const paths = countries.map(country => ({
        params: { id: country.alpha3Code },
    }));

    return{
        paths,
        fallback:false,
    }
};

export const getStaticProps = async({ params }) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.id}`);
    const data = await res.json();
    return{
        props : { country:data }
    }
}

const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
    const country = await res.json();
    return country;
}

const Details = ({ country }) => {
    
    const [borders, setBorders] = React.useState([]);

    const getBorders = async () => {
        const borders = await Promise.all(country.borders.map(border => getCountry(border)));

        setBorders(borders);
    };
    React.useEffect(() => {
        getBorders();
    }, []);
    return (
        <Layout>
            <div className="jumbotron-fluid py-4 india">
                <div className="container" id="detailPage">
                    <h1>{country.name}</h1>
                    <div className="row py-3">
                        <div className="col-md-5">
                            <img src={country.flag} className="border border-2 h-100 img-fluid img-responsive" alt={country.name} />
                        </div>
                        <div className="col-md-7">
                            <div className="px-md-5">
                                <span>Native Name: {country.nativeName}</span>
                                <span>Capital: {country.capital}</span>
                                <span>Population: {country.population}</span>
                                <span>Region: {country.region}</span>
                                <span>Sub-region: {country.subregion}</span>
                                <span>Area: {country.area}</span>
                                <span>Country code: {country.callingCodes}</span>
                                <span>Languages: {country.languages.map(({name})=>name).join(", ")}</span>
                                <span>Currencies: {country.currencies.map(({name})=>name).join(", ")}</span>
                                <span>Timezones: {country.timezones}</span>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>

            {borders.length?
                <div className="jumbotron-fluid my-5" id="neighbour">
                    <div className="container p-3">
                        <h3 className="pb-5">Neighbour Countries</h3>
                        <div className="row g-5 pb-3" id="neighbourFlag">
                            {borders.map(({flag, name, alpha3Code}) =>
                                <>
                                    <div className="col-md-3">
                                        <img src={flag} className="border border-2 img-fluid h-100 img-responsive" alt={name} />
                                    </div> 
                                </>
                            )}
                        </div>
                    </div>
                </div>:''
            }
            
        </Layout>
    );
}

export default Details;
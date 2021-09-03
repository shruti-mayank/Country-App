import Link from 'next/link'

const CountryCards = ({ countries }) => {
    return(
        <>
        {countries.map((country) =>(
            <div key={country.alpha3code} className="card mt-4 p-3"> 
                <div className="row">
                    <div className="col-sm-4">
                        <img src={country.flag} alt={country.name} className="img-fluid img-responsive h-100 w-100" />
                    </div>
                    <div className="col-sm-8">
                        <h3 className="pt-2">{country.name}</h3>
                        <p>
                            <span>Currency: {country.currencies[0].name}</span>
                            <span>Current date and time: {country.timezones}</span>
                        </p>
                        <Link href={`https://maps.google.com/?q=${country.latlng}`}><a target="_blank"><button className="btn btn-outline-primary border-2 btn1">Show Map</button></a></Link>
                        <a href={`/country/${country.alpha3Code}`}><button className="btn btn-outline-primary border-2" id="detailBtn">Detail</button></a>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}

export default CountryCards;
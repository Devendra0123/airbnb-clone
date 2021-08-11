import { useRouter } from "next/dist/client/router";
import Header from "../components/Header";
import {format} from "date-fns";
import InfoCard from "../components/InfoCard";

function Search({searchResults}) {
    const router = useRouter();
    const {location, startDate, endDate, noOfGuests} = router.query;
    const formattedStartDate = format(new Date(startDate),"dd MMM yy");
    const formattedEndDate = format(new Date(endDate),"dd MMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
            <main className="flex">
               <section className="flex-grow pt-14 px-6">
                   <p className="text-xs">
                       300+ Stays -{range}- for {noOfGuests} guests
                   </p>
                   <h1 className="text-3xl font-semibold mt-2 mb-6">
                       Stays in {location}
                   </h1>
                   <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                       <p className="button">Cancellation</p>
                       <p className="button">Type of Place</p>
                       <p className="button">Price</p>
                       <p className="button">Rooms and Beds</p>
                       <p className="button">More filters</p>
                   </div>
                   <div className="flex flex-col">
                   {searchResults?.map(item =>(
                       <InfoCard 
                           key={item.img}
                           img={item.img}
                           title={item.title}
                           description={item.description}
                           location={item.location}
                           price={item.price}
                           total={item.total}
                           star={item.star}
                       />
                   ))}
                   </div>
                  
               </section>
            </main>
        </div>
    )
}

export default Search;

export async function getServerSideProps(){
    const searchResults = await fetch("https://links.papareact.com/isz")
                            .then((res) => res.json());
    return {
        props:{
            searchResults,
        }
    }                        
}

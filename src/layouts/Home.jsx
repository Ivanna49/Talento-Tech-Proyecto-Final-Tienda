import Main from "../components/Main";
import InformacionSection from "../components/InformacionSection";
import SubscribeSection from "../components/SubscribeSection";
import PromoBar from '../components/PromoBar';


function Home() {

    return(
        <div>
             <PromoBar/>
             <Main/>
             <InformacionSection/>
             <SubscribeSection/>
           
        </div>
    )
}

export default Home
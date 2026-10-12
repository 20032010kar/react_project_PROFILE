import { useLocation, useParams, useSearchParams } from "react-router-dom";

type UserParams = {
    id: string;
}

const ProfilePage = ()=>{
    const {id} = useParams<UserParams>();

    const location = useLocation();

    const state = location.state;
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(state);
    if(searchParams.size !==0){
        let listItems: string[]=[];
        searchParams.forEach((v,k)=>{
            listItems.push(`<li> ${k}->${v}</li>`);
        })

        // setSearchParams({query:'Hello'});
        return <ul dangerouslySetInnerHTML={{__html: listItems}}/>
            
    }

    if(id){
        return <h1>Profile#-{id}</h1>
    }

    return(
        <div>
        <h1>ProfilePage</h1>
        <p>Path: {location.pathname}</p>
        <p>State: {state.toString()}</p>
        </div>
    )
}
export default ProfilePage;
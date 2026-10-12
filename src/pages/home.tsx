import { useNavigate, Link } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleButton = ()=>{
        // navigate('/profile');
        // navigate('/profile', {replace: true});
        navigate('/profile', {state:{fromLogin:true}});
    }
    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleButton}>Next page</button>

            <h1 className="text-4xl font-bold">Site map</h1>
            <hr className="border-2 border-blue-500"/>
            <ul className="text-blue-600 text-2xl underline">
                <li><Link className="hover:text-blue-800" to="/class-page">Class component</Link></li>
                <li><Link className="hover:text-blue-800" to="/props">Props and child component</Link></li>
                <li><Link className="hover:text-blue-800" to="/use-effect">Use effect</Link></li>
                <li><Link className="hover:text-blue-800" to="/use-ref">Use Ref</Link></li>
                <li><Link className="hover:text-blue-800" to="/smart-dumb">Smart/Dumb component</Link></li>
                <li><Link className="hover:text-blue-800" to="/zod-page">Zod intro</Link></li>
                <li><Link className="hover:text-blue-800" to="/hook-form">React hook form</Link></li>
                <li><Link className="hover:text-blue-800" to="/zod-form">React hook form + Zod</Link></li>
                <li><Link className="hover:text-blue-800" to="/user-page">Using fetch in React</Link></li>
                <li><Link className="hover:text-blue-800" to="/tanstack-query">Using tanstack query(React Query)</Link></li>
                <li><Link className="hover:text-blue-800" to="/profile-page">Profile Page</Link></li>

            </ul>
        </div>

    )
}
export default HomePage;
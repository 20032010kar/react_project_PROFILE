import { useEffect, useState } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    username: string;
}

const UserPage = () => {
    // [GET USER]
    const [user, setUser] = useState<UserData>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();

    // [GET SEARCH QUERY]
    const [query,setQuery] = useState<string>('');
    const [results, setResults] = useState<UserData[]>([]);

    useEffect(() => {
        setIsLoading(true);
        setError(undefined);
        const controller = new AbortController();
        // fetch
        const getUserData = async () => {
            const result = await fetch('https://dummyjson.com/users/1');
            if (result.ok) {
                const data = await result.json();
                setUser(data);
                setIsLoading(false);
                return;
            }
            setError(`${result.status} Error while get data`);
        }
        // axios
        const getUserDataAxios = async ()=>{
            try {
                const response = await axios.get('https://dummyjson.com/users/1',
                    {
                        signal: controller.signal
                    }
                )
                setUser(response.data)
            } catch (error) {
                if(!axios.isCancel(error)){
                    setError(`Error while get data: ${error}`);
                }
            }finally{
                setIsLoading(false);
            }
        }
        getUserDataAxios();
        // getUserData();
        return()=>{
            controller.abort();
        }
    }, [])

    useEffect(()=>{
        if(!query.trim()){
            setResults([]);
            return;
        }
        const timer = setTimeout(async()=>{
            try {
                const response = await axios.get(`https://dummyjson.com/users/search?q=${query}`);
                console.log(response.data?.users)
                setResults(response.data?.users);
            } catch (error) {
                console.error(error);
            }
        },300)

        return () => clearTimeout(timer)
    },[query])

    /**додайте форму для завантаження користувача
     * https://dummyjson.com/users/add'
     * Як має виглядати форма:
     * firstName: 'Muhammad',
    lastName: 'Ovi',
    age: 250, +ви можете додавати свої поля
    у якості результату на сторінці вивести об'єкт який приходить у респонс
     */

    return (
        <div>
            <div className="flex flex-row gap-2">
                <input className="border-3 
                border-solid 
                border-[#00799edd] 
                rounded 
                text-2xl 
                focus:border-[#025c77dd]
                focus:outline-none
                p-2
                " type="text"
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                placeholder="search"  />
                {/* <button className="\
                bg-[#00799edd] 
                p-2
                text-2xl
                text-white
                uppercase
                rounded
                border-3 
                border-solid 
                border-[#00799edd]
                hover:border-[#025c77dd]
                active:bg-[#025c77dd]
                ">Пошук</button> */}
            </div>
            <div>
                <ul>
                    {results.map(user=>(
                        <li key={user.id}>{user.username}</li>
                    ))}
                </ul>
            </div>
            {isLoading &&
                <div>
                    <h1>Data loading</h1>
                    {error && <p className="text-red-900">{error}</p>}
                </div>}

            {user &&
                <div>
                    <h1 className="font-bold text-2xl">Id: {user.id}</h1>
                    <h1 className="font-bold text-2xl">First name: {user.firstName}</h1>
                    <h1 className="font-bold text-2xl">Last name: {user.lastName}</h1>
                    <h1 className="font-bold text-2xl">Age: {user.age}</h1>
                    <h1 className="font-bold text-2xl">Username: {user.username}</h1>
                </div>}
        </div>
    )
}

export default UserPage;
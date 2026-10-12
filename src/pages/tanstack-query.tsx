import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";  
import axios from "axios";

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    username: string;
}

const TanStackQueryPage = ()=>{

    const fetchUsers = async ()=>{
        const response = await axios.get('https://dummyjson.com/users/');
        return response.data?.users;
    }

    const {data:users, isLoading, isError, error} = useQuery<UserData[], Error>({
        queryKey: ['users'],
        queryFn: fetchUsers
    })
    if(isLoading) return <div>Data is loading</div>
    if(isError) return <div>Error: {error.message}</div>
    return(
        <div>
            <ul>
                {users?.map(user=>(
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    )
}

export default TanStackQueryPage;
import api from "./dummy-json-instance.js";

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    username: string;
}

export class UserService{
    static getUsers = async(signal:AbortSignal):Promise<User[]>=>{
        const response = await api.get('/users', {signal});
        return response.data?.users;
    }
    static getUserById = async(id:number, signal:AbortSignal):Promise<User>=>{
        const response = await api.get(`/users/${id}`, {signal});
        return response.data;
    }
}
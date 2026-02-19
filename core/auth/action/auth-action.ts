import { spotifyApi } from "../api/spotifyApi";
import { User } from "../interface/user";



const returnUserToken = (user: User) => {
    
    return { user, token: JSON.stringify(user) };
};

export const authLogin = async (email: string, password: string) => {

    email = email.toLowerCase().trim();

    try {
        const { data } = await spotifyApi.post<User>('/login', { email, password });

        return returnUserToken(data);
    } catch (error) {
        console.log(error);

        return null;
    }
};

export const authCheckStatus = async (user: User) => {
    try {
        const { data } = await spotifyApi.get<User>(`/usuario/${user.id}`);

        return returnUserToken(data);
    } catch (error) {
        console.log(error);

        return null;
    }
};
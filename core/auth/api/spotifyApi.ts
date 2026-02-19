import axios from 'axios';


const spotifyApi = axios.create({
    baseURL: 'localhost:8082',
});


export { spotifyApi };

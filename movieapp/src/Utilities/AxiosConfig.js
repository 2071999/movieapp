import axios from 'axios';

export const apikey= '69973391f234c283bedaaaacc4027c83';
export const baseImg= 'http://image.tmdb.org/t/p/w500';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 3000,
});

export default instance;
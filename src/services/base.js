var BASE_URL = 'http://localhost:5000';

if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'https://api-preparecenter.azurewebsites.net';
}

export default BASE_URL;
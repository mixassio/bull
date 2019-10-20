const axios = require('axios');
const app = require('./app');
const hooks = require('./hooks-example');

const port = 3000;
app().listen(port, () => {
    console.log(`Server was started on '${port}'`);
});


const rpc = axios.create({
    baseURL: 'http://0.0.0.0:3000',
    proxy: false
})

hooks.forEach(hook => rpc.post('/', hook)
    .then(function(response) {
        console.log('response--->>', response.statusText);
    })
    .catch(function(error) {
        console.log('error--->>', error);
    }))
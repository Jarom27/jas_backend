const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'JAS Obregon Mex',
        description: 'This website is for recording attendance in activities of single young adults'
    },
    host: 'localhost:3001',
    definitions: {
        addPerson: {
            $firstname: '',
            $lastname: '',
            $isMember: 'n',
            $stake: 'none',
            $ward: 'none'
        }
    }
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
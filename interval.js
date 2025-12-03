const dotenv = require('dotenv');
dotenv.config('.env');
const startFetching = require('./ocmain').startFetching;
const getDateParts = require('./utils/date').getDateParts;

    startFetching();

setInterval(() => {
    const time = getDateParts().time;
    if (time < '10:00:00' || time > '15:30:00') {
        console.log('Outside trading hours:', time);
        return;
    }
    console.log("Fetched for time:", time);
    startFetching();
    
}, 3 * 60 * 1000); // 3 minutes interval
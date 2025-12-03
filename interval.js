const startFetching = require('./ocmain').startFetching;
const getDateParts = require('./utils/date').getDateParts;

setInterval(() => {
    const time = getDateParts().time;
    if (time < '10:00:00' || time > '15:30:00') {
        console.log('Outside trading hours:', time);
        return;
    }
    console.log("Fetched");
    startFetching();
}, 3 * 10 * 1000); // 3 minutes interval
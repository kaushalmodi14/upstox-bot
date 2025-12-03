const cron = require("node-cron");

// Helper to wrap your logic
async function runJob(func) {
    try {
        await func();
        console.log("Job executed at:", new Date().toLocaleString());
    } catch (err) {
        console.error("Job failed:", err);
    }
}

/*
 Runs every 5 minutes from 10:00 → 14:59
 Cron exp: 5 10-14 * * *
*/
cron.schedule("*/5 10-14 * * *", () => {
    runJob();
});

/*
 Runs exactly at:
 15:00, 15:05, 15:10, 15:15, 15:20, 15:25, 15:30, 15:35, 15:40
 Cron exp: 0,5,10,15,20,25,30,35,40 15 * * *
*/
cron.schedule("0,5,10,15,20,25,30,35,40 15 * * *", () => {
    runJob();
});

console.log("Scheduler started...");

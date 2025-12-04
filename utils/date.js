export const getDateParts = (timezone = "Asia/Kolkata", time) => {
    const now = new Date(
       (time ? new Date(time) : new Date()).toLocaleString("en-US", { timeZone: timezone })
    );

    return {
        time: now.toTimeString().split(" ")[0],     // HH:MM:SS
        day: now.getDate(),                         // 1–31
        month: now.getMonth() + 1,                  // 1–12
        year: now.getFullYear(),                     // yyyy
        dateString: now.toISOString().split('T')[0] // YYYY-MM-DD
    };
}

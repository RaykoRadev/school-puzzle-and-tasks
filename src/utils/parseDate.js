export default function parseDate(initDate) {
    // Extract components in UTC (use getHours/getMinutes for local time)
    const hours = String(initDate.getUTCHours()).padStart(2, "0");
    const minutes = String(initDate.getUTCMinutes()).padStart(2, "0");
    const day = String(initDate.getUTCDate()).padStart(2, "0");
    const month = String(initDate.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = initDate.getUTCFullYear();

    // Format as "HH:MM DD-MM-YYYY"
    const formatted = `${hours}:${minutes} ${day}-${month}-${year}`;
    return formatted;
}

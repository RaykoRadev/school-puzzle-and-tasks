export default function parseDate(initDates) {
    let workingArr = initDates;
    if (workingArr.length === 0) {
        return ["There is no logs"];
    } else if (workingArr.length > 10) {
        workingArr = workingArr.slice(0, 10);
    }
    return workingArr.map((s) => {
        const date = new Date(s.loginAt);

        if (isNaN(date.getTime())) {
            return "There is no logs";
        }

        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const year = date.getUTCFullYear();

        return `${hours}:${minutes} ${day}-${month}-${year}`;
    });
}

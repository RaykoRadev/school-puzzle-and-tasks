import i18n from "../i18n";

export default function parseDate(initDates) {
    if (typeof initDates == "string") {
        return parseSingleDate(initDates);
    }

    let workingArr = initDates;
    if (workingArr.length === 0) {
        return [i18n.t("noLogs")];
    } else if (workingArr.length > 10) {
        workingArr = workingArr.slice(0, 10);
    }
    return workingArr.map((s) => {
        const date = new Date(s.loginAt);

        if (isNaN(date.getTime())) {
            return i18n.t("noLogs");
        }

        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const year = date.getUTCFullYear();

        return `${hours}:${minutes} ${day}-${month}-${year}`;
    });
}

function parseSingleDate(oldDate) {
    const date = new Date(oldDate);

    if (isNaN(date.getTime())) {
        return i18n.t("noLogs");
    }

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
}

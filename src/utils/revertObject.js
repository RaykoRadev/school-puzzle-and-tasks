export default function revertObject(orgObj) {
    const idToName = Object.create(null);

    for (const [name, id] of Object.entries(orgObj)) {
        idToName[id] = name;
    }
    return idToName;
}

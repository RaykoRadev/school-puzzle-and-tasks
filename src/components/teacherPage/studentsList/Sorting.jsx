export default function Sorting({ data, sortedData }) {
    const filters = {
        category: "",
        sorting: "",
    };

    //showing the selected filter for sorting
    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        filters[name] = value;
    };

    const sortHandler = (e) => {
        const category = filters.category;
        const sorting = filters.sorting;

        let sort = 1;
        if (sorting === "descending") {
            sort = -1;
        }

        const sorted = data.slice().sort((a, b) => {
            if (category === "sessions") {
                const valA = a?.sessions?.[0] ?? "";
                const valB = b?.sessions?.[0] ?? "";
                return String(valA).localeCompare(String(valB)) * sort;
            }
            return a[category].localeCompare(b[category]) * sort;
        });

        sortedData(sorted);
    };

    return (
        <div className="flex justify-center ">
            <div className="grid grid-cols-1 grid-cols-3 gap-4">
                {/* <div className="absolute top-20 left-200 grid grid-cols-1 sm:grid-cols-3 gap-4"> */}
                {/* Selecting Category Filter */}

                <select
                    id="category"
                    name="category"
                    onChange={handleFilterChange}
                    className="bg-orange-200 mt-1 block w-22 md:w-25 text-center py-2 text-base border focus:outline-none focus:ring--green-700  sm:text-sm rounded-md"
                >
                    <option value="">Category:</option>
                    <option value="username">Name</option>
                    <option value="sessions">Last loged</option>
                    <option value="createdAt">Created at</option>
                    <option value="expiredAt">Expired at</option>
                </select>

                <select
                    id="sorting"
                    name="sorting"
                    onChange={handleFilterChange}
                    className="bg-orange-200 mt-1 block  w-22 md:w-25  text-center py-2 text-base border focus:outline-none focus:ring--green-700  sm:text-sm rounded-md"
                >
                    <option value="">Sort by:</option>
                    <option value="ascending">Ascendig</option>
                    <option value="descending">Descending</option>
                </select>

                <button
                    type="button"
                    // className="bg-gradient-to-br from-green-600 to-emerald-400 font-medium text-white shadow-md transition hover:scale-[1.03]"
                    className="mt-1 block w-22 md:w-25 text-base text-center text-sm rounded-lg text-white font-medium bg-gradient-to-br from-green-600 to-emerald-400 hover:scale-[1.03]"
                    // className="mt-1 block w-full py-2 text-base border border-green-700 text-center focus:outline--green-700 focus:ring--green-700 focus:border--green-700 sm:text-sm rounded-md hover:bg-green-700 hover:text-white"
                    onClick={sortHandler}
                >
                    Sort
                </button>
            </div>
        </div>
    );
}

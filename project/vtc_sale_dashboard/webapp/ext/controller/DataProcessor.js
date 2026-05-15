sap.ui.define([], function () {
    "use strict";

    return {
        /**
         * Fill missing months with 0 revenue
         */
        fillMissingMonths: function (data) {
            if (!Array.isArray(data) || data.length === 0) {
                return data;
            }

            // If the data does not contain CalendarMonth or CalendarYear, 
            // it is a KPI aggregation request (header). Return it unchanged.
            if (data[0].CalendarMonth == null || data[0].CalendarYear == null) {
                return data;
            }

            const dataMap = new Map();
            const years = new Set();
            let sampleRecord = null;

            data.forEach(item => {
                const year = String(item.CalendarYear);
                const month = String(item.CalendarMonth).padStart(2, '0');
                years.add(year);

                if (!sampleRecord) {
                    sampleRecord = item;
                }

                const key = `${year}-${month}`;
                if (!dataMap.has(key)) {
                    dataMap.set(key, []);
                }
                dataMap.get(key).push(item);
            });

            const result = [];
            const monthsArray = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
            const sortedYears = Array.from(years).sort();

            sortedYears.forEach(year => {
                monthsArray.forEach(month => {
                    const key = `${year}-${month}`;
                    if (dataMap.has(key)) {
                        result.push(...dataMap.get(key));
                    } else {
                        // Deep copy to avoid sharing __metadata object reference
                        const zeroEntry = JSON.parse(JSON.stringify(sampleRecord));
                        
                        // Update properties
                        zeroEntry.ID = `${year}-${month}-ZERO`;
                        zeroEntry.CalendarYear = year;
                        zeroEntry.CalendarMonth = month;
                        zeroEntry.Revenue = "0";
                        
                        // Update OData metadata URI to be unique so it doesn't overwrite cache
                        if (zeroEntry.__metadata && zeroEntry.__metadata.uri) {
                            zeroEntry.__metadata.uri = zeroEntry.__metadata.uri + `-ZERO-${year}-${month}`;
                        }
                        
                        result.push(zeroEntry);
                    }
                });
            });

            return result;
        }
    };
});


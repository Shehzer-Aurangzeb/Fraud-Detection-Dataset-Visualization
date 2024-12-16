import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export function formatDateRange(dateRange: DateRange|undefined): string {
    if(!dateRange|| !dateRange.from || !dateRange.to) return ""
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);

    const fromMonth = format(fromDate, "MMMM"); // Full month name
    const fromYear = format(fromDate, "yyyy");  // Year in 4 digits
    const toMonth = format(toDate, "MMMM");
    const toYear = format(toDate, "yyyy");

    // Check if both dates are in the same year
    return fromYear === toYear
        ? `${fromMonth} - ${toMonth} ${fromYear}`
        : `${fromMonth} ${fromYear} - ${toMonth} ${toYear}`;
}

export const CHART_COLORS = ['#F18C60', '#269A84', '#174B63', '#D9C954', '#F1B55E'];
 
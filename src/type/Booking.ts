import { IStudio } from "./Studios";

/**
 * A stored booking. The backend stores the booking form payload as-is,
 * which spreads the whole studio doc into it — so a booking carries all
 * studio fields (flattened) plus its own booking fields.
 */
export interface IBooking extends IStudio {
    userName: string;
    userEmail: string;
    userImage?: string;
    /** Date chosen on the booking form, e.g. "2026-11-10" */
    bookingDate: string;
    /** Start time from the booking form, e.g. "14:30" */
    bookingTime: string;
    /** Duration in hours from the booking form */
    bookingHour: string | number;
    /** ISO timestamp of when the booking was created */
    userBookingDate: string;
}

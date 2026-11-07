"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    CalendarDays,
    CalendarX2,
    Clock,
    Hourglass,
    MapPin,
    Star,
} from "lucide-react";
import { IBooking } from "@/type/Booking";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";


const MyBookings = ({ ownerEmail }: { ownerEmail: string }) => {
    const [bookings, setBookings] = useState<IBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancellingId, setCancellingId] = useState<string | null>(null);

    useEffect(() => {
        if (!ownerEmail) return;

        const fetchBookings = async () => {
            try {
                setLoading(true);
                setError("");

                const token = await getTokenFromClient();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/booking/${encodeURIComponent(ownerEmail)}`, {
                    headers: {
                        authorization: `Bearar ${token}`
                    }
                }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch bookings");
                }

                const data: IBooking[] = await res.json();

                setBookings(data);
            } catch (error) {
                console.error(error);
                setError("Failed to load your bookings.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [ownerEmail]);

    if (!ownerEmail) {
        return (
            <div className="py-12 text-center text-muted-foreground">
                Sign in to see your bookings.
            </div>
        );
    }

    if (loading) {
        return (
            <div className="py-12 text-center text-muted-foreground">
                Loading your bookings...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-12 text-center text-red-500">
                {error}
            </div>
        );
    }

    const handleCancel = async (booking: IBooking) => {
        try {
            setCancellingId(booking._id);

            const token = await getTokenFromClient();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/booking/${booking._id}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearar ${token}`
                    }
                }
            );

            if (!res.ok) {
                toast.add({
                    type: "error",
                    title: "Couldn't cancel the booking",
                    description: "Something went wrong. Please try again.",
                });
                return;
            }

            toast.add({
                type: "success",
                title: "Booking cancelled",
                description: `Your booking for ${booking.title} has been cancelled.`,
            });
            setBookings((prev) => prev.filter((item) => item._id !== booking._id));
        } catch {
            toast.add({
                type: "error",
                title: "Couldn't cancel the booking",
                description: "Could not reach the server. Please try again.",
            });
        } finally {
            setCancellingId(null);
        }
    };

    return (
        <div className="space-y-6">
            {bookings.length > 0 ? (
                <div className="grid gap-4">
                    {bookings.map((booking) => {
                        const bookingDate = new Date(booking.bookingDate);
                        const formattedDate = Number.isNaN(bookingDate.getTime())
                            ? booking.bookingDate
                            : bookingDate.toLocaleDateString("en-US", {
                                timeZone: "UTC",
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            });

                        return (
                            <div
                                key={booking._id}
                                className="bg-card border-border group flex flex-col overflow-hidden rounded-3xl border sm:flex-row"
                            >
                                {/* Image */}
                                <div className="border-border relative aspect-video overflow-hidden border-b sm:aspect-auto sm:w-56 sm:shrink-0 sm:border-b-0 sm:border-r">
                                    {/* eslint-disable-next-line @next/next/no-img-element -- studio images are owner-provided and may not be whitelisted hosts */}
                                    <img
                                        src={booking.imageUrl}
                                        alt={booking.title}
                                        className="size-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex min-w-0 flex-1 flex-col p-5">
                                    <div>
                                        <Link
                                            href={`/studios/${booking._id}`}
                                            className="hover:text-primary text-lg font-semibold transition-colors"
                                        >
                                            {booking.title}
                                        </Link>
                                        <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                                            <MapPin className="size-4 shrink-0" />
                                            {booking.location}
                                        </p>
                                    </div>

                                    {/* Studio snapshot */}
                                    <div className="mt-4 flex items-center gap-4">
                                        <p className="text-primary text-xl font-bold">
                                            ${booking.hourlyRate}
                                            <span className="text-muted-foreground text-sm font-normal">
                                                /hr
                                            </span>
                                        </p>
                                        <p className="text-muted-foreground flex items-center gap-1 text-xs">
                                            <Star className="fill-amber-400 stroke-amber-400 size-3.5" />
                                            {booking.rating} ({booking.reviews})
                                        </p>
                                    </div>

                                    {/* Booked session */}
                                    <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                                        <p className="flex items-center gap-1.5">
                                            <CalendarDays className="size-4 shrink-0" />
                                            {formattedDate}
                                        </p>
                                        <p className="flex items-center gap-1.5">
                                            <Clock className="size-4 shrink-0" />
                                            {booking.bookingTime}
                                        </p>
                                        <p className="flex items-center gap-1.5">
                                            <Hourglass className="size-4 shrink-0" />
                                            {booking.bookingHour} hr
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="border-border mt-5 flex flex-wrap items-center gap-2 border-t pt-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            nativeButton={false}
                                            render={<Link href={`/studios/${booking._id}`} />}
                                        >
                                            View Details
                                        </Button>

                                        <Button
                                            size="sm"
                                            disabled={cancellingId === booking._id}
                                            onClick={() => handleCancel(booking)}
                                        >
                                            <CalendarX2 className="size-4" />
                                            {cancellingId === booking._id
                                                ? "Cancelling..."
                                                : "Cancel Booking"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center py-12 text-center">
                    <Hourglass className="size-10 text-muted-foreground" />

                    <h4 className="mt-3 font-semibold">
                        No bookings yet
                    </h4>

                    <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Browse the studios and book by the hour — your
                        reservations will show up here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyBookings;

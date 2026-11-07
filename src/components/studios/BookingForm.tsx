"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { IStudio } from "@/type/Studios";
import { useSession } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const BookingForm = ({ studio }: { studio: IStudio }) => {
    const { data: session } = useSession();
    const user = session?.user;
    const [hours, setHours] = useState(1);


    const subtotal = studio.hourlyRate * hours;
    const total = subtotal + studio.securityDeposit;

    const today = new Date().toISOString().split("T")[0];

    const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const booking = Object.fromEntries(formData.entries());

        if (!user) {
            toast.add({
                title: "warning",
                description: "Need to login before booking!"
            })
        }

        const data = {
            userName: user?.name,
            userEmail: user?.email,
            userImage: user?.image,
            ...booking,
            ...studio,
            userBookingDate: new Date(),
        }

        const token = await getTokenFromClient();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearar ${token}`
            },
            body: JSON.stringify(data)
        })
        const result = await res.json();
        console.log(result, "res data")

        if (result.insertedId) {
            toast.add({
                title: "success",
                description: "successfully booked"
            })
        }
    }

    return (
        <form onSubmit={handleBooking}>
            <div className="border-border bg-card rounded-3xl border p-6">
                <p className="text-primary text-3xl font-bold">
                    ${studio.hourlyRate}
                    <span className="text-muted-foreground text-base font-normal">
                        /hour
                    </span>
                </p>

                <div className="mt-5 grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="booking-date">Date</Label>
                        <Input
                            id="booking-date"
                            type="date"
                            min={today}
                            name="bookingDate"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-2">
                            <Label htmlFor="booking-time">Start time</Label>
                            <Input
                                id="booking-time"
                                type="time"
                                name="bookingTime"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="booking-hours">Duration (hr)</Label>
                            <Input
                                id="booking-hours"
                                type="number"
                                min="1"
                                max={12}
                                value={hours}
                                onChange={(e) => setHours(Number(e.target.value))}
                                name="bookingHour"
                            />
                        </div>
                    </div>
                </div>

                {/* Price breakdown */}
                <div className="border-border text-muted-foreground mt-5 space-y-2 border-t pt-4 text-sm">
                    <p className="flex items-center justify-between">
                        <span>${studio.hourlyRate}/hr &times; {hours} hr</span>
                        <span className="text-foreground font-medium">${subtotal}</span>
                    </p>
                    <p className="flex items-center justify-between">
                        <span>Security deposit</span>
                        <span className="text-foreground font-medium">
                            ${studio.securityDeposit}
                        </span>
                    </p>
                    <p className="text-foreground text-base flex items-center justify-between font-semibold">
                        <span>Total</span>
                        <span>${total}</span>
                    </p>
                </div>

                <Button type="submit" className="mt-5 w-full cursor-pointer">Book Now</Button>
                <p className="text-muted-foreground mt-3 text-center text-xs">
                    We&apos;ll confirm instantly — nothing is charged until you&apos;re ready.
                </p>
            </div>
        </form>
    );
};

export default BookingForm;

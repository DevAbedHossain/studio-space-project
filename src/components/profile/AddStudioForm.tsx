"use client";

import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "../ui/toast";
import { redirect } from "next/navigation";
import React from "react";
import { useSession } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const AddStudioForm = () => {

    type StudioFormValues = {
        title: string;
        category: string;
        hourlyRate: number;
        securityDeposit: number;
        maxCapacity: number;
        location: string;
        imageUrl: string;
        amenities: string[];
        overview: string;
        rating: number;
        reviews: number;
        gallery: string[];
    };

    const { data: session } = useSession();
    const user = session?.user;

    const handleAddStudio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const rawStudio = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;

        const addStudio: StudioFormValues = {
            title: String(rawStudio.title ?? ""),
            category: String(rawStudio.category ?? ""),
            hourlyRate: Number(rawStudio.hourlyRate ?? 0),
            securityDeposit: Number(rawStudio.securityDeposit ?? 0),
            maxCapacity: Number(rawStudio.maxCapacity ?? 0),
            location: String(rawStudio.location ?? ""),
            imageUrl: String(rawStudio.imageUrl ?? ""),
            amenities: String(rawStudio.amenities ?? "")
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            overview: String(rawStudio.overview ?? ""),
            rating: Number(rawStudio.rating ?? 0),
            reviews: Number(rawStudio.reviews ?? 0),
            gallery: String(rawStudio.gallery ?? "")
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
        };

        const token = await getTokenFromClient();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearar ${token}`
            },
            body: JSON.stringify({
                ...addStudio,
                ownerEmail: user?.email,
                ownerName: user?.name,
            }),
        });

        const result = await res.json();

        console.log(result, "form submit data");

        if (result.insertedId) {
            toast.add({
                title: "success",
                description: "Successfully added your studio"
            })
            redirect("/studios")
        }
    }

    return (
        <form onSubmit={handleAddStudio}>
            <Card>
                <CardContent className="space-y-6">
                    {/* Basic information */}
                    <div className="space-y-4">

                        <div className="grid gap-2">
                            <Label htmlFor="studio-title">Title</Label>
                            <Input
                                type="text"
                                id="studio-title"
                                name="title"
                                required
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="studio-category">Category</Label>
                                <Input
                                    type="text"
                                    id="studio-category"
                                    name="category"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="studio-location">Location</Label>
                                <Input
                                    type="text"
                                    id="studio-location"
                                    name="location"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Images & amenities */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="studio-imageUrl">Image URL</Label>
                            <Input
                                type="text"
                                id="studio-imageUrl"
                                name="imageUrl"
                                placeholder="https://images.unsplash.com/..."
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="studio-gallery">Gallery URLs</Label>
                            <Input
                                type="text"
                                id="studio-gallery"
                                name="gallery"
                                placeholder="https://..., https://..."
                                required
                            />
                            <p className="text-muted-foreground text-xs">
                                Separate multiple gallery images with commas.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="studio-amenities">Amenities</Label>
                            <Input
                                type="text"
                                id="studio-amenities"
                                name="amenities"
                                placeholder="Professional Microphones, Soundproof Room, Headphones..."
                                required
                            />
                            <p className="text-muted-foreground text-xs">
                                Separate multiple amenities with commas.
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Pricing & engagement */}
                    <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="grid gap-2">
                                <Label htmlFor="studio-hourlyRate">Hourly Rate</Label>
                                <Input
                                    type="number"
                                    id="studio-hourlyRate"
                                    name="hourlyRate"
                                    min={0}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="studio-securityDeposit">
                                    Security Deposit
                                </Label>
                                <Input
                                    type="number"
                                    id="studio-securityDeposit"
                                    name="securityDeposit"
                                    min={0}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="studio-maxCapacity">Max Capacity</Label>
                                <Input
                                    type="number"
                                    id="studio-maxCapacity"
                                    name="maxCapacity"
                                    min={1}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="studio-rating">Rating</Label>
                                <Input
                                    type="number"
                                    id="studio-rating"
                                    name="rating"
                                    min={0}
                                    max={5}
                                    step="0.1"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="studio-reviews">Reviews</Label>
                                <Input
                                    type="number"
                                    id="studio-reviews"
                                    name="reviews"
                                    min={0}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Owner (locked, edit mode only) */}
                    {/* <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="studio-ownerName">
                                    Owner Name
                                </Label>
                                <Input
                                    type="text"
                                    id="studio-ownerName"
                                    name="ownerName"
                                    defaultValue={user?.name}
                                    disabled
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="studio-ownerEmail">
                                    Owner Email
                                </Label>
                                <Input
                                    type="text"
                                    id="studio-ownerEmail"
                                    name="ownerEmail"
                                    defaultValue={user?.email}
                                    disabled
                                />
                            </div>

                            <p className="text-muted-foreground text-xs sm:col-span-2">
                                The owner&apos;s name and email can&apos;t
                                be changed from here.
                            </p>
                        </div>
                    </div> */}

                    <Separator />

                    {/* Overview */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="studio-overview">Overview</Label>
                            <Textarea
                                rows={5}
                                id="studio-overview"
                                name="overview"
                            />
                        </div>
                    </div>

                </CardContent>

                <CardFooter className="justify-end">
                    <Button type="submit" className="cursor-pointer">Add Studio</Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default AddStudioForm;
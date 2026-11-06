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
import { IStudio } from "@/type/Studios";
import { toast } from "../ui/toast";
import { redirect } from "next/navigation";

export interface StudioFormData {
    title: string;
    category: string;
    location: string;
    imageUrl: string;
    gallery: string[];
    amenities: string[];
    rating: number;
    reviews: number;
    hourlyRate: number;
    securityDeposit: number;
    maxCapacity: number;
    overview: string;
}

const StudioForm = ({ studio }: { studio: IStudio }) => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const entries: StudioFormData = {
            title: String(formData.get("title") ?? ""),
            category: String(formData.get("category") ?? ""),
            location: String(formData.get("location") ?? ""),
            imageUrl: String(formData.get("imageUrl") ?? ""),
            gallery: String(formData.get("gallery") ?? "")
                .split(",")
                .map((url) => url.trim())
                .filter(Boolean),
            amenities: String(formData.get("amenities") ?? "")
                .split(",")
                .map((amenity) => amenity.trim())
                .filter(Boolean),
            rating: Number(formData.get("rating") ?? 0),
            reviews: Number(formData.get("reviews") ?? 0),
            hourlyRate: Number(formData.get("hourlyRate") ?? 0),
            securityDeposit: Number(formData.get("securityDeposit") ?? 0),
            maxCapacity: Number(formData.get("maxCapacity") ?? 0),
            overview: String(formData.get("overview") ?? ""),
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${studio._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entries),
        });

        const result = await res.json();
        console.log(result, "result")

        if (result.modifiedCount > 0) {
            toast.add({
                title: "success",
                description: "Successfully update studio"
            });
            redirect("/profile")
        }

    };

    return (
        <form onSubmit={handleSubmit}>
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
                                defaultValue={studio?.title ?? ""}
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="studio-category">Category</Label>
                                <Input
                                    type="text"
                                    id="studio-category"
                                    name="category"
                                    defaultValue={studio?.category ?? ""}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="studio-location">Location</Label>
                                <Input
                                    type="text"
                                    id="studio-location"
                                    name="location"
                                    defaultValue={studio?.location ?? ""}
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
                                defaultValue={studio?.imageUrl ?? ""}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="studio-gallery">Gallery URLs</Label>
                            <Input
                                type="text"
                                id="studio-gallery"
                                name="gallery"
                                placeholder="https://..., https://..."
                                defaultValue={studio?.gallery?.join(", ") ?? ""}
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
                                defaultValue={studio?.amenities?.join(", ") ?? ""}
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
                                    defaultValue={studio?.hourlyRate ?? ""}
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
                                    defaultValue={studio?.securityDeposit ?? ""}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="studio-maxCapacity">Max Capacity</Label>
                                <Input
                                    type="number"
                                    id="studio-maxCapacity"
                                    name="maxCapacity"
                                    min={1}
                                    defaultValue={studio?.maxCapacity ?? ""}
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
                                    defaultValue={studio?.rating ?? ""}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="studio-reviews">Reviews</Label>
                                <Input
                                    type="number"
                                    id="studio-reviews"
                                    name="reviews"
                                    min={0}
                                    defaultValue={studio?.reviews ?? ""}
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Owner (locked, edit mode only) */}
                    <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="studio-ownerName">
                                    Owner Name
                                </Label>
                                <Input
                                    type="text"
                                    id="studio-ownerName"
                                    name="ownerName"
                                    defaultValue={studio!.ownerName}
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
                                    defaultValue={studio!.ownerEmail}
                                    disabled
                                />
                            </div>

                            <p className="text-muted-foreground text-xs sm:col-span-2">
                                The owner&apos;s name and email can&apos;t
                                be changed from here.
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Overview */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="studio-overview">Over View</Label>
                            <Textarea
                                rows={5}
                                id="studio-overview"
                                name="overview"
                                defaultValue={studio?.overview ?? ""}
                            />
                        </div>
                    </div>

                    {/* Gallery (file upload) — wire up later
                    <div className="grid gap-2">
                        <Label htmlFor="studio-gallery">Gallery</Label>
                        <Input type="file" id="studio-gallery" name="gallery" />
                    </div>
                    */}
                </CardContent>

                <CardFooter className="justify-end">
                    <Button type="submit" className="cursor-pointer">Save Changes</Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default StudioForm;

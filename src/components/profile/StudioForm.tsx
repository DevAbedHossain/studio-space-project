"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { IStudio } from "@/type/Studios";

export interface StudioFormData {
    title: string;
    category: string;
    hourlyRate: number;
    securityDeposit: number;
    maxCapacity: number;
    location: string;
    imageUrl: string;
    amenities: string[];
    overview: string;
    gallery: string[];
}

const EMPTY: StudioFormData = {
    title: "",
    category: "",
    hourlyRate: 0,
    securityDeposit: 0,
    maxCapacity: 1,
    location: "",
    imageUrl: "",
    amenities: [],
    overview: "",
    gallery: [],
};

const numberField = (value: string) => (value === "" ? 0 : Number(value));

const toList = (value: string) =>
    value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

const StudioForm = ({
    initial,
    onSubmit,
}: {
    initial?: IStudio;
    onSubmit: (data: StudioFormData) => Promise<boolean>;
}) => {
    const [data, setData] = useState<StudioFormData>(
        initial
            ? {
                  title: initial.title,
                  category: initial.category,
                  hourlyRate: initial.hourlyRate,
                  securityDeposit: initial.securityDeposit,
                  maxCapacity: initial.maxCapacity,
                  location: initial.location,
                  imageUrl: initial.imageUrl,
                  amenities: initial.amenities,
                  overview: initial.overview,
                  gallery: initial.gallery,
              }
            : EMPTY
    );
    const [isSaving, setIsSaving] = useState(false);

    const set = <K extends keyof StudioFormData>(
        key: K,
        value: StudioFormData[K]
    ) => setData((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = async () => {
        if (!data.title.trim() || !data.category.trim() || !data.location.trim()) {
            toast.add({
                type: "warning",
                title: "Missing details",
                description: "Title, category, and location are required.",
            });
            return;
        }

        setIsSaving(true);
        const ok = await onSubmit(data);
        setIsSaving(false);

        if (ok && !initial) {
            setData(EMPTY);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{initial ? "Edit Studio" : "Add Studio"}</CardTitle>
                <CardDescription>
                    {initial
                        ? `Update the details of ${initial.title}.`
                        : "List a new studio so creators can book it by the hour."}
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-1">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="studio-title">Title</Label>
                        <Input
                            id="studio-title"
                            placeholder="Sunlit Podcast Studio"
                            value={data.title}
                            onChange={(e) => set("title", e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="studio-category">Category</Label>
                        <Input
                            id="studio-category"
                            placeholder="Podcast Studio"
                            value={data.category}
                            onChange={(e) => set("category", e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2 sm:col-span-2">
                        <Label htmlFor="studio-image">Image URL</Label>
                        <Input
                            id="studio-image"
                            placeholder="https://images.unsplash.com/..."
                            value={data.imageUrl}
                            onChange={(e) => set("imageUrl", e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2 sm:col-span-2">
                        <Label htmlFor="studio-location">Location</Label>
                        <Input
                            id="studio-location"
                            placeholder="Dhaka"
                            value={data.location}
                            onChange={(e) => set("location", e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="studio-hourlyRate">Hourly rate ($/hr)</Label>
                        <Input
                            id="studio-hourlyRate"
                            type="number"
                            min="0"
                            value={data.hourlyRate}
                            onChange={(e) => set("hourlyRate", numberField(e.target.value))}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="studio-securityDeposit">
                            Security deposit ($)
                        </Label>
                        <Input
                            id="studio-securityDeposit"
                            type="number"
                            min="0"
                            value={data.securityDeposit}
                            onChange={(e) =>
                                set("securityDeposit", numberField(e.target.value))
                            }
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="studio-maxCapacity">Max capacity</Label>
                        <Input
                            id="studio-maxCapacity"
                            type="number"
                            min="1"
                            value={data.maxCapacity}
                            onChange={(e) => set("maxCapacity", numberField(e.target.value))}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="studio-amenities">Amenities (comma-separated)</Label>
                        <Input
                            id="studio-amenities"
                            placeholder="Mics, Soundproofing, Piano"
                            value={data.amenities.join(", ")}
                            onChange={(e) => set("amenities", toList(e.target.value))}
                        />
                    </div>

                    <div className="grid gap-2 sm:col-span-2">
                        <Label htmlFor="studio-gallery">Gallery URLs (comma-separated)</Label>
                        <Input
                            id="studio-gallery"
                            placeholder="https://..., https://..."
                            value={data.gallery.join(", ")}
                            onChange={(e) => set("gallery", toList(e.target.value))}
                        />
                    </div>

                    <div className="grid gap-2 sm:col-span-2">
                        <Label htmlFor="studio-overview">Overview</Label>
                        <textarea
                            id="studio-overview"
                            rows={4}
                            placeholder="Tell creators what makes this space special..."
                            className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors outline-none focus-visible:ring-3 md:text-sm dark:bg-input/30"
                            value={data.overview}
                            onChange={(e) => set("overview", e.target.value)}
                        />
                    </div>

                    <Button
                        className="sm:col-span-2 cursor-pointer"
                        onClick={handleSubmit}
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : initial ? "Save Changes" : "Add Studio"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default StudioForm;

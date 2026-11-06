"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { updateUser, useSession } from "@/lib/auth-client";
import React from "react";
import { toast } from "../ui/toast";
import { redirect } from "next/navigation";

const EditProfileForm = () => {
    const { data: session } = useSession();
    const user = session?.user;

    const handleEditProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updateProfile = Object.fromEntries(formData.entries()) as { name: string, email: string, image: string };
        console.log(updateProfile, "form data");

        const { data, error } = await updateUser({
            ...updateProfile,

        })

        toast.add({
            title: "success",
            description: "successfully update profile"
        })

        redirect("/profile")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                    Update how your name and avatar appear across StudioSpace.
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-1">
                <form onSubmit={handleEditProfile}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="profile-name">Name</Label>
                            <Input
                                id="profile-name"
                                defaultValue={user?.name}
                                name="name"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="profile-email">Email</Label>
                            <Input id="profile-email" value={user?.email} name="email" disabled />
                            <p className="text-muted-foreground text-xs">
                                Your email can&apos;t be changed.
                            </p>
                        </div>

                        <div className="grid gap-2 sm:col-span-2">
                            <Label htmlFor="profile-image">Avatar URL</Label>
                            <Input
                                id="profile-image"
                                placeholder="https://..."
                                defaultValue={user?.image as string}
                                name="image"
                            />
                        </div>

                        <Button type="submit" className="cursor-pointer">Save Changes</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default EditProfileForm;

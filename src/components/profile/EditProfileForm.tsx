"use client";

import { useState } from "react";
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
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";

const EditProfileForm = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;

    const [name, setName] = useState(user?.name ?? "");
    const [image, setImage] = useState((user?.image as string) ?? "");
    const [isSaving, setIsSaving] = useState(false);

    if (isPending || !user) {
        return (
            <p className="text-muted-foreground py-10 text-center text-sm">
                {isPending ? "Loading profile..." : "Please sign in to edit your profile."}
            </p>
        );
    }

    const handleSave = async () => {
        if (!name.trim()) {
            toast.add({
                type: "warning",
                title: "Name is required",
                description: "Please enter a name for your profile.",
            });
            return;
        }

        setIsSaving(true);
        const { error } = await authClient.updateUser({
            name: name.trim(),
            image: image.trim() || undefined,
        });
        setIsSaving(false);

        if (error) {
            toast.add({
                type: "error",
                title: "Update failed",
                description: error.message ?? "Something went wrong. Please try again.",
            });
            return;
        }

        toast.add({
            type: "success",
            title: "Profile updated",
            description: "Your changes have been saved.",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                    Update how your name and avatar appear across StudioSpace.
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-1">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="profile-name">Name</Label>
                        <Input
                            id="profile-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="profile-email">Email</Label>
                        <Input id="profile-email" value={user.email} disabled />
                        <p className="text-muted-foreground text-xs">
                            Your email can&apos;t be changed.
                        </p>
                    </div>

                    <div className="grid gap-2 sm:col-span-2">
                        <Label htmlFor="profile-image">Avatar URL</Label>
                        <Input
                            id="profile-image"
                            placeholder="https://..."
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>

                    <Button
                        className="cursor-pointer"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default EditProfileForm;

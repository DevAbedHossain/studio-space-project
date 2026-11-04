"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsList,
    TabsTab,
    TabsPanel,
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import MyStudios from "@/components/profile/MyStudios";
import EditProfileForm from "@/components/profile/EditProfileForm";
import StudioForm, { StudioFormData } from "@/components/profile/StudioForm";
import { useSession } from "@/lib/auth-client";
import { IStudio } from "@/type/Studios";

const TAB_MY_STUDIOS = "my-studios";
const TAB_ADD_STUDIO = "add-studio";
const TAB_EDIT_STUDIO = "edit-studio";
const TAB_EDIT_PROFILE = "edit-profile";

const ProfilePage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;

    const [activeTab, setActiveTab] = useState<string>(TAB_MY_STUDIOS);
    const [editingStudio, setEditingStudio] = useState<IStudio | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshStudios = () => setRefreshKey((key) => key + 1);

    const handleAddStudio = async (data: StudioFormData) => {
        try {
            const res = await fetch("http://localhost:8000/studios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    ownerName: user!.name,
                    ownerEmail: user!.email,
                }),
            });

            if (!res.ok) {
                toast.add({
                    type: "error",
                    title: "Couldn't add the studio",
                    description: "Something went wrong. Please try again.",
                });
                return false;
            }

            toast.add({
                type: "success",
                title: "Studio added!",
                description: "It's now listed for bookings.",
            });
            refreshStudios();
            setActiveTab(TAB_MY_STUDIOS);
            return true;
        } catch {
            toast.add({
                type: "error",
                title: "Couldn't add the studio",
                description: "Could not reach the server. Please try again.",
            });
            return false;
        }
    };

    const handleEditStudio = async (data: StudioFormData) => {
        try {
            const res = await fetch(
                `http://localhost:8000/studios/${editingStudio!._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );

            if (!res.ok) {
                toast.add({
                    type: "error",
                    title: "Couldn't save changes",
                    description: "Something went wrong. Please try again.",
                });
                return false;
            }

            toast.add({
                type: "success",
                title: "Changes saved",
                description: "Your studio has been updated.",
            });
            refreshStudios();
            return true;
        } catch {
            toast.add({
                type: "error",
                title: "Couldn't save changes",
                description: "Could not reach the server. Please try again.",
            });
            return false;
        }
    };

    if (isPending) {
        return (
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p className="text-muted-foreground text-center text-sm">
                        Loading...
                    </p>
                </div>
            </section>
        );
    }

    if (!user) {
        return (
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-border bg-card mx-auto max-w-md rounded-3xl border p-8 text-center">
                        <h1 className="text-xl font-bold">
                            Sign in to manage your profile
                        </h1>
                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                            The profile area is where you edit your details and
                            manage your studios.
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <Button
                                variant="outline"
                                nativeButton={false}
                                render={<Link href="/login" />}
                            >
                                Login
                            </Button>
                            <Button nativeButton={false} render={<Link href="/register" />}>
                                Register
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const openEditStudio = (studio: IStudio) => {
        setEditingStudio(studio);
        setActiveTab(TAB_EDIT_STUDIO);
    };

    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Profile summary */}
                <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element -- avatar may be a provider URL that is not whitelisted */}
                    <img
                        src={user.image || "/window.svg"}
                        alt={user.name}
                        className="border-border size-14 rounded-full border object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {user.name}
                        </h1>
                        <p className="text-muted-foreground text-sm">{user.email}</p>
                    </div>
                </div>

                {/* Management tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value)}
                    className="mt-8"
                >
                    <div className="overflow-x-auto">
                        <TabsList>
                            <TabsTab value={TAB_MY_STUDIOS}>My Studios</TabsTab>
                            <TabsTab value={TAB_ADD_STUDIO}>Add Studio</TabsTab>
                            <TabsTab value={TAB_EDIT_STUDIO}>Edit Studio</TabsTab>
                            <TabsTab value={TAB_EDIT_PROFILE}>Edit Profile</TabsTab>
                        </TabsList>
                    </div>

                    <TabsPanel value={TAB_MY_STUDIOS} className="mt-6">
                        <MyStudios
                            email={user.email}
                            onEdit={openEditStudio}
                            refreshKey={refreshKey}
                        />
                    </TabsPanel>

                    <TabsPanel value={TAB_ADD_STUDIO} className="mt-6">
                        <StudioForm onSubmit={handleAddStudio} />
                    </TabsPanel>

                    <TabsPanel value={TAB_EDIT_STUDIO} className="mt-6">
                        {editingStudio ? (
                            <StudioForm
                                key={editingStudio._id}
                                initial={editingStudio}
                                onSubmit={handleEditStudio}
                            />
                        ) : (
                            <div className="border-border bg-card flex flex-col items-center rounded-3xl border px-6 py-16 text-center">
                                <h3 className="text-lg font-semibold">
                                    No studio selected
                                </h3>
                                <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
                                    Pick a studio from the My Studios tab first,
                                    then hit Edit next to it.
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-6 cursor-pointer"
                                    onClick={() => setActiveTab(TAB_MY_STUDIOS)}
                                >
                                    Go to My Studios
                                </Button>
                            </div>
                        )}
                    </TabsPanel>

                    <TabsPanel value={TAB_EDIT_PROFILE} className="mt-6">
                        <EditProfileForm />
                    </TabsPanel>
                </Tabs>
            </div>
        </section>
    );
};

export default ProfilePage;

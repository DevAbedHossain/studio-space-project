"use client";

import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import {
    UserRound,
    Building2,
    Plus,
    Settings,
    LogOut,
    Mail,
    CalendarDays,
    ShieldCheck,
    ChevronRight,
    Camera,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import MyStudios from "@/components/profile/MyStudios";
import MyBookings from "./MyBookings";

const ProfileTabs = () => {

    const { data: session } = useSession();
    const user = session?.user;

    return (
        <Tabs
            defaultValue="profile"
            orientation="vertical"
            className="grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]"
        >
            {/* Sidebar */}
            <div className="space-y-5">
                <Card className="overflow-hidden border shadow-sm">
                    <div className="h-20 bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500" />

                    <div className="-mt-10 px-5">
                        <Avatar className="size-20 border-4 border-white shadow-md dark:border-card">
                            <AvatarImage
                                src={user?.image || ""}
                                alt={user?.name || "User"}
                            />
                        </Avatar>

                        <h2 className="mt-3 truncate text-lg font-bold">
                            {user?.name || "StudioSpace User"}
                        </h2>

                        <p className="truncate text-sm text-muted-foreground">
                            {user?.email}
                        </p>

                        <Badge className="my-4 border-0 bg-violet-100 text-violet-700 hover:bg-violet-100 dark:bg-violet-950 dark:text-violet-300">
                            <ShieldCheck className="mr-1 size-3.5" />
                            Creator Account
                        </Badge>
                    </div>

                    <Separator />

                    <CardContent className="p-3">
                        <TabsList className="flex h-auto w-full flex-col items-stretch gap-1 bg-transparent p-0">
                            <TabsTrigger
                                value="profile"
                                className="h-11 justify-start gap-3 rounded-lg px-3 text-sm data-active:bg-violet-600 data-active:text-white data-active:shadow-sm"
                            >
                                <UserRound className="size-4" />
                                My Profile
                                <ChevronRight className="ml-auto size-4" />
                            </TabsTrigger>

                            <TabsTrigger
                                value="my-studios"
                                className="h-11 justify-start gap-3 rounded-lg px-3 text-sm data-active:bg-violet-600 data-active:text-white data-active:shadow-sm"
                            >
                                <Building2 className="size-4" />
                                My Studios
                                <ChevronRight className="ml-auto size-4" />
                            </TabsTrigger>

                            <TabsTrigger
                                value="add-studio"
                                className="h-11 justify-start gap-3 rounded-lg px-3 text-sm data-active:bg-violet-600 data-active:text-white data-active:shadow-sm"
                            >
                                <Plus className="size-4" />
                                Add Studio
                                <ChevronRight className="ml-auto size-4" />
                            </TabsTrigger>

                            <TabsTrigger
                                value="my-booking"
                                className="h-11 justify-start gap-3 rounded-lg px-3 text-sm data-active:bg-violet-600 data-active:text-white data-active:shadow-sm"
                            >
                                <Plus className="size-4" />
                                My Booking
                                <ChevronRight className="ml-auto size-4" />
                            </TabsTrigger>

                            <TabsTrigger
                                value="settings"
                                className="h-11 justify-start gap-3 rounded-lg px-3 text-sm data-active:bg-violet-600 data-active:text-white data-active:shadow-sm"
                            >
                                <Settings className="size-4" />
                                Settings
                                <ChevronRight className="ml-auto size-4" />
                            </TabsTrigger>
                        </TabsList>
                    </CardContent>

                    <Separator />

                    <CardContent className="px-3 py-0">
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                            onClick={() => signOut()}
                        >
                            Log Out
                        </Button>
                    </CardContent>
                </Card>

            </div>

            {/* Main tab content */}
            <div className="min-w-0 space-y-6">

                {/* Profile tab */}
                <TabsContent value="profile" className="mt-0 space-y-6">
                    <Card className="border shadow-sm">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>
                                Your StudioSpace account information.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <Avatar className="size-24 border-4 border-violet-100">
                                    <AvatarImage
                                        src={user?.image || ""}
                                        alt={user?.name || "User"}
                                    />
                                </Avatar>

                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold">
                                        {user?.name || "StudioSpace User"}
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {user?.email}
                                    </p>
                                    <Badge variant="secondary" className="mt-3">
                                        Member
                                    </Badge>
                                </div>

                                <Link
                                    href="/profile/edit"
                                    className="inline-flex h-10 items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Camera className="mr-2 size-4" />
                                    Edit Profile
                                </Link>
                            </div>

                            <Separator className="my-6" />

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-violet-50 p-3 text-violet-600 dark:bg-violet-950">
                                        <UserRound className="size-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-muted-foreground">
                                            Full Name
                                        </p>
                                        <p className="mt-1 break-words font-semibold">
                                            {user?.name || "Not provided"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-violet-50 p-3 text-violet-600 dark:bg-violet-950">
                                        <Mail className="size-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-muted-foreground">
                                            Email Address
                                        </p>
                                        <p className="mt-1 break-all font-semibold">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border shadow-sm">
                        <CardHeader>
                            <CardTitle>Account Overview</CardTitle>
                            <CardDescription>
                                A quick look at your account.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl bg-violet-50 p-5 dark:bg-violet-950/30">
                                <Building2 className="mb-3 size-6 text-violet-600" />
                                <p className="text-2xl font-bold">My Studios</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Manage your creative spaces.
                                </p>
                            </div>

                            <div className="rounded-xl bg-blue-50 p-5 dark:bg-blue-950/30">
                                <CalendarDays className="mb-3 size-6 text-blue-600" />
                                <p className="text-2xl font-bold">Bookings</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Manage your studio reservations.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* My studios tab */}
                <TabsContent value="my-studios" className="mt-0">
                    <Card className="border shadow-sm">
                        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle className="text-xl">My Studios</CardTitle>
                                <CardDescription className="mt-2">
                                    Manage the creative spaces you have listed on StudioSpace.
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <MyStudios ownerEmail={user?.email ?? ""} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Add studio tab */}
                <TabsContent value="add-studio" className="mt-0">
                    <Card className="border shadow-sm">
                        <CardContent className="flex flex-col items-center px-5 py-14 text-center">
                            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950">
                                <Building2 className="size-8" />
                            </div>

                            <h2 className="text-2xl font-bold">
                                List Your Creative Space
                            </h2>

                            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                                Share your studio with photographers, filmmakers,
                                podcasters, musicians, and other creative professionals.
                            </p>

                            <Link
                                href="/studios/add"
                                className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700"
                            >
                                <Plus className="mr-2 size-4" />
                                Create Studio Listing
                            </Link>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* My booking tab */}
                <TabsContent value="my-booking" className="mt-0">
                    <Card className="border shadow-sm">
                        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle className="text-xl">My Bookings</CardTitle>
                                <CardDescription className="mt-2">
                                    Manage the creative spaces you have Booked on StudioSpace.
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <MyBookings ownerEmail={user?.email ?? ""} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Settings tab */}
                <TabsContent value="settings" className="mt-0">
                    <Card className="border shadow-sm">
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>
                                Manage your account and security preferences.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
                                <div>
                                    <h3 className="font-semibold">Personal Information</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Update your name and profile image.
                                    </p>
                                </div>
                                <Link
                                    href="/profile/edit"
                                    className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    Edit
                                </Link>
                            </div>

                            <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
                                <div>
                                    <h3 className="font-semibold">Sign Out</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Sign out of your StudioSpace account.
                                    </p>
                                </div>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => signOut()}
                                >
                                    <LogOut className="mr-2 size-4" />
                                    Log Out
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </div>
        </Tabs>
    );
};

export default ProfileTabs;
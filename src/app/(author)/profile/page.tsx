

import { signOut, useSession } from "@/lib/auth-client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import MyStudios from "@/components/profile/MyStudios";

const ProfilePage = () => {

    const { data: session } = useSession();
    const user = session?.user;

    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">


                <Tabs defaultValue="profile" orientation="vertical" className="w-5xl gap-4">
                    <TabsList className="space-y-2 p-3 border bg-transparent">
                        <TabsTrigger value="profile" className="text-md cursor-pointer">Profile</TabsTrigger>
                        <TabsTrigger value="my-studios" className="text-md cursor-pointer">My Studios</TabsTrigger>
                        <TabsTrigger value="add-studio" className="text-md cursor-pointer">Add Studio</TabsTrigger>
                        <TabsTrigger value="settings" className="text-md cursor-pointer">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile" >
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    <div className="flex gap-5">
                                        <img className="rounded-2xl w-40" src={user?.image as string} alt={user?.name} />
                                        <div>
                                            <h2 className="text-3xl font-bold">{user?.name}</h2>
                                            <p>{user?.email}</p>
                                            <Button variant="destructive" className="cursor-pointer mt-3" onClick={() => signOut()}>Log Out</Button>
                                        </div>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </TabsContent>
                    <TabsContent value="my-studios">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Studios</CardTitle>
                                <CardDescription>
                                    Track performance and user engagement metrics. Monitor trends and
                                    identify growth opportunities.
                                    <MyStudios ownerEmail={user?.email ?? ""} />
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Page views are up 25% compared to last month.
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="add-studio">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add Studio</CardTitle>
                                <CardDescription>
                                    Generate and download your detailed reports. Export data in
                                    multiple formats for analysis.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                You have 5 reports ready and available to export.
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                                <CardDescription>
                                    Manage your account preferences and options. Customize your
                                    experience to fit your needs.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Configure notifications, security, and themes.
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default ProfilePage;



// "use client";

// import Link from "next/link";
// import { signOut, useSession } from "@/lib/auth-client";

// import {
//     UserRound,
//     Building2,
//     Plus,
//     Settings,
//     LogOut,
//     Mail,
//     CalendarDays,
//     ShieldCheck,
//     ChevronRight,
//     Camera,
// } from "lucide-react";

// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";

// import {
//     Tabs,
//     TabsContent,
//     TabsList,
//     TabsTrigger,
// } from "@/components/ui/tabs";

// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";

// import MyStudios from "@/components/profile/MyStudios";

// const ProfilePage = () => {
//     const { data: session, isPending } = useSession();
//     const user = session?.user;

//     if (isPending) {
//         return (
//             <div className="flex min-h-[60vh] items-center justify-center">
//                 <div className="text-center">
//                     <div className="mx-auto mb-3 size-8 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
//                     <p className="text-sm text-muted-foreground">
//                         Loading your profile...
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     if (!user) {
//         return (
//             <div className="flex min-h-[60vh] items-center justify-center px-4">
//                 <Card className="w-full max-w-md text-center">
//                     <CardContent className="pt-8">
//                         <UserRound className="mx-auto mb-4 size-12 text-muted-foreground" />
//                         <h2 className="text-xl font-bold">Login Required</h2>
//                         <p className="mt-2 text-sm text-muted-foreground">
//                             Please sign in to access your StudioSpace profile.
//                         </p>
//                         <Link
//                             href="/login"
//                             className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700"
//                         >
//                             Sign In
//                         </Link>
//                     </CardContent>
//                 </Card>
//             </div>
//         );
//     }

//     const initials =
//         user.name
//             ?.split(" ")
//             .map((part) => part[0])
//             .join("")
//             .slice(0, 2)
//             .toUpperCase() || "US";

//     return (
//         <section className="min-h-screen bg-[#F8F7FC] py-10 dark:bg-background sm:py-14">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//                 {/* Page heading */}
//                 <div className="mb-8">
//                     <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-violet-600">
//                         Account Dashboard
//                     </p>
//                     <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
//                         My Profile
//                     </h1>
//                     <p className="mt-2 text-sm text-muted-foreground sm:text-base">
//                         Manage your account, studios, and creative activities.
//                     </p>
//                 </div>

//                 <Tabs
//                     defaultValue="profile"
//                     orientation="vertical"
//                     className="grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]"
//                 >
//                     {/* Sidebar */}
//                     <div className="space-y-5">
//                         <Card className="overflow-hidden border shadow-sm">
//                             <div className="h-20 bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500" />

//                             <div className="-mt-10 px-5">
//                                 <Avatar className="size-20 border-4 border-white shadow-md dark:border-card">
//                                     <AvatarImage
//                                         src={user.image || ""}
//                                         alt={user.name || "User"}
//                                     />
//                                     <AvatarFallback className="bg-violet-100 text-xl font-bold text-violet-700">
//                                         {initials}
//                                     </AvatarFallback>
//                                 </Avatar>

//                                 <h2 className="mt-3 truncate text-lg font-bold">
//                                     {user.name || "StudioSpace User"}
//                                 </h2>

//                                 <p className="truncate text-sm text-muted-foreground">
//                                     {user.email}
//                                 </p>

//                                 <Badge className="my-4 border-0 bg-violet-100 text-violet-700 hover:bg-violet-100 dark:bg-violet-950 dark:text-violet-300">
//                                     <ShieldCheck className="mr-1 size-3.5" />
//                                     Creator Account
//                                 </Badge>
//                             </div>

//                             <Separator />

//                             <CardContent className="p-3">
//                                 <TabsList className="flex h-auto w-full flex-col items-stretch gap-1 bg-transparent p-0">
//                                     <TabsTrigger
//                                         value="profile"
//                                         className="h-11 justify-start gap-3 rounded-lg px-3 text-sm data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
//                                     >
//                                         <UserRound className="size-4" />
//                                         My Profile
//                                         <ChevronRight className="ml-auto size-4" />
//                                     </TabsTrigger>

//                                     <TabsTrigger
//                                         value="my-studios"
//                                         className="h-11 justify-start gap-3 rounded-lg px-3 text-sm data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
//                                     >
//                                         <Building2 className="size-4" />
//                                         My Studios
//                                         <ChevronRight className="ml-auto size-4" />
//                                     </TabsTrigger>

//                                     <TabsTrigger
//                                         value="add-studio"
//                                         className="h-11 justify-start gap-3 rounded-lg px-3 text-sm data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
//                                     >
//                                         <Plus className="size-4" />
//                                         Add Studio
//                                         <ChevronRight className="ml-auto size-4" />
//                                     </TabsTrigger>

//                                     <TabsTrigger
//                                         value="settings"
//                                         className="h-11 justify-start gap-3 rounded-lg px-3 text-sm data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
//                                     >
//                                         <Settings className="size-4" />
//                                         Settings
//                                         <ChevronRight className="ml-auto size-4" />
//                                     </TabsTrigger>
//                                 </TabsList>
//                             </CardContent>

//                             <Separator />

//                             <CardContent className="p-3">
//                                 <Button
//                                     variant="ghost"
//                                     className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
//                                     onClick={() => signOut()}
//                                 >
//                                     <LogOut className="size-4" />
//                                     Log Out
//                                 </Button>
//                             </CardContent>
//                         </Card>

//                         {/* Sidebar information */}
//                         <Card className="border-0 bg-violet-600 text-white shadow-sm">
//                             <CardContent className="p-5">
//                                 <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-white/15">
//                                     <Building2 className="size-5" />
//                                 </div>
//                                 <h3 className="font-semibold">Own a creative space?</h3>
//                                 <p className="mt-2 text-sm leading-6 text-violet-100">
//                                     List your studio and connect with creators looking for the
//                                     perfect space.
//                                 </p>
//                                 <Link
//                                     href="/studios/add"
//                                     className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-violet-700 transition-colors hover:bg-secondary/80"
//                                 >
//                                     List Your Studio
//                                     <Plus className="ml-2 size-4" />
//                                 </Link>
//                             </CardContent>
//                         </Card>
//                     </div>

//                     {/* Main tab content */}
//                     <div className="min-w-0 space-y-6">

//                         {/* Profile tab */}
//                         <TabsContent value="profile" className="mt-0 space-y-6">
//                             <Card className="border shadow-sm">
//                                 <CardHeader>
//                                     <CardTitle>Personal Information</CardTitle>
//                                     <CardDescription>
//                                         Your StudioSpace account information.
//                                     </CardDescription>
//                                 </CardHeader>

//                                 <CardContent>
//                                     <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
//                                         <Avatar className="size-24 border-4 border-violet-100">
//                                             <AvatarImage
//                                                 src={user.image || ""}
//                                                 alt={user.name || "User"}
//                                             />
//                                             <AvatarFallback className="bg-violet-100 text-2xl font-bold text-violet-700">
//                                                 {initials}
//                                             </AvatarFallback>
//                                         </Avatar>

//                                         <div className="flex-1">
//                                             <h2 className="text-2xl font-bold">
//                                                 {user.name || "StudioSpace User"}
//                                             </h2>
//                                             <p className="mt-1 text-sm text-muted-foreground">
//                                                 {user.email}
//                                             </p>
//                                             <Badge variant="secondary" className="mt-3">
//                                                 Member
//                                             </Badge>
//                                         </div>

//                                         <Link
//                                             href="/profile/edit"
//                                             className="inline-flex h-10 items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
//                                         >
//                                             <Camera className="mr-2 size-4" />
//                                             Edit Profile
//                                         </Link>
//                                     </div>

//                                     <Separator className="my-6" />

//                                     <div className="grid gap-6 sm:grid-cols-2">
//                                         <div className="flex items-start gap-3">
//                                             <div className="rounded-lg bg-violet-50 p-3 text-violet-600 dark:bg-violet-950">
//                                                 <UserRound className="size-5" />
//                                             </div>
//                                             <div className="min-w-0">
//                                                 <p className="text-xs text-muted-foreground">
//                                                     Full Name
//                                                 </p>
//                                                 <p className="mt-1 break-words font-semibold">
//                                                     {user.name || "Not provided"}
//                                                 </p>
//                                             </div>
//                                         </div>

//                                         <div className="flex items-start gap-3">
//                                             <div className="rounded-lg bg-violet-50 p-3 text-violet-600 dark:bg-violet-950">
//                                                 <Mail className="size-5" />
//                                             </div>
//                                             <div className="min-w-0">
//                                                 <p className="text-xs text-muted-foreground">
//                                                     Email Address
//                                                 </p>
//                                                 <p className="mt-1 break-all font-semibold">
//                                                     {user.email}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             <Card className="border shadow-sm">
//                                 <CardHeader>
//                                     <CardTitle>Account Overview</CardTitle>
//                                     <CardDescription>
//                                         A quick look at your account.
//                                     </CardDescription>
//                                 </CardHeader>

//                                 <CardContent className="grid gap-4 sm:grid-cols-2">
//                                     <div className="rounded-xl bg-violet-50 p-5 dark:bg-violet-950/30">
//                                         <Building2 className="mb-3 size-6 text-violet-600" />
//                                         <p className="text-2xl font-bold">My Studios</p>
//                                         <p className="mt-1 text-sm text-muted-foreground">
//                                             Manage your creative spaces.
//                                         </p>
//                                     </div>

//                                     <div className="rounded-xl bg-blue-50 p-5 dark:bg-blue-950/30">
//                                         <CalendarDays className="mb-3 size-6 text-blue-600" />
//                                         <p className="text-2xl font-bold">Bookings</p>
//                                         <p className="mt-1 text-sm text-muted-foreground">
//                                             Manage your studio reservations.
//                                         </p>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>

//                         {/* My studios tab */}
//                         <TabsContent value="my-studios" className="mt-0">
//                             <Card className="border shadow-sm">
//                                 <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                                     <div>
//                                         <CardTitle className="text-xl">My Studios</CardTitle>
//                                         <CardDescription className="mt-2">
//                                             Manage the creative spaces you have listed on StudioSpace.
//                                         </CardDescription>
//                                     </div>

//                                     <Link
//                                         href="/studios/add"
//                                         className="inline-flex h-10 items-center justify-center rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700"
//                                     >
//                                         <Plus className="mr-2 size-4" />
//                                         Add New Studio
//                                     </Link>
//                                 </CardHeader>

//                                 <CardContent>
//                                     <MyStudios ownerEmail={user.email} />
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>

//                         {/* Add studio tab */}
//                         <TabsContent value="add-studio" className="mt-0">
//                             <Card className="border shadow-sm">
//                                 <CardContent className="flex flex-col items-center px-5 py-14 text-center">
//                                     <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950">
//                                         <Building2 className="size-8" />
//                                     </div>

//                                     <h2 className="text-2xl font-bold">
//                                         List Your Creative Space
//                                     </h2>

//                                     <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
//                                         Share your studio with photographers, filmmakers,
//                                         podcasters, musicians, and other creative professionals.
//                                     </p>

//                                     <Link
//                                         href="/studios/add"
//                                         className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700"
//                                     >
//                                         <Plus className="mr-2 size-4" />
//                                         Create Studio Listing
//                                     </Link>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>

//                         {/* Settings tab */}
//                         <TabsContent value="settings" className="mt-0">
//                             <Card className="border shadow-sm">
//                                 <CardHeader>
//                                     <CardTitle>Account Settings</CardTitle>
//                                     <CardDescription>
//                                         Manage your account and security preferences.
//                                     </CardDescription>
//                                 </CardHeader>

//                                 <CardContent className="space-y-4">
//                                     <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
//                                         <div>
//                                             <h3 className="font-semibold">Personal Information</h3>
//                                             <p className="mt-1 text-sm text-muted-foreground">
//                                                 Update your name and profile image.
//                                             </p>
//                                         </div>
//                                         <Link
//                                             href="/profile/edit"
//                                             className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
//                                         >
//                                             Edit
//                                         </Link>
//                                     </div>

//                                     <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
//                                         <div>
//                                             <h3 className="font-semibold">Account Security</h3>
//                                             <p className="mt-1 text-sm text-muted-foreground">
//                                                 Manage your password and account access.
//                                             </p>
//                                         </div>
//                                         <Button variant="outline" size="sm" disabled>
//                                             Manage
//                                         </Button>
//                                     </div>

//                                     <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
//                                         <div>
//                                             <h3 className="font-semibold">Sign Out</h3>
//                                             <p className="mt-1 text-sm text-muted-foreground">
//                                                 Sign out of your StudioSpace account.
//                                             </p>
//                                         </div>
//                                         <Button
//                                             variant="destructive"
//                                             size="sm"
//                                             onClick={() => signOut()}
//                                         >
//                                             <LogOut className="mr-2 size-4" />
//                                             Log Out
//                                         </Button>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>
//                     </div>
//                 </Tabs>
//             </div>
//         </section>
//     );
// };

// export default ProfilePage;
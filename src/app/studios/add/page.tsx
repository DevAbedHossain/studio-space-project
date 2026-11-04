"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserRound } from "lucide-react";
import StudioForm, { StudioFormData } from "@/components/profile/StudioForm";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";

const AddStudioPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const router = useRouter();

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
            router.push("/profile");
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

    return (
        <section className="py-10 sm:py-14">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <Link
                    href="/profile"
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Back to profile
                </Link>

                <div className="mt-6 mb-8">
                    <p className="text-violet-600 mb-1 text-sm font-semibold uppercase tracking-widest">
                        Studio Listing
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Add Your Studio
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                        It will be listed under My Studios once saved.
                    </p>
                </div>

                {isPending ? (
                    <p className="text-muted-foreground text-center text-sm">
                        Loading...
                    </p>
                ) : user ? (
                    <StudioForm onSubmit={handleAddStudio} />
                ) : (
                    <div className="flex flex-col items-center py-14 text-center">
                        <UserRound className="text-muted-foreground size-10" />
                        <p className="mt-3 text-sm text-muted-foreground">
                            Please sign in to add a studio.
                        </p>
                        <Link
                            href="/login"
                            className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-violet-600 px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-violet-700"
                        >
                            Sign in
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AddStudioPage;

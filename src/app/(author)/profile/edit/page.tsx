"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { useSession } from "@/lib/auth-client";

const EditProfilePage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;

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
                        Account
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Edit Profile
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                        Update how your name and avatar appear across
                        StudioSpace.
                    </p>
                </div>

                {isPending ? (
                    <p className="text-muted-foreground text-center text-sm">
                        Loading profile...
                    </p>
                ) : user ? (
                    <EditProfileForm />
                ) : (
                    <p className="text-muted-foreground text-center text-sm">
                        Please sign in to edit your profile.
                    </p>
                )}
            </div>
        </section>
    );
};

export default EditProfilePage;

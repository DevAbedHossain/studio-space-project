"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserRound } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import AddStudioForm from "@/components/profile/AddStudioForm";

const AddStudioPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const router = useRouter();


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

                <AddStudioForm />
            </div>
        </section>
    );
};

export default AddStudioPage;

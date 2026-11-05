"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import StudioForm, { StudioFormData } from "@/components/profile/StudioForm";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";
import { IStudio } from "@/type/Studios";

const EditStudioPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const router = useRouter();

    const [studio, setStudio] = useState<IStudio | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`http://localhost:8000/studios/${id}`);
                const data: IStudio | null = res.ok ? await res.json() : null;
                if (!cancelled) setStudio(data);
            } catch {
                if (!cancelled) setStudio(null);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [id]);

    const handleSave = async (data: StudioFormData) => {
        try {
            const res = await fetch(`http://localhost:8000/studios/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

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
            router.push("/profile");
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

                {isLoading ? (
                    <p className="text-muted-foreground py-10 text-center text-sm">
                        Loading studio...
                    </p>
                ) : isPending || !user ? (
                    <p className="text-muted-foreground py-10 text-center text-sm">
                        Please sign in to edit your studio.
                    </p>
                ) : !studio ? (
                    <p className="text-muted-foreground py-10 text-center text-sm">
                        Studio not found.
                    </p>
                ) : studio.ownerEmail.toLowerCase() !==
                  user.email.toLowerCase() ? (
                    <p className="text-muted-foreground py-10 text-center text-sm">
                        You can only edit studios you own.
                    </p>
                ) : (
                    <div className="mt-6">
                        <StudioForm initial={studio} onSubmit={handleSave} />
                    </div>
                )}
            </div>
        </section>
    );
};

export default EditStudioPage;

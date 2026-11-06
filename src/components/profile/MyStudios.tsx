"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PackageOpen } from "lucide-react";
import { IStudio } from "@/type/Studios";
import StudioCardProfile from "./StudioCardProfile";
import { toast } from "@/components/ui/toast";


const MyStudios = ({ ownerEmail }: { ownerEmail: string }) => {
    const [studios, setStudios] = useState<IStudio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!ownerEmail) return;

        const fetchStudios = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/studios/owner/${encodeURIComponent(ownerEmail)}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch studios");
                }

                const data: IStudio[] = await res.json();

                setStudios(data);
                console.log(data, "data");
            } catch (error) {
                console.error(error);
                setError("Failed to load your studios.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudios();
    }, [ownerEmail]);

    if (!ownerEmail) {
        return (
            <div className="py-12 text-center text-muted-foreground">
                Sign in to see your studios.
            </div>
        );
    }

    if (loading) {
        return (
            <div className="py-12 text-center text-muted-foreground">
                Loading your studios...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-12 text-center text-red-500">
                {error}
            </div>
        );
    }

    const handleEdit = (studio: IStudio) => {
        router.push(`/studios/${studio._id}/edit`);
    };

    const handleDelete = async (studio: IStudio) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${studio._id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                toast.add({
                    type: "error",
                    title: "Couldn't delete the studio",
                    description: "Something went wrong. Please try again.",
                });
                return;
            }

            toast.add({
                type: "success",
                title: "Studio deleted",
                description: `${studio.title} has been removed from your listings.`,
            });
            setStudios((prev) => prev.filter((item) => item._id !== studio._id));
        } catch {
            toast.add({
                type: "error",
                title: "Couldn't delete the studio",
                description: "Could not reach the server. Please try again.",
            });
        }
    };

    return (
        <div className="space-y-6">

            {/* Studio cards */}
            {studios.length > 0 ? (
                <div className="grid gap-4">
                    {studios.map((studio) => (
                        <StudioCardProfile
                            key={studio._id}
                            studio={studio}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center py-12 text-center">
                    <PackageOpen className="size-10 text-muted-foreground" />

                    <h4 className="mt-3 font-semibold">
                        No studios yet
                    </h4>

                    <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Studios you add will appear here. Hit{" "}
                        <span className="font-medium">Add Studio</span> to list
                        your first creative space.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyStudios;

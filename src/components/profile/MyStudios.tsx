"use client";

import { useEffect, useState } from "react";
import { PackageOpen } from "lucide-react";
import { IStudio } from "@/type/Studios";
import StudioCardProfile from "./StudioCardProfile";


const MyStudios = ({ ownerEmail }: { ownerEmail: string }) => {
    const [studios, setStudios] = useState<IStudio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!ownerEmail) {
            setStudios([]);
            setLoading(false);
            return;
        }

        const fetchStudios = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(
                    `http://localhost:8000/studios/owner/${encodeURIComponent(ownerEmail)}`
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

    return (
        <div className="space-y-6">

            {/* Studio cards */}
            {studios.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2">
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

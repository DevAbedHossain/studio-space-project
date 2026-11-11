import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IStudio } from "@/type/Studios";
import StudioForm from "@/components/profile/StudioForm";
// import StudioForm from "@/components/profile/StudioForm";
// import StudioForm from "@/components/profile/studioForm";

interface EditStudioPageProps {
    params: Promise<{
        id: string;
    }>;
}

const EditStudioPage = async ({ params }: EditStudioPageProps) => {
    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch studio");
    }
    const studio: IStudio = await res.json();

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

                <div>
                    <StudioForm studio={studio} />

                </div>
            </div>
        </section>
    );
};

export default EditStudioPage;

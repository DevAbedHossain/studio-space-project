import Link from "next/link";
import {
    Check,
    ChevronLeft,
    Clock,
    Mail,
    MapPin,
    Star,
    Users,
} from "lucide-react";
import { IStudio } from "@/type/Studios";
import BookingForm from "@/components/studios/BookingForm";


const StudioDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to fetch studio");
    }
    const studio: IStudio = await res.json();


    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    href="/#studios"
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
                >
                    <ChevronLeft className="size-4" />
                    Back to studios
                </Link>

                <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px]">
                    {/* Main content */}
                    <div>
                        {/* Hero image + badges */}
                        <div className="relative aspect-video overflow-hidden rounded-3xl">
                            {/* eslint-disable-next-line @next/next/no-img-element -- studio images are owner-provided and may not be whitelisted hosts */}
                            <img
                                src={studio.imageUrl}
                                alt={studio.title}
                                className="size-full object-cover"
                            />

                            <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                                <span className="bg-background/80 rounded-full px-3 py-1 text-xs font-medium backdrop-blur">
                                    {studio.category}
                                </span>
                                <span className="bg-background/80 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium backdrop-blur">
                                    <Star className="fill-amber-400 stroke-amber-400 size-3.5" />
                                    {studio.rating} ({studio.reviews} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Title + meta */}
                        <div className="mt-6">
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                {studio.title}
                            </h1>
                            <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm">
                                <p className="flex items-center gap-1.5">
                                    <MapPin className="size-4 shrink-0" />
                                    {studio.location}
                                </p>
                                <p className="flex items-center gap-1.5">
                                    <Users className="size-4 shrink-0" />
                                    Up to {studio.maxCapacity} people
                                </p>
                                <p className="flex items-center gap-1.5">
                                    <Clock className="size-4 shrink-0" />
                                    Booked by the hour
                                </p>
                            </div>
                        </div>

                        {/* Overview */}
                        <div className="mt-10">
                            <h2 className="text-xl font-semibold">Overview</h2>
                            <p className="text-muted-foreground mt-3 leading-relaxed">
                                {studio.overview}
                            </p>
                        </div>

                        {/* Amenities */}
                        {studio.amenities.length > 0 && (
                            <div className="mt-10">
                                <h2 className="text-xl font-semibold">
                                    What&apos;s included
                                </h2>
                                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {studio.amenities.map((amenity) => (
                                        <li
                                            key={amenity}
                                            className="border-border bg-card flex items-center gap-3 rounded-2xl border p-4 text-sm"
                                        >
                                            <span className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full">
                                                <Check className="size-4" />
                                            </span>
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Gallery */}
                        {studio.gallery.length > 0 && (
                            <div className="mt-10">
                                <h2 className="text-xl font-semibold">Gallery</h2>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    {studio.gallery.map((imageUrl, ind) => (
                                        // eslint-disable-next-line @next/next/no-img-element -- studio images are owner-provided and may not be whitelisted hosts
                                        <img
                                            key={ind}
                                            src={imageUrl}
                                            alt={`${studio.title} gallery image`}
                                            className="border-border aspect-video w-full rounded-2xl border object-cover"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Host */}
                        <div className="border-border bg-card mt-10 rounded-2xl border p-6">
                            <h3 className="text-sm text-muted-foreground uppercase tracking-wide">
                                Hosted by
                            </h3>
                            <p className="mt-2 font-semibold">
                                {studio.ownerName}
                            </p>
                            <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                                <Mail className="size-4 shrink-0" />
                                {studio.ownerEmail}
                            </p>
                        </div>
                    </div>

                    {/* Booking sidebar */}
                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <BookingForm studio={studio} />
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default StudioDetailsPage;

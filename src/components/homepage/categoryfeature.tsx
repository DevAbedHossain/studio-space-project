import Link from "next/link";
import { IStudio } from "@/type/Studios";



const CategoryFeature = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, { cache: "no-store" });
    const studios = await res.json();

    const filterItem = studios.filter(
        (studio: IStudio, index: number, self: IStudio[]) =>
            index === self.findIndex(
                (item) => item.category === studio.category
            )
    );


    return (
        <section id="categories" className="border-b py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                        Studio Categories
                    </span>

                    <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                        Browse{" "}
                        <span className="text-primary">by Category</span>
                    </h2>

                    <p className="text-muted-foreground max-w-xl text-base leading-relaxed sm:text-lg">
                        From podcast booths to grand piano rooms — pick your
                        category and find the space that fits your session.
                    </p>
                </div>

                {/* Category items */}
                <div className="mt-12 flex flex-wrap items-start justify-center gap-x-8 gap-y-8 sm:gap-x-12">
                    {filterItem.slice(0, 7).map((item: IStudio) => (
                        <Link
                            key={item._id}
                            href={`/studios/category/${item.category}`}
                            className="group flex flex-col items-center gap-3"
                        >
                            <div className="border-border relative size-24 overflow-hidden rounded-full border-2 transition-all duration-300 group-hover:border-primary group-hover:shadow-lg sm:size-28">
                                {/* eslint-disable-next-line @next/next/no-img-element -- studio images are owner-provided and may not be whitelisted hosts */}
                                <img
                                    src={item.imageUrl}
                                    alt={item.category}
                                    className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <p className="group-hover:text-primary text-sm font-semibold transition-colors sm:text-base">
                                {item.category}
                            </p>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CategoryFeature;

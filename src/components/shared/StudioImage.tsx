import Image from "next/image";
import { isOptimizableImage } from "@/lib/studio-image";

interface StudioImageProps {
    src: string;
    alt: string;
    className?: string;
    /** Required for optimized images — describes the rendered size. */
    sizes: string;
    /** Set on above-the-fold images so they load eagerly. */
    priority?: boolean;
}

/**
 * Owner-provided studio images can come from any host. Known hosts go
 * through the next/image optimizer (resized to the actual display size,
 * converted to WebP/AVIF, cached long-term) — unknown hosts fall back to a
 * plain <img> so images still render. Always wrap in a `relative` container.
 */
const StudioImage = ({ src, alt, className, sizes, priority }: StudioImageProps) => {
    if (isOptimizableImage(src)) {
        return (
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className={className}
            />
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element -- unknown owner-provided host, not whitelisted for the optimizer
        <img
            src={src}
            alt={alt}
            className={className}
            loading={priority ? "eager" : "lazy"}
        />
    );
};

export default StudioImage;

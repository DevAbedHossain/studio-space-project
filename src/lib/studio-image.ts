/**
 * Hosts whitelisted in next.config.ts `images.remotePatterns`. Images from
 * these hosts can go through the next/image optimizer; anything else
 * (owner-provided URLs from arbitrary hosts) must use a plain <img>.
 */
const OPTIMIZABLE_HOSTS = new Set([
    "images.unsplash.com",
    "assets.mixkit.co",
    "static.vecteezy.com",
    "img.magnific.com",
]);

export const isOptimizableImage = (url: string | undefined): boolean => {
    if (!url) return false;
    try {
        return OPTIMIZABLE_HOSTS.has(new URL(url).hostname);
    } catch {
        return false;
    }
};

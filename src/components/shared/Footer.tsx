import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Studios", href: "/studios" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About Us", href: "/#about" },
];

const supportLinks = [
    { label: "Help Center", href: "/#about" },
    { label: "Host Guarantee", href: "/#about" },
    { label: "24/7 Support", href: "/#about" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
];

const linkColumns = [
    { heading: "Explore", links: exploreLinks },
    { heading: "Support", links: supportLinks },
    { heading: "Legal", links: legalLinks },
];

const footerLinkClass =
    "text-muted-foreground hover:text-foreground block rounded-lg px-0 py-1.5 text-sm transition-colors";

const Footer = () => {
    return (
        <footer className="bg-muted/40 border-t">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand + contact */}
                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg text-base font-bold">
                                S
                            </span>
                            <span className="text-xl font-bold tracking-tight">
                                StudioSpace
                            </span>
                        </Link>

                        <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
                            The fastest way to find, book, and shoot in verified
                            studio spaces — by the hour, day, or month.
                        </p>

                        <ul className="text-muted-foreground mt-5 space-y-2.5 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail className="size-4 shrink-0" />
                                <a
                                    href="mailto:hello@studiospace.example"
                                    className="hover:text-foreground transition-colors"
                                >
                                    hello@studiospace.example
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="size-4 shrink-0" />
                                <span>+1 (555) 010-2030</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 size-4 shrink-0" />
                                <span>128 Soundstage Ave, Nashville, TN</span>
                            </li>
                        </ul>
                    </div>

                    {/* Link columns */}
                    {linkColumns.map((column) => (
                        <nav key={column.heading} aria-label={column.heading}>
                            <h3 className="text-sm font-semibold">
                                {column.heading}
                            </h3>
                            <ul className="mt-4 space-y-1">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className={footerLinkClass}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-border mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} StudioSpace. All rights
                        reserved.
                    </p>
                    <p className="text-muted-foreground text-sm">
                        Built for creators, trusted by hosts.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

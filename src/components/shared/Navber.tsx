"use client";

import Link from "next/link";
import { useState } from "react";
import { List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { cn } from "cn";
import UserAction from "./UserAction";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Studios", href: "/studios" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About Us", href: "/#about" },
];

const Navber = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg text-base font-bold">
                        S
                    </span>
                    <span className="text-xl font-bold tracking-tight">StudioSpace</span>
                </Link>

                {/* Desktop menu */}
                <ul className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="hover:bg-muted hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop actions */}
                <div className="hidden items-center gap-2 md:flex">
                    <ThemeToggle />
                    <UserAction />
                </div>

                {/* Mobile menu toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    {isMenuOpen ? <X /> : <List />}
                </Button>
            </nav>

            {/* Mobile menu */}
            <div
                className={cn(
                    "border-t md:hidden",
                    isMenuOpen ? "block" : "hidden"
                )}
            >
                <ul className="space-y-1 px-4 py-3">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="hover:bg-muted hover:text-foreground block rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-2 px-4 pb-4">
                    <ThemeToggle />
                    <UserAction />
                </div>
            </div>
        </header>
    );
};

export default Navber;

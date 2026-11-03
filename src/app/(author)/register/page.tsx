"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Headset, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import GithubIcon from "@/components/shared/GithubIcon";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { getPasswordError } from "@/lib/password";
import { toast } from "@/components/ui/toast";

const trustPoints = [
    {
        icon: ShieldCheck,
        title: "Free to join",
        description: "Browse 200+ verified studios before booking anything.",
    },
    {
        icon: UserPlus,
        title: "Creator & host profiles",
        description: "Identity verification keeps both sides of every session safe.",
    },
    {
        icon: Headset,
        title: "24/7 support",
        description: "Real help around the clock, response under 15 minutes.",
    },
];

const RegisterPage = () => {
    const router = useRouter();
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userReg = Object.fromEntries(formData.entries()) as {
            name: string;
            image: string;
            email: string;
            password: string;
        };

        // Block invalid passwords before they ever reach the server
        const passwordError = getPasswordError(userReg.password);
        if (passwordError) {
            setPasswordError(passwordError);
            return;
        }

        const { data, error } = await signUp.email({ ...userReg });

        if (error) {
            toast.add({
                title: "Registration failed",
                description: error.message ?? "Something went wrong. Please try again.",
                type: "error",
            });
            return;
        }

        if (data) {
            toast.add({
                title: "Success",
                description: "Successfully registered.",
                type: "success",
            });
            router.push("/");
        }
    };


    return (
        <section className="border-b py-16 lg:py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                {/* Left: brand story */}
                <div className="max-w-xl">
                    <span className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                        <Sparkles className="size-3.5" />
                        Join StudioSpace
                    </span>

                    <h1 className="text-foreground mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                        Create Your Free{" "}
                        <span className="text-primary">Studio Account</span>
                    </h1>

                    <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                        One account for booking recording, podcast, and rehearsal
                        spaces — verified, available, and ready to reserve.
                    </p>

                    <ul className="mt-8 space-y-4">
                        {trustPoints.map((point) => {
                            const PointIcon = point.icon;
                            return (
                                <li key={point.title} className="flex items-start gap-4">
                                    <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-2xl">
                                        <PointIcon className="size-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{point.title}</h3>
                                        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                                            {point.description}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="border-border relative mt-8 aspect-16/9 overflow-hidden rounded-3xl border shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1600&auto=format&fit=crop"
                            alt="Rehearsal room with instruments"
                            fill
                            sizes="(min-width: 1024px) 560px, 90vw"
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Right: register card */}
                <div className="mx-auto w-full max-w-sm lg:max-w-md">
                    <div className="bg-card border-border overflow-hidden rounded-3xl border p-6 sm:p-8">
                        <CardHeader className="p-0">
                            <CardTitle className="text-2xl font-bold tracking-tight">
                                Register to your account
                            </CardTitle>
                            <CardDescription>
                                Enter your info below to register to your account
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-0">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="image">Image</Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="url"
                                        placeholder="https://example.com/avatar.png"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        aria-invalid={passwordError ? true : undefined}
                                        aria-describedby={
                                            passwordError ? "password-error" : undefined
                                        }
                                        onChange={(e) => {
                                            if (passwordError) {
                                                // Re-validate live once an error is visible
                                                setPasswordError(
                                                    getPasswordError(e.target.value)
                                                );
                                            }
                                        }}
                                    />
                                    {passwordError ? (
                                        <p
                                            id="password-error"
                                            className="text-destructive text-sm font-medium"
                                        >
                                            {passwordError}
                                        </p>
                                    ) : (
                                        <p className="text-muted-foreground text-xs">
                                            At least 6 characters, with an uppercase and a
                                            lowercase letter.
                                        </p>
                                    )}
                                </div>

                                <Button type="submit">Register</Button>
                            </form>
                        </CardContent>

                        <CardFooter className="mt-6 flex-col gap-2 border-t pt-6">
                            <p className="text-muted-foreground text-sm">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-primary underline-offset-4 hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </CardFooter>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;

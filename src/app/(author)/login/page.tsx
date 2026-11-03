"use client";

import Link from "next/link";
import Image from "next/image";
import { Headset, ShieldCheck, Sparkles, Zap } from "lucide-react";
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
import { signIn } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

const trustPoints = [
    {
        icon: ShieldCheck,
        title: "Verified studios only",
        description: "Every space is identity- and gear-checked before listing.",
    },
    {
        icon: Zap,
        title: "Instant booking",
        description: "Reserve one of 200+ studios in minutes — no back-and-forth.",
    },
    {
        icon: Headset,
        title: "24/7 support",
        description: "Real help around the clock, response under 15 minutes.",
    },
];

const LoginPage = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as { email: string, password: string };

        const { data, error } = await signIn.email({
            ...user,
            callbackURL: "/"
        })

        console.log("after submit form", data, error)

        toast.add({
            title: "success",
            description: "Successfully login"
        })

    };

    const handleGoogle = async () => {


    };

    return (
        <section className="border-b py-16 lg:py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                {/* Left: brand story */}
                <div className="max-w-xl">
                    <span className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                        <Sparkles className="size-3.5" />
                        Built for creators
                    </span>

                    <h1 className="text-foreground mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                        Welcome Back to{" "}
                        <span className="text-primary">Your Studio</span>
                    </h1>

                    <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
                        Log in to pick up where you left off — manage bookings,
                        revisit favorite studios, and plan your next session.
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
                            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop"
                            alt="Recording studio with a mixing console"
                            fill
                            sizes="(min-width: 1024px) 560px, 90vw"
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Right: login card */}
                <div className="mx-auto w-full max-w-sm lg:max-w-md">
                    <div className="bg-card border-border overflow-hidden rounded-3xl border p-6 sm:p-8">
                        <CardHeader className="p-0">
                            <CardTitle className="text-2xl font-bold tracking-tight">
                                Login to your account
                            </CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-0">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                                        minLength={8}
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                    />
                                </div>

                                <Button type="submit">
                                    Login
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="mt-6 flex-col gap-2 border-t pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={handleGoogle}
                            >
                                Login with Google
                            </Button>

                            <p className="text-muted-foreground text-sm">
                                New here?{" "}
                                <Link
                                    href="/register"
                                    className="text-primary underline-offset-4 hover:underline"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </CardFooter>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;

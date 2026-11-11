"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

const UserAction = () => {

    const { data: session } = useSession();
    const user = session?.user;

    return (
        <>
            {
                user ? <>

                    <HoverCard>
                        <HoverCardTrigger delay={10} closeDelay={100} render={
                            <div className="flex items-center gap-2 cursor-pointer">
                                <Avatar>
                                    <AvatarImage
                                        src={user.image as string}
                                        alt={user.name}
                                        className="grayscale"
                                    />
                                </Avatar>
                                <h4>{user.name}</h4>
                            </div>
                        } />
                        <HoverCardContent className="flex w-64 flex-col gap-0.5">
                            <div className="font-semibold"><Link href="/profile">{user.name}</Link></div>
                            <div className="mb-4 text-xs text-muted-foreground">
                                {user.email}
                            </div>
                            <Button onClick={() => signOut()} variant="outline" className="cursor-pointer">Sign Out</Button>
                        </HoverCardContent>
                    </HoverCard>
                </> : <>
                    <Button
                        variant="outline"
                        nativeButton={false}
                        render={<Link href="/login" />}
                    >
                        Login
                    </Button>
                    <Button nativeButton={false} render={<Link href="/register" />}>
                        Register
                    </Button>
                </>
            }
        </>
    );

};

export default UserAction;

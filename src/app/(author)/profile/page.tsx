import ProfileTabs from "@/components/profile/ProfileTabs";


const ProfilePage = () => {


    return (
        <section className="min-h-screen bg-[#F8F7FC] py-10 dark:bg-background sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Page heading */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-violet-600">
                        Account Dashboard
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        My Profile
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                        Manage your account, studios, and creative activities.
                    </p>
                </div>

                <ProfileTabs />
            </div>
        </section>
    );
};

export default ProfilePage;
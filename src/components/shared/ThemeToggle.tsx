"use client";

import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const THEME_STORAGE_KEY = "theme";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        document.documentElement.classList.toggle("dark", next);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
        } catch {
            // localStorage unavailable — theme still applies for this session
        }
        setIsDark(next);
    };

    // Render a stable placeholder before mount to avoid hydration mismatch
    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle dark mode"
                disabled
            />
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
        >
            {isDark ? <Moon /> : <Sun />}
        </Button>
    );
};

export default ThemeToggle;

"use client";

import { useState, ReactNode } from "react";

interface HoverTextProps {
    defaultContent: ReactNode;
    hoverContent: ReactNode;
    className?: string;
}

const HoverText = ({ defaultContent, hoverContent, className = "" }: HoverTextProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className={`cursor-pointer transition-opacity duration-300 ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? hoverContent : defaultContent}
        </span>
    );
};

export default HoverText;

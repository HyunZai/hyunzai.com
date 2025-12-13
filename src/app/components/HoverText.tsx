"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HoverTextProps {
    defaultContent: string;
    hoverContent: string;
    className?: string;
}

const HoverText = ({ defaultContent, hoverContent, className = "" }: HoverTextProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const processHtml = (html: string) => {
        return html.replace(/className=/g, "class=");
    };

    return (
        <span
            className={`relative inline-block cursor-pointer overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ verticalAlign: "text-bottom" }}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isHovered ? (
                    <motion.span
                        key="hover"
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: processHtml(hoverContent ? hoverContent : "데이터를 가져오지 못했습니다."),
                            }}
                        />
                    </motion.span>
                ) : (
                    <motion.span
                        key="default"
                        initial={{ y: -5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: processHtml(defaultContent ? defaultContent : "데이터를 가져오지 못했습니다."),
                            }}
                        />
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
};

export default HoverText;

'use client';

import React, { useEffect, useState, useRef } from 'react';

// Easing function: Custom ease-out (similar to power3.out)
const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4);
};

const CHARACTERS = '!<>-_\\\\/[]{}—=+*^?#________';

interface ScrambleTextProps {
    text: string;
    delay?: number; // Delay in seconds
    duration?: number; // Duration in seconds
    className?: string;
}

export function ScrambleText({ text, delay = 0, duration = 1.5, className = '' }: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [hasStarted, setHasStarted] = useState(false);
    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const animate = (time: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = time;
            }

            const elapsed = (time - startTimeRef.current) / 1000; // in seconds
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);

            let scrambled = '';
            for (let i = 0; i < text.length; i++) {
                // If character is a space, keep it a space to preserve word wrapping
                if (text[i] === ' ') {
                    scrambled += ' ';
                    continue;
                }

                // Determine if this character should be resolved based on eased progress
                // We add a slight random offset to make the resolution feel organic rather than strictly left-to-right
                const charResolveThreshold = (i / text.length) * 0.6 + Math.random() * 0.4;

                if (progress >= 1 || easedProgress > charResolveThreshold) {
                    scrambled += text[i];
                } else {
                    scrambled += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                }
            }

            setDisplayText(scrambled);

            if (progress < 1) {
                requestRef.current = requestAnimationFrame(animate);
            }
        };

        // Pre-fill with completely random text before the animation starts
        let initialScramble = '';
        for (let i = 0; i < text.length; i++) {
            initialScramble += text[i] === ' ' ? ' ' : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }
        setDisplayText(initialScramble);

        timeoutId = setTimeout(() => {
            setHasStarted(true);
            requestRef.current = requestAnimationFrame(animate);
        }, delay * 1000);

        return () => {
            clearTimeout(timeoutId);
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [text, delay, duration]);

    return (
        <span className={className} aria-label={text} title={text}>
            <span
                aria-hidden="true"
                style={{
                    opacity: hasStarted ? 1 : 0,
                    transition: 'opacity 0.1s ease-out'
                }}
            >
                {displayText}
            </span>
            {/* Visually hidden but accessible to screen readers */}
            <span
                className="sr-only"
                style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    padding: 0,
                    margin: -1,
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: 0
                }}
            >
                {text}
            </span>
        </span>
    );
}

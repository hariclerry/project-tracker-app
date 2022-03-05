import { ReactNode } from 'react';
// material
import { Breakpoint, Theme, useMediaQuery } from '@mui/material';

export default function MHidden({ width, children }) {
    const breakpoint = width.substring(0, 2);
    const hiddenUp = useMediaQuery((theme) => theme.breakpoints.up(breakpoint));
    const hiddenDown = useMediaQuery((theme) => theme.breakpoints.down(breakpoint));

    if (width.includes('Down')) {
        return hiddenDown ? null : <>{children}</>;
    }

    if (width.includes('Up')) {
        return hiddenUp ? null : <>{children}</>;
    }

    return null;
}
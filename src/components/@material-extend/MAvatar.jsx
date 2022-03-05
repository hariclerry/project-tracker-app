import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, AvatarProps } from '@mui/material';

// ----------------------------------------------------------------------

// type AvatarColor = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

// // ----------------------------------------------------------------------

// export interface MAvatarProps extends AvatarProps {
//     color?: AvatarColor;
// }

// const ref = useRef();

const MAvatar = forwardRef(
    ({ color = 'default', children, sx, ...other }, ref) => {
        const theme = useTheme();

        if (color === 'default') {
            return (
                <Avatar ref={ref} sx={sx} {...other}>
                    {children}
                </Avatar>
            );
        }

        return (
            <Avatar
                ref={ref}
                sx={{
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette[color].contrastText,
                    backgroundColor: theme.palette[color].main,
                    ...sx
                }}
                {...other}
            >
                {children}
            </Avatar>
        );
    }
);

export default MAvatar;

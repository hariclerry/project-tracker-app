import { forwardRef } from 'react';
// material
import { useTheme } from '@mui/material/styles';
import { Fab, FabProps } from '@mui/material';
//
// import { ButtonAnimate } from '../animate';

const MFab = forwardRef(
    ({ color = 'primary', children, sx, ...other }, ref) => {
        const theme = useTheme();

        if (
            color === 'default' ||
            color === 'inherit' ||
            color === 'primary' ||
            color === 'secondary'
        ) {
            return (

                <Fab ref={ref} color={color} sx={sx} {...other}>
                    {children}
                </Fab>

            );
        }

        return (

            <Fab
                ref={ref}
                sx={{
                    boxShadow: theme.customShadows[color],
                    color: theme.palette[color].contrastText,
                    bgcolor: theme.palette[color].main,
                    '&:hover': {
                        bgcolor: theme.palette[color].dark
                    },
                    ...sx
                }}
                {...other}
            >
                {children}
            </Fab>

        );
    }
);

export default MFab;

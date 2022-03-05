import { forwardRef } from 'react';
// material
import { IconButton, IconButtonProps } from '@mui/material';
//
// import { ButtonAnimate } from '../animate';

// ----------------------------------------------------------------------

const MIconButton = forwardRef(
    ({ children, ...other }, ref) => (

        <IconButton ref={ref} {...other}>
            {children}
        </IconButton>

    )
);

export default MIconButton;

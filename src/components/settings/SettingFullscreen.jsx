import { useState } from 'react';
import { Icon } from '@iconify/react';
import roundFullscreen from '@iconify/icons-ic/round-fullscreen';
import roundFullscreenExit from '@iconify/icons-ic/round-fullscreen-exit';
// material
import { alpha } from '@mui/material/styles';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function SettingFullscreen() {
    const [fullscreen, setFullscreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullscreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setFullscreen(false);
        }
    };

    return (
        <Button
            className='fullscreen-button'
            fullWidth
            size="large"
            variant="outlined"
            color={fullscreen ? 'primary' : 'inherit'}
            startIcon={<Icon icon={fullscreen ? roundFullscreenExit : roundFullscreen} />}
            onClick={toggleFullScreen}
            sx={{
                fontSize: 14,
                width: '11%',
                alignSelf: 'flex-end',
                margin: '0 30px',
                ...(fullscreen && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
                })
            }}
        >
            {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
    );
}

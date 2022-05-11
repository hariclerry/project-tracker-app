// import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@mui/styles';
import useSettings from './hooks/useSettings';
import Tracker from 'pages/Tracker';
import SettingFullscreen from './components/settings/SettingFullscreen';

// material
import { Stack, Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  root: (props) => (
    {
      backgroundColor: props.backgroundColor,
      color: props.color,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontSize: 'calc(10px + 2vmin)',
      overflowX: 'auto',
      paddingTop: '30px',
    }),
}))

function App() {
  const { themeMode } = useSettings();

  const props = {
    backgroundColor: themeMode === 'dark' ? 'rgb(22, 28, 36)' : 'rgb(255, 255, 255)',
    color: themeMode === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(33, 43, 54)',
  };

  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <SettingFullscreen />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <Typography sx={{ fontSize: '3rem', paddingBottom: '20px' }}>My Board</Typography>

      </Stack>
      <Tracker />
    </div>
  );
}

export default App;

// import logo from './logo.svg';
import './App.css';
import Settings from './components/settings';
import { makeStyles } from '@mui/styles';
import useSettings from './hooks/useSettings';
import Tracker from 'pages/Tracker';

const useStyles = makeStyles(() => ({
  root: (props) => (
    {
      backgroundColor: props.backgroundColor,
      color: props.color,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
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
      <Tracker />
      <Settings />
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Settings from './components/settings';
import { makeStyles } from '@mui/styles';
import useSettings from './hooks/useSettings';

const useStyles = makeStyles(() => ({
  root: (props) => (
    {
      backgroundColor: props.backgroundColor,
      color: props.color,
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
      <Settings />
      <div className={classes.root}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    </div>
  );
}

export default App;

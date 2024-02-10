import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import Main from './apps/screens/MyStack';
import { theme } from './apps/config/theme';
import 'react-native-gesture-handler';


export default function App() {

  return (
    <PaperProvider theme={theme}>
      <Main />
    </PaperProvider>
  );
}



import { Provider } from 'react-redux';
import RootStackNav from './src/navigation/RootStackNav';
import store from './src/redux/store';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Remote debugger']);

export default function App() {
  return (
    <Provider store={store}>
      <RootStackNav />
    </Provider>
  );
}

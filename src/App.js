import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RouteConfigComponents from './RouteConfig';
import {Provider} from "react-redux";
import store from "./Store/store";
function App() {
  return (
    <Provider store={store}>
        <RouteConfigComponents />
    </Provider>
    
  );
}

export default App;

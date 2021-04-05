import './App.css';
import { BrowserRouter,Route,Switch} from 'react-router-dom'
import Signup from './components/Signup';
import Todo from './components/Todo';
function App() {
  return (
    <div className="app__container">
    <BrowserRouter>
    <Switch>
                <Route path="/" component={Signup} exact />
                <Route path="/Todo" component={Todo} />
     </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;

import Home from "./Home";
import Auth from "./Auth";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreatePost from "./CreatePost";
import BlogPage from "./BlogPage"

function App() {
  const [userLog, setUserLog] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home userLog={userLog} setUserLog={setUserLog}/>
          </Route>
          <Route path="/auth">
            <Auth userLog={userLog} setUserLog={setUserLog} />
          </Route>
          <Route path="/create">
            <CreatePost username={userLog} setUserLog={setUserLog} />
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

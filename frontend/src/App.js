import {Header} from "./components/header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Login} from "./components/login-form/Login";

//Вдохновлялся:
//https://se.ifmo.ru/documents/10192/0/%D0%9B%D0%B5%D0%BA%D1%86%D0%B8%D1%8F+%D0%BF%D0%BE+React.+%D0%9D%D0%BE%D0%B2%D0%B0%D1%8F+%D0%BD%D0%BE%D0%B2%D0%B0%D1%8F+%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%8F.pdf/756f59bb-d0e0-4e60-a0a7-04b6c8aefc63
function App() {
    return (
        <div className="App">
            <Header></Header>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login">
                        <Login></Login>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;

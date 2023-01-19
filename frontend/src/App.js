import React, {useState} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ErrorPage} from "./components/ErrorPage/ErrorPage";
import {Login} from "./components/login-form/Login";
import {Header} from "./components/header/Header";
import {MainPage} from "./components/main-page/MainPage";
import {Registration} from "./components/registration-form/Registration";

//Вдохновлялся:
//https://se.ifmo.ru/documents/10192/0/%D0%9B%D0%B5%D0%BA%D1%86%D0%B8%D1%8F+%D0%BF%D0%BE+React.+%D0%9D%D0%BE%D0%B2%D0%B0%D1%8F+%D0%BD%D0%BE%D0%B2%D0%B0%D1%8F+%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%8F.pdf/756f59bb-d0e0-4e60-a0a7-04b6c8aefc63
function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === false);

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"
                           render={() => {
                               if (isLoggedIn) {
                                   return <Redirect to="/user/"/>;
                               }
                               return <Redirect to="/login"/>;
                           }
                           }
                    />
                    <Route isLoggedIn={isLoggedIn} exact path="/login">
                        <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}></Header>
                        <Login setIsLoggedIn={setIsLoggedIn}></Login>
                    </Route>
                    <Route isLoggedIn={isLoggedIn} exact path="/registration">
                        <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}></Header>
                        <Registration setIsLoggedIn={setIsLoggedIn}></Registration>
                    </Route>
                    <Route exact path="/user/" render={() => {
                        if (isLoggedIn) {
                            return <MainPage setIsLoggedIn={setIsLoggedIn}></MainPage>;
                        }
                        return <Redirect to="/login"/>;
                    }
                    }
                    />
                    <Route exact path="/*">
                        <ErrorPage/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;

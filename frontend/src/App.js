import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ErrorPage} from "./components/ErrorPage/ErrorPage";
import {Login} from "./components/login-form/Login";
import {Header} from "./components/header/Header";
import {MainPage} from "./components/main-page/MainPage";
import {Registration} from "./components/registration-form/Registration";
import Rows from "./components/result-table/Rows";
import axiosInstance from "./components/axios/Axios";

//Вдохновлялся:
//https://se.ifmo.ru/documents/10192/0/%D0%9B%D0%B5%D0%BA%D1%86%D0%B8%D1%8F+%D0%BF%D0%BE+React.+%D0%9D%D0%BE%D0%B2%D0%B0%D1%8F+%D0%BD%D0%BE%D0%B2%D0%B0%D1%8F+%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%8F.pdf/756f59bb-d0e0-4e60-a0a7-04b6c8aefc63
export class Point {
    x = 0;
    y = 0;
    r = 2;

    hitResult;

    setX(val) {
        this.x = val;
    }

    setY(val) {
        this.y = val;
    }

    setR(val) {
        this.r = val;
    }

    setHitResult(val) {
        this.hitResult = val;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getR() {
        return this.r;
    }

    getHitResult() {
        return this.hitResult;
    }
}

function App() {
    const getLoggedIn = () => {
        return localStorage.getItem('isLoggedIn');
    }

    let coordinates = new Point();

    const setIsLoggedIn = (arg) => {
        localStorage.setItem('isLoggedIn', arg);
    }

    let rows = new Rows();

    const loadTableFromServer = (rows) => {
        axiosInstance.get('/hits', {withCredentials: true}).then(function (response) {
            if (response.status === 200) {
                rows.convertToRow(response.data);
                console.log(response.data);
                console.log(rows.rows);
            } else {
                console.log("Hit is Not OK");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"
                           render={() => {
                               if (getLoggedIn() === 'true') {
                                   return <Redirect to="/user/"/>;
                               }
                               rows.deleteAll();
                               return <Redirect to="/login"/>;
                           }
                           }
                    />
                    <Route getLoggedIn={getLoggedIn} exact path="/login">
                        <Header setIsLoggedIn={setIsLoggedIn} getLoggedIn={getLoggedIn} rows={rows}></Header>
                        <Login setIsLoggedIn={setIsLoggedIn}></Login>
                    </Route>
                    <Route getLoggedIn={getLoggedIn} exact path="/registration">
                        <Header setIsLoggedIn={setIsLoggedIn} getLoggedIn={getLoggedIn} rows={rows}></Header>
                        <Registration setIsLoggedIn={setIsLoggedIn}></Registration>
                    </Route>
                    <Route exact path="/user/" render={() => {
                        console.log(sessionStorage.getItem('isLoggedIn'))
                        if (getLoggedIn() === 'true') {
                            loadTableFromServer(rows);
                            return <MainPage setIsLoggedIn={setIsLoggedIn} coordinates={coordinates}
                                             rows={rows}></MainPage>;
                        }
                        rows.deleteAll();
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

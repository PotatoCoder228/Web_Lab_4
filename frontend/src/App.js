import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ErrorPage} from "./components/error-page/ErrorPage";
import {Login} from "./components/login-form/Login";
import {Header} from "./components/header/Header";
import {MainPage} from "./components/main-page/MainPage";
import {Registration} from "./components/registration-form/Registration";
import Rows from "./components/result-table/Rows";

//Вдохновлялся:
//https://se.ifmo.ru/documents/10192/0/%D0%9B%D0%B5%D0%BA%D1%86%D0%B8%D1%8F+%D0%BF%D0%BE+React.+%D0%9D%D0%BE%D0%B2%D0%B0%D1%8F+%D0%BD%D0%BE%D0%B2%D0%B0%D1%8F+%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%8F.pdf/756f59bb-d0e0-4e60-a0a7-04b6c8aefc63
export class Point {
    x = 0;
    y = 0;
    r = 1;

    hitResult;

    length = 0;

    setX(val) {
        this.x = val;
    }

    setY(val) {
        this.y = val;
    }

    setR(val) {
        this.r = val;
    }

    redrawSvg() {
        console.log(this.r / 2);
        let svgGraph = document.getElementById("Svg-graph").getSVGDocument();
        if (svgGraph !== null && this.r !== undefined) {
            let minusR = (this.r).toString();
            let buf = minusR.substring(0, 1)
            minusR = minusR.replace(buf, "-" + buf);
            let minusHalfR = (this.r / 2).toString();
            buf = minusHalfR.substring(0, 1)
            minusHalfR = minusHalfR.replace(buf, "-" + buf);
            svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = minusR;
            svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = minusR;
            svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = minusHalfR;
            svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = minusHalfR;
            svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = (this.r).toString();
            svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = (this.r).toString();
            svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = (this.r / 2).toString();
            svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = (this.r / 2).toString();
        }
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
    coordinates.setR(1);

    const setIsLoggedIn = (arg) => {
        localStorage.setItem('isLoggedIn', arg);
    }


    let rows = new Rows();

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"
                           render={() => {
                               if (getLoggedIn() === 'true') {
                                   rows.render();
                                   return <Redirect to="/user/"/>;
                               }
                               rows.deleteAll();
                               return <Redirect to="/login"/>;
                           }
                           }
                    />
                    <Route getLoggedIn={getLoggedIn} exact path="/login">
                        <Header setIsLoggedIn={setIsLoggedIn} getLoggedIn={getLoggedIn} rows={rows}></Header>
                        <Login setIsLoggedIn={setIsLoggedIn} rows={rows}></Login>
                    </Route>
                    <Route getLoggedIn={getLoggedIn} exact path="/registration">
                        <Header setIsLoggedIn={setIsLoggedIn} getLoggedIn={getLoggedIn} rows={rows}></Header>
                        <Registration setIsLoggedIn={setIsLoggedIn}></Registration>
                    </Route>
                    <Route exact path="/user/" render={() => {
                        console.log(sessionStorage.getItem('isLoggedIn'))
                        if (getLoggedIn() === 'true') {
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

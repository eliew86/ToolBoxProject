import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Homepage from "./components/Homepage";
import Upload from "./components/Upload/index";
import Login from "./components/Login";
import ConfirmedUpload from "./components/ConfirmedUpload";
import Signup from "./components/Signup";
import SingleTool from "./components/SingleTool";
import Payment from "./components/Payment";
import PaymentConfirmation from "./components/PaymentConfirmation";
import MyTools from "./components/MyTools";
import MyRents from "./components/MyRents";

function App() {
    return (
        <BrowserRouter>
            <Main>
                <Switch>
                    
                    <Route exact path="/">
                        <Homepage />
                    </Route>

                    <Route path="/upload">
                        <Upload />
                    </Route>

                    <Route path="/login">
                        <Login />
                    </Route>

                    <Route path="/confirmedUpload">
                        <ConfirmedUpload />
                    </Route>

                    <Route path="/signup">
                        <Signup />
                    </Route>

                    <Route path="/getTools/:_id">
                        <SingleTool />
                    </Route>

                    <Route path="/payment/:_id">
                        <Payment />
                    </Route>

                    <Route path="/paymentConfirmation">
                        <PaymentConfirmation />
                    </Route>

                    <Route path="/mytools/:ownerId">
                        <MyTools />
                    </Route>

                    <Route path="/myrents/:renterId">
                        <MyRents />
                    </Route>
                </Switch>
            </Main>
        </BrowserRouter>
    );
}

const Main = styled.div`

`;

export default App;
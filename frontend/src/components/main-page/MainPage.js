import React from 'react';
import './MainPage-style.css';
import {Canvas} from "../Canvas/Canvas";
import ShotDataForm from "../shot-data-form/ShotDataForm";
import {ResultTable} from "../result-table/ResultTable";

export function MainPage() {
    return (
        <div className="Main-div">
            <div className="MainPage-table">
                <Canvas></Canvas>
                <ShotDataForm></ShotDataForm>
                <ResultTable></ResultTable>
            </div>
        </div>
    );
}
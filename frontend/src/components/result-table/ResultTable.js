import React from 'react';
import './ResultTable-style.css';

export function ResultTable() {
    return (
        <div className='Table-container'>
        <div className="MainPage-column-name">Results</div>
        <table className="ResultTable-table">
            <thead className="Table-header">
            <th className="ResultTable-column-name" id="Column-name-X">X</th>
            <th className="ResultTable-column-name" id="Column-name-Y">Y</th>
            <th className="ResultTable-column-name" id="Column-name-R">R</th>
            <th className="ResultTable-column-name" id="Column-name-Hit">Hit</th>
            </thead>
            <tbody className="Columns">

            </tbody>
        </table>
    </div>);
}
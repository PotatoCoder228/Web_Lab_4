import React from 'react';
import './ResultTable-style.css';

export function ResultTable({rows}) {
    rows.render();
    return (
        <div className='Table-container'>
            <div className="ResultTable-column-name">Results</div>
            <div className="ResultTable-table" id = "ResultTable-table">
                <div id="names">
                <div className="ResultTable-column-name" id="Column-name-X">X</div>
                <div className="ResultTable-column-name" id="Column-name-Y">Y</div>
                <div className="ResultTable-column-name" id="Column-name-R">R</div>
                <div className="ResultTable-column-name" id="Column-name-Hit">Hit</div>
                </div>
            </div>
        </div>);
}
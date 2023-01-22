import React, {useEffect} from 'react';
import './Graph-style.css';

const PointsCanvas = ({loadPrevPoints}) => {
    useEffect(() => {
        loadPrevPoints();
    });
    return (
        <canvas className="Prev-hits-graph" id="Prev-hits-graph" width="440" height="440">Предыдущие проверки</canvas>);
}

export default PointsCanvas;
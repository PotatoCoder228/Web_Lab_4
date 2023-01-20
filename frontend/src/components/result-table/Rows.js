import React from 'react';
import {Point} from "../../App";

class Rows extends React.Component {
    rows = [];

    constructor(props) {
        super(props);
    }


    addRow(arg) {
        this.rows.push(arg);
    }
    deleteAll() {
        while (this.rows.length > 0) {
            this.rows.pop();
        }
    }

    convertToRow(table) {
        this.deleteAll();
        for (let i = 0; i < table.length; i++) {
            let point = new Point();
            point.setX(table[i].x);
            point.setY(table[i].y);
            point.setR(table[i].r);
            point.setHitResult(table[i].hitResult);
            this.rows.push(point);
        }
    }

    render() {
        return this.rows.map((item) => {
            return <div>
                <th>{item.getX()}</th>
                <th>{item.getY()}</th>
                <th>{item.getR()}</th>
                <th>{item.getHitResult()}</th>
            </div>
        })
    }
}

export default Rows;
import React from 'react';
import {Point} from "../../App";

class Rows {
    rows = [];

    length = 0;

    addRow(arg) {
        this.rows.push(arg);
    }

    deleteAll() {
        this.rows = [];
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
        this.length = table.length;
    }

    render() {
        let table = document.getElementById("ResultTable-table");
        let names;
        if (table) {
            names = document.getElementById("names");
            table.innerHTML = "";
            table.append(names);
        }
        for (let i = 0; i < this.rows.length; i++) {
            let div = document.createElement('div');
            div.className = "row-table"
            let x = document.createElement('div');
            x.className = "x-column";
            let y = document.createElement('div');
            y.className = "y-column";
            let r = document.createElement('div');
            r.className = "r-column";
            let hitResult = document.createElement('div');
            hitResult.className = "hitResult-column";
            x.append(this.rows[i].getX());
            y.append(this.rows[i].getY());
            r.append(this.rows[i].getR());
            hitResult.append(this.rows[i].getHitResult());
            div.append(x);
            div.append(y);
            div.append(r);
            div.append(hitResult);
            table.append(div);
        }
    }
}

export default Rows;
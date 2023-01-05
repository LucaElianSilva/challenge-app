import React from "react";
import styles from "../Styles/GridTable.module.css";

export const GridTable = (props) => {
    return (
        <div className={styles["table-container"]}>
            <table>
                <thead>
                    <tr>
                    {props.columns.map((item) => 
                        <th>{item}</th>
                    )}
                    </tr>
                </thead>
                <tbody>
                        {
                        props.rows.map((item) =>
                        <tr>
                            <td>{item.Id}</td>
                            <td>${item.Precio}</td>
                            <td>{item.FechaCarga}</td>
                            <td>{item.Categoria}</td>
                        </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
}
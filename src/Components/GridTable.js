import React from "react";
import styles from "../Styles/GridTable.module.css";

export const GridTable = (props) => {
    return (
        <div className={styles["table-container"]}>
            <table className={styles.table}>
                <thead>
                    <tr>
                    {props.columns.map((item) => 
                        <th className={styles.column}>{item}</th>
                    )}
                    </tr>
                </thead>
                <tbody>
                        {props.rows.length === 0 ?
                        <tr>
                            <td className={styles["empty-grid"]} 
                            colSpan={props.columns.length}>No se encontraron productos</td>
                        </tr>:
                        props.rows.map((item) =>
                        <tr>
                            <td className={styles.row}>{item.id}</td>
                            <td className={styles.row}>{item.nombre}</td>
                            <td className={styles.row}>${item.precio}</td>
                            <td className={styles.row}>{new Date(item.fechaCarga).toLocaleDateString()}</td>
                            <td className={styles.row}>{item.categoria === 0 ? "PRODDOS" : "PRODUNO"}</td>
                        </tr>
                        )}
                </tbody>
            </table>
            <div className={styles["result-table-container"]}>
            <table className={styles["result-table"]}>
                <thead>
                    <tr>
                        <th className={styles.column}>Presupuesto</th>
                        <th className={styles.column}>Total</th>
                        <th className={styles.column}>Productos Recomendados</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={styles.row}>{props.presupuesto}</td>
                        <td className={styles.row}>{props.total}</td>
                        <td className={styles.row}>{props.prodsRecomendados.map((item) => item + " ")}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
}
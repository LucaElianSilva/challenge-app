import React from "react";
import styles from "../Styles/StockManagement.module.css";
import { GridTable } from "./GridTable";

export const StockManagement = () => {
    return (
        <div className={styles.container}>
            <div className={styles["filter-container"]}>
                <input type="text" className={styles.filter} />
            </div>
            <GridTable />
        </div>
    );
};
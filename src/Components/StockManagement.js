import React, { useEffect, useState } from "react";
import styles from "../Styles/StockManagement.module.css";
import { GridTable } from "./GridTable";

const StockManagement = () => {
    const [productos, setProductos] = useState([]);
    
    function GetProductos() {
        setProductos([]);
    }
    
    function GetProductosByMontoCliente(e){
        
    }

    useEffect(()=>{

    }, []);

    return (
        <div className={styles.container}>
            <div className={styles["filter-container"]}>
                <input type="text" className={styles.filter} onChangeCapture={(e)=> GetProductosByMontoCliente(e)}/>
            </div>
            <GridTable />
        </div>
    );
};

export default StockManagement;
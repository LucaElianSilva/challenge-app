import React, { useEffect, useState } from "react";
import styles from "../Styles/StockManagement.module.css";
import { GridTable } from "./GridTable";

const StockManagement = () => {
    const columns = ["Id", "Precio", "Fecha de Carga", "Categoría"];
    const [rows, setRows] = useState([]);
    const [productos, setProductos] = useState([]);
    const [presupuesto, setPresupuesto] = useState(null);
    const [resultado, setResultado] = useState({montoTotal: null, productos:[]});
    
    function GetProductos() {
        var data = [
            {Id: 1, Nombre:"Prod 1", Precio: 5, FechaCarga:"26/10/2019", Categoria:"Produno"},
            {Id: 2, Nombre:"Prod 2", Precio: 10, FechaCarga:"25/10/2019", Categoria:"Proddos"},
            {Id: 3, Nombre:"Prod 3", Precio: 15, FechaCarga:"26/10/2019", Categoria:"Produno"},
            {Id: 4, Nombre:"Prod 4", Precio: 20, FechaCarga:"27/10/2019", Categoria:"Produno"},
            {Id: 5, Nombre:"Prod 5", Precio: 25, FechaCarga:"28/10/2019", Categoria:"Proddos"},
        ];
        setProductos(data);
        setRows(data);
    }

    function GetProductoPrecioMayor(prods){
        var precio = 0;
        var prod = null;
        prods.forEach(function(value){
            if(value > precio){
                precio = value;
            }
            else {
                prod = value;
            }
        });

        return prod;
    }
    
    function GetProductosByMontoCliente(e){
        var presupuesto = e.target.value;
        var productosFiltrados = productos.filter(x => x.Precio < presupuesto);
        var productosProddos = productosFiltrados.filter(x => x.Categoria === "Proddos");
        var productosProduno = productosFiltrados.filter(x => x.Categoria === "Produno");
        var prodMayorPrecio = GetProductoPrecioMayor(productosProddos);

        productosProduno.forEach(function(value){
            var suma = (prodMayorPrecio.Precio + value.Precio);
            if(suma <= presupuesto){
                setResultado({montoTotal: suma, productos: [value.Nombre, prodMayorPrecio.Nombre]});
            }
        });  

        setPresupuesto(e.target.value);
        setRows(productosFiltrados);
    }

    useEffect(()=>{
        GetProductos();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles["filter-container"]}>
                <input type="text" className={styles.filter} onChange={(e)=> GetProductosByMontoCliente(e)}/>
            </div>
            <GridTable columns={columns} rows={rows}/>
            {
                <div className={styles["result-container"]}>
                    <p>Presupuesto: {rows.length > 0 ? presupuesto : null}</p>
                    <p>Productos Recomendados: 
                        {rows.length > 0 
                        ? resultado.productos.map((item) => <li>{item}</li>) 
                        : null}
                    </p>
                    <p>Monto Total: {rows.length > 0 ? resultado.montoTotal : null}</p>
                </div>
            }
        </div>
    );
};

export default StockManagement;
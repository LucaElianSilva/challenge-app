import React, { useEffect, useState } from "react";
import styles from "../Styles/StockManagement.module.css";
import { GridTable } from "./GridTable";

const StockManagement = () => {
    const columns = ["Id", "Nombre", "Precio", "Fecha de Carga", "Categoría"];
    const [rows, setRows] = useState([]);
    const [productos, setProductos] = useState([]);
    const [presupuesto, setPresupuesto] = useState(0);
    const [resultado, setResultado] = useState({montoTotal: 0, productos:[]});
    const [invalidFilter, setInvalidFilter] = useState(false);
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

    function validarInput(e){
        const esValido = e.target.validity.valid;
        if (esValido) {
            setInvalidFilter(false);
            GetProductosByMontoCliente(e);
        }
        else{
            setInvalidFilter(true);
            setRows([]);
        }
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
        var productosFiltrados = productos.filter(x => x.Precio < e.target.value);
        const productosProddos = productosFiltrados.filter(x => x.Categoria === "Proddos");
        const productosProduno = productosFiltrados.filter(x => x.Categoria === "Produno");

        if(productosProddos.length !== 0){
            var prodMayorPrecio = GetProductoPrecioMayor(productosProddos);
            var total = 0;

            productosProduno.forEach(function(value){
                if((prodMayorPrecio.Precio + value.Precio) <= e.target.value){
                    total = (prodMayorPrecio.Precio + value.Precio);
                    setResultado({montoTotal: total, productos: [value.Nombre, prodMayorPrecio.Nombre]});
                }
            });  

            if(total <= e.target.value){
                setPresupuesto(e.target.value);
                setRows(productosFiltrados);
            }
            else {
                setPresupuesto(e.target.value);
                setResultado({montoTotal: 0, productos: []});
                setRows([]);
            }
        }
        else {
            setPresupuesto(e.target.value);
            setRows([]);
            setResultado({montoTotal: 0, productos: []});
        }
    }

    useEffect(()=>{
        GetProductos();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles["filter-container"]}>
                <input type="text" className={!invalidFilter ? styles.filter : styles["invalid-filter"]} 
                pattern="[0-9]{0,7}" onChange={(e)=> validarInput(e)} maxLength="7"/>
                { !invalidFilter ? <></> : <p className={styles.invalid}>Solo se aceptan enteros</p>}
            </div>
            <GridTable columns={columns} rows={rows} presupuesto={presupuesto} 
            prodsRecomendados={resultado.productos} total={resultado.montoTotal}/>
        </div>
    );
};

export default StockManagement;
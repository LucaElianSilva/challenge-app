import axios from "axios";
import React, { useEffect, useState } from "react";
import { Port } from "../Constants";
import styles from "../Styles/StockManagement.module.css";
import { GridTable } from "./GridTable";

const StockManagement = () => {
    const columns = ["Id", "Nombre", "Precio", "Fecha de Carga", "Categoría"];
    const [rows, setRows] = useState([]);
    const [productos, setProductos] = useState([]);
    const [presupuesto, setPresupuesto] = useState(0);
    const [resultado, setResultado] = useState({montoTotal: "", productos:[]});
    const [invalidFilter, setInvalidFilter] = useState(false);

    const GetProductos = async() => {
        try {
            const response = axios({
                method: "GET",
                url: Port + "/Producto/GetProductos",
                headers: {
                    'Content-Type': 'application/json',
                  },
            }).then((r) => {
                setProductos(r.data);
                setRows(r.data);
            });

            if (!response.ok) {
                throw new Error('Request failed!');
            }
          } catch (err) {
            
          }
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
        var productosFiltrados = productos.filter(x => x.precio < e.target.value);
        const productosProddos = productosFiltrados.filter(x => x.categoria === 0);
        const productosProduno = productosFiltrados.filter(x => x.categoria === 1);

        if(productosProddos.length !== 0){
            var prodMayorPrecio = GetProductoPrecioMayor(productosProddos);
            var total = 0;

            productosProduno.forEach(function(value){
                if((prodMayorPrecio.precio + value.precio) <= e.target.value){
                    total = (prodMayorPrecio.precio + value.precio);
                    setResultado({montoTotal: total, productos: [value.nombre, prodMayorPrecio.nombre]});
                }
            });  

            if(total <= e.target.value && total !== 0){
                setPresupuesto(e.target.value);
                setRows(productosFiltrados);
            }
            else {
                setPresupuesto(e.target.value);
                setResultado({montoTotal: "", productos: []});
                setRows([]);
            }
        }
        else {
            setPresupuesto(e.target.value);
            setRows([]);
            setResultado({montoTotal: "", productos: []});
        }
    }

    useEffect(()=>{
        GetProductos();
    }, []);

    return (
        <div className={styles["father-container"]}>
            <div className={styles.container}>
                <div className={styles["child-container"]}>
                    <div className={styles["filter-container"]}>
                        <input type="text" placeholder="Ingrese presupuesto" 
                        className={!invalidFilter ? styles.filter : styles["invalid-filter"]} 
                        pattern="[0-9]{0,7}" onChange={(e)=> validarInput(e)} maxLength="7"/>
                        {!invalidFilter ? <></> : <p className={styles.invalid}>Solo se aceptan enteros</p>}
                    </div>
                    <GridTable columns={columns} rows={rows} presupuesto={presupuesto} 
                    prodsRecomendados={resultado.productos} total={resultado.montoTotal}/>
                </div>
            </div>
        </div>
    );
};

export default StockManagement;
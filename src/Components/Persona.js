import axios from "axios";
import React, { useEffect, useState } from "react";
import { Port } from "../Constants";
import styles from "../Styles/Persona.module.css";

const Persona = () => {
    const [personas, setPersonas] = useState([]);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        try {
            const response = axios({
                method: "GET",
                url: Port + "/Persona/GetPersonas",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((r) => {
                setPersonas(r.data);
            });

            if (!response.ok) {
                throw new Error('Request failed!');
            }
        } catch (err) {

        }
    }, []);


    return (
        <div className={styles.container}>
            {personas.map((persona) =>
                <div className={styles["card-container"]} onClick={() => { setShowInfo(!showInfo) }}>
                    <h3>{persona.nombre}</h3>
                    <div className={showInfo ? styles["card-info"] : styles["card-info-hide"]}>
                        <ul>
                            <li>Nombre: </li>
                            <li>Apellido</li>
                            <li>Edad:</li>
                            <li>Documento:</li>
                            <li>Sexo:</li>
                        </ul>
                        <ul>
                            <li>{persona.nombre}</li>
                            <li>{persona.apellido}</li>
                            <li>{persona.edad}</li>
                            <li>{persona.documento}</li>
                            <li>{persona.sexo}</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Persona;
import React, { useState, useEffect, useMemo } from 'react';
import Planeta from './Planeta';
import './PanelControl.css';

function PanelControl() {
    const [distancia, setDistancia] = useState(0);
    const [combustible, setCombustible] = useState(100);
    const [estadoNave, setEstadoNave] = useState("En órbita");
    const [planetasVisitados, setPlanetasVisitados] = useState([]);

    // Efecto para montaje y desmontaje
    useEffect(() => {
        console.log("¡El panel de control está listo!");
        return () => {
            console.log("El panel de control se ha apagado.");
        };
    }, []);

    // Efecto para el intervalo de vuelo basado en el estado y combustible
    useEffect(() => {
        if (estadoNave === "En órbita" && combustible > 0) {
            const intervaloVuelo = setInterval(() => {
                setCombustible(prev => {
                    const nuevoCombustible = Math.max(prev - 1, 0);
                    if (nuevoCombustible === 0) {
                        setEstadoNave("Varada"); // Cambia a "Varada" si el combustible se agota
                    }
                    return nuevoCombustible;
                });
                setDistancia(prev => prev + 10); // Aumenta distancia solo si hay combustible
            }, 1000);
            return () => clearInterval(intervaloVuelo);
        }
    }, [estadoNave, combustible]);

    // Efecto para actualización de combustible
    useEffect(() => {
        console.log("¡Combustible actualizado!");
    }, [combustible]);

    // Memorización del mensaje de estado
    const mensajeEstado = useMemo(() => {
        return `Estado actual: ${estadoNave}`;
    }, [estadoNave]);

    // Función para aterrizar
    const aterrizar = () => {
        setEstadoNave("Aterrizada");
        setPlanetasVisitados(prev => [...prev, `Planeta ${prev.length + 1}`]);
    };

    // Función para despegar
    const despegar = () => {
        setEstadoNave("En órbita");
    };

    return (
        <div className="contenedor-panel">
            <p>Distancia recorrida: {distancia} km</p>
            <p>Combustible restante: {combustible}%</p>
            <p>{mensajeEstado}</p>
            <div className="contenedor-boton">
                <button
                    className="boton-control"
                    onClick={estadoNave === "En órbita" ? aterrizar : despegar}
                    disabled={estadoNave === "Varada"}
                >
                    {estadoNave === "En órbita" ? "Aterrizar" : estadoNave === "Aterrizada" ? "Despegar" : "Sin combustible"}
                </button>
            </div>
            <ul>
                {planetasVisitados.map((planeta, index) => (
                    <Planeta key={index} nombre={planeta} />
                ))}
            </ul>
        </div>
    );
}

export default PanelControl;
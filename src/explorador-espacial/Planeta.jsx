import React, { useEffect } from 'react';

function Planeta({ nombre }) {
    useEffect(() => {
        console.log(`¡El planeta ${nombre} ha aparecido!`);

        return () => {
            console.log(`¡El planeta ${nombre} ha desaparecido`);
        };
    }, [nombre]);

    return <li>{nombre}</li>
}

export default Planeta;
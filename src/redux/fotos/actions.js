export const CAPTURA = "[fotos] captura";
export const LLAMADOR = "[fotos] llamador";
export const LIMPIAR = "[fotos] limpiarFoto";


export const captura = (foto, quien) => ({
    type: CAPTURA,
    foto: foto,
    quien: quien
});

export const llamador = (quien) => ({
    type: LLAMADOR,
    quien: quien
});

export const limpiarFoto = (quien) => ({
    type: LIMPIAR,
    quien: quien

})
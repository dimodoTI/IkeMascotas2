export const CAPTURA = "[fotos] captura";
export const LLAMADOR = "[fotos] llamador";


export const captura = (foto, quien) => ({
    type: CAPTURA,
    foto: foto,
    quien: quien
});

export const llamador = (quien) => ({
    type: LLAMADOR,
    quien: quien
});
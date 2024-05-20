export const getTipoForDisplay = (tipo) => {

    switch (tipo) {
        case 0:
            return 'Perro';
        case 1:
            return 'Gato';
        case 2:
            return 'Loro';
        case 3:
            return "Capibara";
        default:
            return 'No definido';
    }
}
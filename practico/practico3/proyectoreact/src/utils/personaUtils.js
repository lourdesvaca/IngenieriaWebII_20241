export const getGeneroForDisplay = (genero) => {
    switch (genero.toString()) {
        case "0":
            return 'Femenino';
        case "1":
            return 'Masculino';
        default:
            return 'Indefinido';
    }
}
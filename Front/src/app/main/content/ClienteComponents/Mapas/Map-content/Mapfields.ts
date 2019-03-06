export class MapFields {

    public static Fields() {
        var Maps: Array<FieldObj> = new Array<FieldObj>()
        Maps.push(
            { id: "CO-AMA", idBd: 91, NumeroReuniones: 0, Nombre: 'AMAZONAS' },
            { id: "CO-ANT", idBd: 5, NumeroReuniones: 0, Nombre: 'ANTIOQUIA' },
            { id: "CO-ARA", idBd: 81, NumeroReuniones: 0, Nombre: 'ARAUCA' },
            { id: "CO-ATL", idBd: 8, NumeroReuniones: 0, Nombre: 'ATLÁNTICO' },
            { id: "CO-BOL", idBd: 13, NumeroReuniones: 0, Nombre: 'BOLÍVAR' },
            { id: "CO-BOY", idBd: 15, NumeroReuniones: 0, Nombre: 'BOYACÁ' },
            { id: "CO-CAL", idBd: 17, NumeroReuniones: 0, Nombre: 'CALDAS' },
            { id: "CO-CES", idBd: 20, NumeroReuniones: 0, Nombre: 'CESAR' },
            { id: "CO-CHO", idBd: 27, NumeroReuniones: 0, Nombre: 'CHOCÓ' },
            { id: "CO-COR", idBd: 23, NumeroReuniones: 0, Nombre: 'CÓRDOBA' },
            { id: "CO-CAQ", idBd: 18, NumeroReuniones: 0, Nombre: 'CAQUETÁ' },
            { id: "CO-CAS", idBd: 85, NumeroReuniones: 0, Nombre: 'CASANARE' },
            { id: "CO-CAU", idBd: 19, NumeroReuniones: 0, Nombre: 'CAUCA' },
            { id: "CO-CUN", idBd: 25, NumeroReuniones: 0, Nombre: 'CUNDINAMARCA' },
            { id: "CO-DC", idBd: 11, NumeroReuniones: 0, Nombre: 'BOGOTÁ, D.C.' },
            { id: "CO-GUA", idBd: 94, NumeroReuniones: 0, Nombre: 'GUAINÍA' },
            { id: "CO-GUV", idBd: 95, NumeroReuniones: 0, Nombre: 'GUAVIARE' },
            { id: "CO-HUI", idBd: 41, NumeroReuniones: 0, Nombre: 'HUILA' },
            { id: "CO-LAG", idBd: 44, NumeroReuniones: 0, Nombre: 'LA GUAJIRA' },
            { id: "CO-MAG", idBd: 47, NumeroReuniones: 0, Nombre: 'MAGDALENA' },
            { id: "CO-MET", idBd: 50, NumeroReuniones: 0, Nombre: 'META' },
            { id: "CO-NAR", idBd: 52, NumeroReuniones: 0, Nombre: 'NARIÑO' },
            { id: "CO-NSA", idBd: 54, NumeroReuniones: 0, Nombre: 'NORTE DE SANTANDER' },
            { id: "CO-PUT", idBd: 86, NumeroReuniones: 0, Nombre: 'PUTUMAYO' },
            { id: "CO-QUI", idBd: 63, NumeroReuniones: 0, Nombre: 'QUINDIO' },
            { id: "CO-RIS", idBd: 66, NumeroReuniones: 0, Nombre: 'RISARALDA' },
            { id: "CO-SAN", idBd: 68, NumeroReuniones: 0, Nombre: 'SANTANDER' },
            { id: "CO-SUC", idBd: 70, NumeroReuniones: 0, Nombre: 'SUCRE' },
            { id: "CO-SAP", idBd: 88, NumeroReuniones: 0, Nombre: 'ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA' },
            { id: "CO-TOL", idBd: 73, NumeroReuniones: 0, Nombre: 'TOLIMA' },
            { id: "CO-VAC", idBd: 76, NumeroReuniones: 0, Nombre: 'VALLE DEL CAUCA' },
            { id: "CO-VID", idBd: 99, NumeroReuniones: 0, Nombre: 'VICHADA' },
            { id: "CO-VAU", idBd: 97, NumeroReuniones: 0, Nombre: 'VAUPÉS' },
        )

        return Maps
    }




}
export class FieldObj {
    public id: string
    public idBd: number
    public Nombre: string
    public NumeroReuniones: number
    constructor() { }
}


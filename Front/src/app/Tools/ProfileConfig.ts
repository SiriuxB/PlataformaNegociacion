import { TipoPersona2, Perfiles, TipoPersona1 } from "app/Enums/Enumerations";



export class ProfileConfig {

    public static filterDatatable(texto: string, DataIn: any) {

        var DataOut: any // get the value of the key pressed and make it lowercase
        let val = texto.toLowerCase();
        // get the amount of columns in the table
        // get the key names of each column in the dataset
        let keys = Object.keys(DataIn[0]);
        let colsAmt = keys.length;

        // assign filtered matches to the active datatable
        return DataOut = DataIn.filter(function (item) {
            // iterate through each row's column data
            for (let i = 0; i < colsAmt; i++) {
                // check for a match
                if (item[keys[i]] != undefined) {
                    if (String(item[keys[i]]).toLowerCase().indexOf(val) !== -1 || !val) {
                        // found match, return true to add to result set
                        console.log(item[keys[i]])
                        return true;
                    }
                }

            }
        });

    }
    public static ExtractProfilexTipo2(x: number): number {
        var perfil = 0

        switch (x) {
            case TipoPersona2.Testigo:
                perfil = Perfiles.Testigo
                break;
            case TipoPersona2.Abogado:
                perfil = Perfiles.Abogado
                break;
            case TipoPersona2.DelegadosEscrutinio:
                perfil = Perfiles.DelegadosEscrutinio
                break;
            case TipoPersona2.Electorero:
                perfil = Perfiles.Electorero
                break;
            case TipoPersona2.Jurado:
                perfil = Perfiles.Jurado
                break;
            case TipoPersona2.TransportadorCarro:
                perfil = Perfiles.TransportadorCarro
                break;
            default:
                perfil = 0
                break;
        }
        return perfil
    }
    public static ExtractProfilexTipo1(x: number): number {
        var perfil = 0

        switch (x) {
            case TipoPersona1.CoodinadorElectoral:
                perfil = Perfiles.CoodinadorElectoral
                break;
            case TipoPersona1.ITAuditoria:
                perfil = Perfiles.ITAuditoria
                break;
            case TipoPersona1.TransporteLogistica:
                perfil = Perfiles.TransporteLogistica
                break;
            default:
                perfil = 0
                break;
        }
        return perfil
    }


    public static cuerpo(usuario: string, pass: string): string {
        var cuerpo: string;
        cuerpo = "<!DOCTYPE html>" +
            "<html lang=\"es\">" +
            "<head>" +

            "</head>" +

            "<body>" +
            "<div>" +
            "    <div style=\"width: 100%;height: 120px;color: white;background-color: #c84c43;\">" +
            "       <div style=\"float:left;width: 119px;\">" +
            "       </div>" +
            "        <div style=\"float:right;width: 250px;margin-top:10px;\">" +
            "           <b><h3>Asignacion de Usuario</h3></b>" +
            "        </div>" +
            "    </div>" +

            "    <div style=\"color:black;width: 100%;padding-left:27px;padding-top:20px;padding-bottom:50px;background-color:#f0d8d844;font-size:16px;\">" +
            "<p>Cordial saludo.</p>" +
            "<p>Esta es la asignacion de su perfil de usuario en la plataforma.</p>" +
            "<b><p Style=\"margin-left:30px;\">Nombre Usuario: " + usuario + "</p></b>" +
            "<b><p Style=\"margin-left:30px;\">Password: " + pass + "</p></b>" +
            "</div>" +
            "</div>" +
            "</body>" +
            "</html>";
        return cuerpo;
    }


    public static cuerpo2(usuario:string,pass:string) : string{
        var cuerpo:string;
        cuerpo="<!DOCTYPE html>"+
        "<html lang=\"es\">"+
        "<head>"+
        
        "</head>"+
         
        "<body>"+
        "<div>"+
        "    <div style=\"width: 100%;height: 120px;color: white;background-color: #c84c43;\">"+
        "       <div style=\"float:left;width: 119px;\">"+
        "       </div>"+
        "        <div style=\"float:right;width: 250px;margin-top:10px;\">"+
        "           <b><h3>Asignacion de Usuario</h3></b>"+
        "        </div>"+
        "    </div>"+
            
        "    <div style=\"color:black;width: 100%;padding-left:27px;padding-top:20px;padding-bottom:50px;background-color:#f0d8d844;font-size:16px;\">"+
                "<p>Cordial saludo.</p>"+
                "<p>Tiene una persona como 'No aprobada' por parte del servicio al cliente. por favor ingrese a la plataforma y verifique.</p>"+
                "<b><p Style=\"margin-left:30px;\">Numero Documento: "+usuario+"</p></b>"+
                "<b><p Style=\"margin-left:30px;\">Nombre: "+pass+"</p></b>"+                
            "</div>"+
        "</div>"+
        "</body>"+
        "</html>";
        return cuerpo;
    }
    constructor(){}
}
export module AppEnumerations {
    
    export enum GasProfile
    {

        Subastador = 1,
        Vendedor = 2,
        Comprador = 3,
        Administrador = 4

    }


    export enum RollConsulta {
        OperadorBmc1 = 1,
        OperadorBmc2 = 40,
    }
    export enum EstadoRonda {
        Iniciada = 1,
        Cerrada = 2,
        Pausada = 3
    }
    export enum EstadoSubasta {
        Inscripcion = 1,
        Curso = 2,
        Pausada = 3,
        Finalizada = 4,
        Clausurada = 5
    }
    export var Productos = []
    Productos.push(
        {
            Descripcion: "C1",
            Id: 21
        },
        {
            Descripcion: "C2",
            Id: 22
        },
        {
            Descripcion: "Transporte",
            Id: 23
        },
        {
            Descripcion: "Rutas",
            Id: 24
        },
    )

    export enum ParametrosEnum {
        LimiteInferiorPrecioComprador = 1,
        LimiteInferiorPrecioVendedor = 2,
        LimiteInferiorTRMComprador = 3,
        LimiteInferiorTRMVendedor = 4,
        LimiteSuperiorPrecioComprador = 5,
        LimiteSuperiorPrecioVendedor = 6,
        LimiteSuperiorTRMComprador = 7,
        LimiteSuperiorTRMVendedor = 8,
        ValorMaximoDemandaDeclarada = 9,
        ValorMaximoOfertaDeclarada = 10
    }

    export var Profile = [];
    Profile.push(
        {
            Description: "Comprador Termico",
            Id: 1
        },
        {
            Description: "Comprador No Termico",
            Id: 2
        },
        {
            Description: "Vendedor",
            Id: 3
        })



    export enum PerfilUsuario {
        Vendedor = 1,
        Comprador = 2,
        Subastador = 3,
        Administrador = 4
    }
    export enum TabsSeller {
        sellerinvitation = 1,
        sellerreserve = 2,
        selleroffer = 3,
    }


    export enum RealTimeConnectionState {
        Connecting = 1,
        Connected = 2,
        Reconnecting = 3,
        Disconnected = 4
    }

    export var MonthsSP = [];
    MonthsSP.push({
        Mes: "Enero",
        Valor: 1
    }, {
            Mes: "Febrero",
            Valor: 2
        }, {
            Mes: "Marzo",
            Valor: 3
        }, {
            Mes: "Abril",
            Valor: 4
        }, {
            Mes: "Mayo",
            Valor: 5
        }, {
            Mes: "Junio",
            Valor: 6
        }, {
            Mes: "Julio",
            Valor: 7
        }, {
            Mes: "Agosto",
            Valor: 8
        }, {
            Mes: "Septiembre",
            Valor: 9
        }, {
            Mes: "Octubre",
            Valor: 10
        }, {
            Mes: "Noviembre",
            Valor: 11
        }, {
            Mes: "Diciembre",
            Valor: 12
        })

    export enum ChatMessageType {
        SEND = 1
        , RECEIVED = 2
    }
    export var SourceInfo = [];
    SourceInfo.push({
        Fuente: "Ballena",
        Valor: 1
    })
    SourceInfo.push({
        Fuente: "cusiana",
        Valor: 2
    })
    SourceInfo.push({
        Fuente: "cupiagua",
        Valor: 3
    })
    SourceInfo.push({
        Fuente: "Gibraltar",
        Valor: 4
    })
    SourceInfo.push({
        Fuente: "floreña",
        Valor: 5
    })
    SourceInfo.push({
        Fuente: "pauto",
        Valor: 6
    })
    SourceInfo.push({
        Fuente: "Nelson",
        Valor: 7
    })

}
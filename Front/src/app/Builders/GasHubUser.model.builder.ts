import { GasUserHub } from '../models/gasUserHub'
import { AppEnumerations } from '../enumerations/appEnumerations'


export class GasUserHubBuilder {

    private SessionId: number
    private UserName: string
    private GasProfile: number
    private IdSegas: number
    private ChatState:boolean
    private Nombre:string

    constructor() { }

    public Build(): GasUserHub {

        const _GasUserHub: GasUserHub = new GasUserHub()

  
        _GasUserHub.SessionId = this.SessionId
        _GasUserHub.UserName = this.UserName
        _GasUserHub.GasProfile = this.GasProfile
        _GasUserHub.IdSegas = this.IdSegas
        _GasUserHub.Nombre = this.Nombre
        _GasUserHub.ChatState = this.ChatState
        return _GasUserHub
    }


    public BuilderFromObject(data: any): GasUserHubBuilder {

        if (data.SessionId != undefined) {
            this.SessionId = data.SessionId
        }
        if (data.UserName) {
            this.UserName = data.UserName
        }
        if (data.GasProfile) {
            this.GasProfile = data.GasProfile
        }
        if (data.IdSegas) {
            this.IdSegas = data.IdSegas
        }
        if (data.ChatState) {
            this.ChatState = data.ChatState
        }
        if (data.Nombre) {
            this.Nombre = data.Nombre
        }
        return this;
    }

    public BuildWithSessionId(valor?: number): GasUserHubBuilder {
        this.SessionId = valor
        return this
    }

    public BuildWithUserName(valor?: string): GasUserHubBuilder {
        this.UserName = valor
        return this
    }
    public BuildWithGasProfile(valor?: number ): GasUserHubBuilder {
        this.GasProfile = valor
        return this
    }
    public BuildWithIdSegas(valor?: number): GasUserHubBuilder {
        this.IdSegas = valor
        return this
    }
    public BuildWithChatState(valor?: boolean): GasUserHubBuilder {
        this.ChatState = valor
        return this
    }
    public BuildWithName(valor?: string): GasUserHubBuilder {
        this.Nombre = valor
        return this
    }


}

import { Token  } from '../models/Token.model';

export class TokenBuilder {
    public IdUser: number;
    public UserName:string;
    public Password:string;
    public AuthToken:string;
    constructor() { }

    public Build(): Token {

        const _Token: Token = new Token()

  
        _Token.IdUser = this.IdUser
        _Token.UserName= this.UserName
        _Token.Password = this.Password
        _Token.AuthToken = this.AuthToken
        return _Token
    }


    public BuilderFromObject(data: any): TokenBuilder {

        if (data.IdUser!= undefined) {
            this.IdUser= data.IdUser
        }
        if (data.UserName) {
            this.UserName = data.UserName
        }
        if (data.Password) {
            this.Password = data.Password
        }
        if (data.AuthToken) {
            this.AuthToken = data.AuthToken
        }    
        return this;
    }
    public BuildWithToken(valor?: string): TokenBuilder {
        this.AuthToken = valor
        return this
    }
}

using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Services.Models
{
    public interface IUserAutenticationGas
    {
        UserAutentication Login(UserAutentication userobj);
        string GetToken(Token token);

        UserAutentication SearchToken(Token tokenObj);
        bool VerificarUsuarioCreado(UserAutentication user);
        bool VerificarUsuarioActivo(UserAutentication user);
        UserAutentication CrearUsuario(UserAutentication user);
    }
}
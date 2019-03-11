using Dataifx.AuctionDesc.Business.Clases;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Services.Models
{
    public class UserAutenticationGas:IUserAutenticationGas
    {

        public UserAutentication Login(UserAutentication userobj)
        {
            return UserGas.ResolveUserlogin(userobj);
        }

        public string GetToken(Token token)
        {
            return UserGas.GetToken(token);
        }
        public UserAutentication SearchToken(Token tokenObj)
        {
            return UserGas.SearchToken(tokenObj);
        }
    }
}
using System;
using System.Web.Http;
using Dataifx.AuctionDesc.Business.Clases;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Dataifx.AuctionDesc.Services.Models;

namespace Dataifx.AuctionDesc.Services.Controllers
{
    public class UserAutenticationGasController : ApiController
    {
        private static Lazy<IUserAutenticationGas> _Instance = new Lazy<IUserAutenticationGas>(() => new UserAutenticationGas());
        public static IUserAutenticationGas Instance
        {
            get
            {
                return _Instance.Value;
            }
        }


        [HttpPost]
        public UserAutentication LoginTest(UserAutentication obj)
        {

            UserAutentication user = Instance.Login(obj);
            return user;
        }


        [HttpPost]
        public string GetToken(Token tokenObj)
        {
            string token = Instance.GetToken(tokenObj);
            return token;
        }
        [HttpPost]
        public UserAutentication SearchToken(Token tokenObj)
        {
            UserAutentication token = Instance.SearchToken(tokenObj);
            return token;
        }

        [HttpPost]
        public bool VerificarUsuarioCreado(UserAutentication user)
        {
            bool token = Instance.VerificarUsuarioCreado(user);
            return token;
        }

        [HttpPost]
        public bool VerificarUsuarioActivo(UserAutentication user)
        {
            bool token = Instance.VerificarUsuarioActivo(user);
            return token;
        }

        [HttpPost]
        public UserAutentication CrearUsuario(UserAutentication user)
        {
            return Instance.CrearUsuario(user);

        }

        [HttpPost]
        public Usuario ActivarUsuario(Usuario entidad)
        {
            return BSubasta.ActivarUsuario(entidad);

        }


    }
}

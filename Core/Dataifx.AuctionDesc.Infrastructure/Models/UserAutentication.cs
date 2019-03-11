using Dapper.Contrib.Extensions;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    public class UserAutentication : EntidadBase
    {
        [Computed]
        public string username
        {
            get;
            set;
        }
        [Computed]
        public string Nombre
        {
            get;
            set;
        }
        [Computed]
        public string Empresa
        {
            get;
            set;
        }
        [Computed]
        public string password
        {
            get;
            set;
        }
        [Computed]
        public int access
        {
            get;
            set;
        }
        [Computed]
        public int IdSegas
        {
            get;
            set;
        }

        [Computed]
        public int Roll
        {
            get;
            set;
        }

        //Campos Nuevos Piloso
        [Computed]
        public int CodigoOperador
        {
            get;
            set;
        }
        [Computed]
        public string CodigoTipoOperador
        {
            get;
            set;
        }
        [Computed]
        public int CodigoGrupoUsuario
        {
            get;
            set;
        }
        [Computed]
        public int Perfil
        {
            get;
            set;
        }


    }
}

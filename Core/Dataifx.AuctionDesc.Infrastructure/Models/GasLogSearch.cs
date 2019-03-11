namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    public class GasLogSearch
    {

        public virtual string FechaInicio
        {
            get;
            set;
        }

        public virtual string FechaFin
        {
            get;
            set;
        }

        public virtual int IdTipoAccion
        {
            get;
            set;
        }

        public virtual int IdUsuario
        {
            get;
            set;
        }

        public virtual string EstadoTransaccion {
            get;
            set;
        }
        public virtual UserAutentication User
        {
            get;
            set;
        }

    }
}

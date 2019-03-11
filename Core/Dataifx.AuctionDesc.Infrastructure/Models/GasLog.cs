namespace Dataifx.AuctionDesc.Infrastructure.Models
{
   public class GasLog
    {

   
        public virtual string Descripcion
        {
            get;
            set;
        }
        public virtual int IdUsuario
        {
            get;
            set;
        }
        public virtual string NombreUsuario
        {
            get;
            set;
        }
        

        public virtual string TipoMovimiento
        {
            get;
            set;
        }


        public virtual string Nombre
        {
            get;
            set;
        }

        public virtual int IdTipoAccion
        {
            get;
            set;
        }

        public virtual bool EstadoTransaccion
        {
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

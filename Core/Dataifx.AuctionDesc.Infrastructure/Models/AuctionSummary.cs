namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    public class AuctionSummary
    {







        public virtual int IdComprador
        {
            get;
            set;
        }

        public virtual int IdSubasta
        {
            get;
            set;
        }
        public virtual int NumeroRonda
        {
            get;
            set;
        }
        public virtual int IdFuente
        {
            get;
            set;
        }


        public virtual string NombreFuente
        {
            get;
            set;
        }
        public virtual string NombreVendedor
        {
            get;
            set;
        }

        public virtual decimal PrecioReserva
        {
            get;
            set;
        }


        public virtual decimal CantidadDemanda
        {
            get;
            set;
        }

        public virtual decimal CantidadOfertada
        {
            get;
            set;
        }



        public virtual string NombreComprador
        {
            get;
            set;
        }

        public virtual decimal PrecioDisminDemanda
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

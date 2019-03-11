namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    public class ClosingData
    {

        public virtual int IdSubasta
        {
            get;
            set;
        }

        public virtual int IdFuente
        {
            get;
            set;
        }
        public virtual int IdComprador
        {
            get;
            set;
        }
        public virtual decimal PrecioCierre
        {
            get;
            set;
        }


        public virtual decimal CantidadAdjudicada
        {
            get;
            set;
        }
        public virtual int IdVendedor
        {
            get;
            set;
        }

    }
}



namespace Dataifx.AuctionDesc.Infrastructure.Models
{
   public class Params
    {

        public virtual int Id
            {
                get;
                set;
            }

            public virtual string NombreParametro
        {
                get;
                set;
            }

            public virtual string Parametro
        {
                get; set;

            }

            public virtual decimal Valor
        {
                get; set;

            }
        public virtual string Tipo
        {
            get; set;

        }
        public virtual string Texto
        {
            get; set;

        }

        public virtual UserAutentication User
        {
            get;
            set;
        }

    }
}

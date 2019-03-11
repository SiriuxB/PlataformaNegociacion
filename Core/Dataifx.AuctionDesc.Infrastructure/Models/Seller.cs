
using System.Collections.Generic;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    public class Seller
    {
        public virtual int IdSegas
        {
            get;
            set;
        }

        public virtual string Nombre
        {
            get;
            set;
        }

        public virtual decimal PTDVF 
        {
            get;
            set;
        }
        public virtual decimal CIFVF
        {
            get;
            set;
        }

        public virtual bool Estado
        {
            get;
            set;
        }
        public virtual int IdSubasta
        {
            get;
            set;
        }

        public virtual UserAutentication User
        {
            get;
            set;
        }

        public virtual bool Cubrimiento
        {
            get;
            set;
        }
        public virtual bool Listas
        {
            get;
            set;
        }
        public virtual int IdOperador
        {
            get;
            set;
        }

        
    }
}

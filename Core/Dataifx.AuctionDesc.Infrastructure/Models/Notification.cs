
using System;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
  public class Notification
    {
        public virtual string Mensaje
        {
            get;
            set;
        }
        public virtual DateTime Fecha
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

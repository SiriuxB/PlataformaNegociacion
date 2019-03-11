using System;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    public class Message
    {


        public virtual DateTime Fecha
        {
            get;
            set;
        }
        public virtual string Remitente
        {
            get;
            set;
        }
        public virtual string Destinatario
        {
            get;
            set;
        }


        public virtual string Mensaje
        {
            get;
            set;
        }


    }
}

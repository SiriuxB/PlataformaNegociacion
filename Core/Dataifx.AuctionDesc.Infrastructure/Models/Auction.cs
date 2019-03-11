using System;
using System.Collections.Generic;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
   public class Auction
    {

        public virtual int Id
        {
            get;
            set;
        }

        public virtual DateTime Fecha_Creacion
        {
            get;
            set;
        }

        public virtual DateTime Fecha_Modificacion
        {
            get;
            set;
        }
        public virtual DateTime Fecha_Inscripcion
        {
            get;
            set;
        }
        public virtual DateTime Fecha_InicioSubasta
        {
            get;
            set;
        }
        

        public virtual DateTime Fecha_Finalizacion
        {
            get;
            set;
        }

        public virtual int Estado
        {
            get;
            set;
        }

        public virtual string Nombre_Producto
        {
            get;
            set;
        }


        public virtual Int32 TipoSubasta
        {
            get;
            set;
        }

        public virtual Int32 NumeroRonda
        {
            get;
            set;
        }

        
        public virtual UserAutentication User
        {
            get;
            set;
        }
        public virtual Int32 TipoConsulta
        {
            get;
            set;
        }
        public static object CreadaPorVendedor { get; set; }
    }
}

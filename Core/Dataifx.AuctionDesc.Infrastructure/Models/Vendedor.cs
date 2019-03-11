using System;
using System.Collections.Generic;

using System;
using Dapper.Contrib.Extensions;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    [Table("Vendedor")]
    public class Vendedor : EntidadBase
    {
        [Key]
        public int Id { get; set; }


        public int IdSegas { get; set; }
        public int IdSubasta { get; set; }
        public string Nombre { get; set; }

        public double Cantidad { get; set; }

        public double PrecioTecho { get; set; }
        public double PrecioPiso{ get; set; }
        public double Variacion { get; set; }
        
        public DateTime Fecha { get; set; }

    }
}

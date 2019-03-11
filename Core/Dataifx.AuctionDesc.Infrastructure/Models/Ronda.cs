using System;
using System.Collections.Generic;

using System;
using Dapper.Contrib.Extensions;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    [Table("Ronda")]
    public class Ronda : EntidadBase
    {
        [Key]
        public int Id { get; set; }
        public int IdSubasta { get; set; }
        public int NumeroRonda { get; set; }
        public double CantidadOfertada { get; set; }
        public double CantidadDemandada { get; set; }
        public double Valor { get; set; }
        public int IdVendedor { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }

        public int Estado { get; set; }
        [Computed]
        public double PrecioRondaAnterior { get; set; }
        [Computed]
        public bool UltimaRonda { get; set; }

    }
}

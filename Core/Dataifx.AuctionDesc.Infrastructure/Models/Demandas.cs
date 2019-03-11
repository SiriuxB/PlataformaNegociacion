using System;
using System.Collections.Generic;

using System;
using Dapper.Contrib.Extensions;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    [Table("Demanda")]
    public class Demanda : EntidadBase
    {
        [Key]
        public int Id { get; set; }

        public int IdComprador { get; set; }
        public int IdSubasta { get; set; }
        public int IdRonda { get; set; }
        public double Demandas { get; set; }
        public DateTime Fecha { get; set; }

        [Computed]
        public string NombreVendedor { get; set; }

        [Computed]
        public double ValorCompra { get; set; }

        [Computed]
        public double NumeroRonda { get; set; }
        public string NombreComprador { get; set; }
        [Computed]
        public bool NotificarCierreSubasta { get; set; }
    }
}

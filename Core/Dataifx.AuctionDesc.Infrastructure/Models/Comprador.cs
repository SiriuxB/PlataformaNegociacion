using System;
using System.Collections.Generic;

using System;
using Dapper.Contrib.Extensions;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    [Table("Comprador")]
    public class Comprador : EntidadBase
    {
        [Key]
        public int Id { get; set; }

        public int IdSegas { get; set; }
        public int IdSubasta { get; set; }
        public string Nombre { get; set; }
        public DateTime Fecha { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System;
using Dapper.Contrib.Extensions;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    [Table("Subasta")]
    public class Subasta : EntidadBase
    {
        [Key]
        public int Id
        {
            get;
            set;
        }

        public DateTime Fecha
        {
            get;
            set;
        }

        public int Estado
        {
            get;
            set;
        }

        public int CodigoUsuario
        {
            get;
            set;
        }

        public bool RondaEnCurso { get; set; }

        [Computed]
        public Ronda Ronda { get; set; }

        public int CreadaPorVendedor { get; set; }

        public int TipoSubasta { get; set; }

        public double MultiploDemanda { get; set; }
        [Computed]
        public bool UltimaRonda { get; set; }

    }
}

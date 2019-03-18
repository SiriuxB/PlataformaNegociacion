using System;
using System.Collections.Generic;

using System;
using Dapper.Contrib.Extensions;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    [Table("Usuario")]
    public class Usuario : EntidadBase
    {
        [Key]
        public int Id { get; set; }

        public int IdSegas { get; set; }
        public string NombreUsuario { get; set; }
        public string Nombre { get; set; }       
        public string Empresa { get; set; }
        public int Rol { get; set; }
        public bool Activo { get; set; }
        [Computed]
        public string NombreRol { get; set; }
    }

}

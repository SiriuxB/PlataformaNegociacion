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

        public string Nombre { get; set; }
        public string Password { get; set; }
        public int Rol { get; set; }
        public string UserName { get; set; }
        public DateTime FechaModificacion { get; set; }
        public bool Activo { get; set; }
        [Computed]
        public string NombreRol { get; set; }
        
    }

}

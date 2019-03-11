using System;
using System.Collections.Generic;

using System;
using Dapper.Contrib.Extensions;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    [Table("Roles")]
    public class Roles : EntidadBase
    {
        [Key]
        public int Id { get; set; }

        public string Nombre { get; set; }
       
    }

}

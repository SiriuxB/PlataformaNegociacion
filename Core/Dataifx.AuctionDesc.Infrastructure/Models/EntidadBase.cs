using System;
using System.Collections.Generic;

using System;
using Dapper.Contrib.Extensions;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{

    public class EntidadBase
    {
        public EntidadBase()
        {
            EstadoPeticionOK = true;
        }
        [Computed]
        public int Id { get; set; }
        [Computed]
        public bool EstadoPeticionOK { get; set; }
        [Computed]
        public string ErrorMensaje { get; set; }
        [Computed]
        public UserAutentication UserAutentication { get; set; }

    }
}

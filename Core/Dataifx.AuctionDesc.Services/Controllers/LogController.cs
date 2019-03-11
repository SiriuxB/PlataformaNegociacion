using System;
using System.Collections.Generic;
using System.Web.Http;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Dataifx.AuctionDesc.Services.Models;

namespace Dataifx.AuctionDesc.Services.Controllers
{
    public class LogController : ApiController
    {
        private static Lazy<IGasLog> _Instance = new Lazy<IGasLog>(() => new Services.Models.GasLog());

        public static IGasLog Instance
        {
            get
            {
                return _Instance.Value;
            }
        }

      
    }
}

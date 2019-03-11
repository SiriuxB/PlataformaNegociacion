using System;
using System.Collections.Generic;
using Dataifx.AuctionDesc.Business.Clases;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Services.Models
{
    public class Params : IParams
    {
        public List<AuctionDesc.Infrastructure.Models.Params> SearchParams(AuctionDesc.Infrastructure.Models.Params paramsObj)
        {
            return ParamsB.SearchParams(paramsObj);
        }

        public bool SaveParams(List<AuctionDesc.Infrastructure.Models.Params> listParamsObj)
        {
            return ParamsB.SaveParams(listParamsObj);
        }

        public DateTime GetBDTime()

        {
            return ParamsB.GetBDTime();
        }
    }
}
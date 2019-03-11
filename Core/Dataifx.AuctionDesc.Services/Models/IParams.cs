using System;
using System.Collections.Generic;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Services.Models
{
    public interface IParams
    {
        List<AuctionDesc.Infrastructure.Models.Params> SearchParams(AuctionDesc.Infrastructure.Models.Params paramsObj);
        bool SaveParams(List<AuctionDesc.Infrastructure.Models.Params> listParamsObj);

        DateTime GetBDTime();
    }
}
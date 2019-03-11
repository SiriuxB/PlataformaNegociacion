using System.Collections.Generic;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Services.Models
{
    public interface IPurchaser
    {
        bool PurchaserSaveMaxDemand(AuctionDesc.Infrastructure.Models.Purchaser purchaserObj);
        List<AuctionDesc.Infrastructure.Models.Purchaser> PurchasersInfo(AuctionDesc.Infrastructure.Models.Auction obj);
        AuctionDesc.Infrastructure.Models.Purchaser PurchaserInfoById(AuctionDesc.Infrastructure.Models.Purchaser obj);
        bool PurchasersSaveState(List<AuctionDesc.Infrastructure.Models.Purchaser> purchaserObjList);
        bool SavePurchaserUser(AuctionDesc.Infrastructure.Models.Purchaser purchaserObj);
        
    }
}
using System.Collections.Generic;
using Dataifx.AuctionDesc.Business.Clases;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Services.Models
{
    public class Purchaser
    {
   
        public List<AuctionDesc.Infrastructure.Models.Purchaser>  PurchasersInfo(AuctionDesc.Infrastructure.Models.Auction obj)
        {
            return PurchaserB.PurchasersInfo(obj);
        }

       public AuctionDesc.Infrastructure.Models.Purchaser PurchaserInfoById(AuctionDesc.Infrastructure.Models.Purchaser obj)
        {
               return PurchaserB.PurchaserInfoById(obj);
        }
       public bool PurchasersSaveState(List<AuctionDesc.Infrastructure.Models.Purchaser> purchaserObjList)
        {
            return PurchaserB.PurchasersSaveState(purchaserObjList);
        }


        public bool SavePurchaserUser(AuctionDesc.Infrastructure.Models.Purchaser purchaserObj)
        {
            return PurchaserB.SavePurchaserUser(purchaserObj);
        }
        


    }
}
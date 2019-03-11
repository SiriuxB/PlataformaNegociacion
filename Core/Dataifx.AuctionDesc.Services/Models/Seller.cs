using System.Collections.Generic;
using Dataifx.AuctionDesc.Business.Clases;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Services.Models
{
    public class Seller 

    {
 
        public List<AuctionDesc.Infrastructure.Models.Seller> SellersInfo(AuctionDesc.Infrastructure.Models.Auction obj)
        {
            return SellerB.SellersInfo(obj);
        }
        public AuctionDesc.Infrastructure.Models.Seller SellersInfoById(AuctionDesc.Infrastructure.Models.Seller obj)
        {
            return SellerB.SellersInfoById(obj);
        }
        public AuctionDesc.Infrastructure.Models.Seller SellerSave(AuctionDesc.Infrastructure.Models.Seller sellerObj)
        {
            return SellerB.SellerSave(sellerObj);
        }

 
        public bool SellersSaveState(List<AuctionDesc.Infrastructure.Models.Seller> sellerObj)
        {
            return SellerB.SellersSaveState(sellerObj);
        }
 


    }
}
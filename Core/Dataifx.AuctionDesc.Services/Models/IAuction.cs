using System.Collections.Generic;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Services.Models
{
    public interface IAuction
    {
        AuctionDesc.Infrastructure.Models.Auction AuctionStatus(AuctionDesc.Infrastructure.Models.Auction userObj);


        bool ChargeSellerC2(AuctionDesc.Infrastructure.Models.Auction aucobj);
        bool EvalClosingAuctionExcessOffer();
        void TestClosing();
        bool ValidateConfirmAuctionOffers(AuctionDesc.Infrastructure.Models.Auction aucobj);
  
    }
}
using System.Collections.Generic;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Services.Models
{
    public interface ISeller
    {
        AuctionDesc.Infrastructure.Models.Seller SellerSave(AuctionDesc.Infrastructure.Models.Seller sellerObj);
        List<AuctionDesc.Infrastructure.Models.Seller> SellersInfo(AuctionDesc.Infrastructure.Models.Auction obj);
        AuctionDesc.Infrastructure.Models.Seller SellersInfoById(AuctionDesc.Infrastructure.Models.Seller obj);
        bool SellerSaveSource(AuctionDesc.Infrastructure.Models.Seller sellerObj);
        bool SellersSaveState(List<AuctionDesc.Infrastructure.Models.Seller> sellerObj);

        bool SellerUpdateRoundSource(AuctionDesc.Infrastructure.Models.Seller sellerObj);

    }
}
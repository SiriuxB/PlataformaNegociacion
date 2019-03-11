namespace Dataifx.AuctionDesc.Infrastructure.Enumerations
{
    public enum LogActionType
    {
        UserLogin = 1,
        UserLogOut = 2,
        SaveAuctionSources = 3,
        SavePurchaserRoundAuctionSources = 4,
        SaveNewRoundAuction = 5,
        CloseAuctionRound = 6,
        CreateAuction = 7,
        SaveMessageLog = 8,
        SaveParams = 9,
        PurchaserSaveMaxDemand = 10,
        SavePurchaserUser = 11,
        PurchasersSaveState = 12,
        SellersSaveState = 13,
        SellerSaveSource = 14,
        SellerSave = 15,    
        LogSearch = 16,
        SuspendAuction=17
    }
}

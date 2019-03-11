using System.Collections.Generic;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Services.Models
{
    public interface INotification
    {
        AuctionDesc.Infrastructure.Models.Notification SearchNotification(AuctionDesc.Infrastructure.Models.Notification NotiObj);
        List<Message> SearchMessages(UserAutentication userobj);
    }
}
using System.Collections.Generic;
using Dataifx.AuctionDesc.Business.Clases;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Services.Models
{
    public class Notification : INotification
    {
        public AuctionDesc.Infrastructure.Models.Notification SearchNotification(AuctionDesc.Infrastructure.Models.Notification NotiObj)
        {
            return NotificationB.SearchNotification(NotiObj);
        }
        public List<Message> SearchMessages(UserAutentication userobj)
        {
            return NotificationB.SearchMessages(userobj);
        }



    }
}
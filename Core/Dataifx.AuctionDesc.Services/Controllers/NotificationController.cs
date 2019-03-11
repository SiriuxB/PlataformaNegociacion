using System;
using System.Collections.Generic;
using System.Web.Http;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Dataifx.AuctionDesc.Services.Models;
using Notification = Dataifx.AuctionDesc.Infrastructure.Models.Notification;


namespace Dataifx.AuctionDesc.Services.Controllers
{
    public class NotificationController : ApiController
    {
        private static Lazy<INotification> _Instance = new Lazy<INotification>(() => new Services.Models.Notification());

        public static INotification Instance
        {
            get
            {
                return _Instance.Value;
            }
        }
        [HttpPost]
        public Notification MessageNotification(Notification obj)
        {

            Notification user = NotificationController.Instance.SearchNotification(obj);
            return user;
        }
        [HttpPost]
        public List<Message> SearchMessages(UserAutentication obj)
        {

            List<Message> ListMessage = NotificationController.Instance.SearchMessages(obj);
            return ListMessage;
        }


    }
}
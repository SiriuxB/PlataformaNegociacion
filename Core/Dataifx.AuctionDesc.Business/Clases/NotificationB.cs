using System;
using System.Collections.Generic;
using System.Data;
using Dataifx.AuctionDesc.Data.Clases;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Business.Clases
{
    public class NotificationB
    {
        public static Notification SearchNotification(Notification NotiObj)
        {
            Notification no = new Notification();
            try
            {
                no = DataNotification.SearchNotification(NotiObj);
            }
            catch (System.Exception ex)
            {

                GasLogB.CrearLogError(ex);
            }
            
            return no;
        }
        public static List<Message> SearchMessages(UserAutentication userobj)
        {
            List<Message> MessageList = new List<Message>();
             DataTable dt = new DataTable();
            dt = DataNotification.SearchMessages(userobj);
            foreach (DataRow drFuente in dt.Rows)
            {
                Message MessageItem = new Message();
                MessageItem.Fecha = drFuente["Fecha"] == DBNull.Value ? DateTime.MinValue : Convert.ToDateTime(drFuente["Fecha"]);
                MessageItem.Mensaje = drFuente["Mensaje"] == DBNull.Value ? "" : Convert.ToString(drFuente["Mensaje"]);
                MessageItem.Remitente = drFuente["Remitente"] == DBNull.Value ? "" : Convert.ToString(drFuente["Remitente"]);
                MessageItem.Destinatario = drFuente["Destinatario"] == DBNull.Value ? "" : Convert.ToString(drFuente["Destinatario"]);
                MessageList.Add(MessageItem);
            }
            return MessageList;
        }

        
    }
}

using System;
using Microsoft.AspNet.SignalR;

namespace Dataifx.AuctionDesc.Services.RealTime
{
    //Esta es la clase que se debe usar desde afuera para notificar a todos los que esten subscritos

    public class ExternalTickerNotifier
    {
        

      
        

        //public static void BroadCastTransaction(TransactionSummarized transaction)
        //{
        //    var context = GlobalHost.ConnectionManager.GetHubContext<RealTimeHub>();
        //    context.Clients.All.updateTransaction(transaction);
        //}

        public static void BroadCastDateTime(DateTime date)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<RealTimeHub>();
            context.Clients.All.updateDateTime(date);
        }


        //public static void BroadCastTransactionMin(TransactionSummarized transaction)
        //{
        //    var context = GlobalHost.ConnectionManager.GetHubContext<RealTimeHub>();
        //    context.Clients.All.updateTransactionMin(transaction);
        //}

     


        //#region Demo 
        //public static void BroadCastTransactionDemo(TransactionSummarized transaction)
        //{
        //    var context = GlobalHost.ConnectionManager.GetHubContext<RealTimeHub>();
        //    context.Clients.Group("DemoAccount").updateTransactionDemo(transaction);
        //}

     
        //#endregion Demo
    }
}
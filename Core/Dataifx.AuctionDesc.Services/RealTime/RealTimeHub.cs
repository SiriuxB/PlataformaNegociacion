using System.Collections.Generic;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Dataifx.AuctionDesc.Services.RealTime
{
    [HubName("RealTimeHubTicker")]
    public class RealTimeHub : Hub
    {

        //public RealTimeHub() : this(RealTimeTicker.Instance) { }
        //public RealTimeHub(RealTimeTicker transactionTicker)
        //{
        //    _transactionTicker = transactionTicker;
        //}
        static Dictionary<string,string> ConnectedUsers = new Dictionary<string, string>();

        public void AddConnectionGroup(string strgroup)
        {
            ConnectedUsers.Add(Context.ConnectionId, strgroup);
            this.Groups.Add(Context.ConnectionId, strgroup);
        }

        public void RemoveConnection(string strgroup)
        {
            this.Groups.Remove(Context.ConnectionId, strgroup);
        }

        //public void StartSimulation()
        //{
        //    _transactionTicker.StartSimulation();
        //}

        //public void StopSimulation()
        //{
        //    _transactionTicker.StopSimulation();

        //}



    }




}
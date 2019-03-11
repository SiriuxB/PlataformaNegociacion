using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
namespace DataiFX.Gas.SignalR
{
    [HubName("clock")]
    public class DemoSignalR : Hub
    {
        public void Send(string name, string message)
        {
            Clients.All.broadcastMessage(name, message);

        }
        public void GetRealTime()
        {
            Clients.Caller.setRealTime(DateTime.Now.ToString("h:mm:ss tt"));
        }
    }
}
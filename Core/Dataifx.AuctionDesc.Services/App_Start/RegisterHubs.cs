using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using Microsoft.AspNet.SignalR;


//[assembly: WebActivator.PreApplicationStartMethod(typeof(Dataifx.Trading.Services.RegisterHubs), "Start")]

namespace Dataifx.Trading.Services
{
    public static class RegisterHubs
    {
        public static void Register()
        {
            // Register the default hubs route: ~/signalr/hubs
            RouteTable.Routes.MapHubs();
        }
    }
}
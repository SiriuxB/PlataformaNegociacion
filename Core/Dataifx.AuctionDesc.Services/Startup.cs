using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Dataifx.AuctionDesc.Business.Clases;
using Dataifx.AuctionDesc.Services;
using Dataifx.AuctionDesc.Services.RealTime.Gas;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using Quartz;
using Quartz.Impl;

[assembly: OwinStartup(typeof(Startup))]

namespace Dataifx.AuctionDesc.Services
{
    public class Startup
    {
      
        public void Configuration(IAppBuilder app)
        {
            GlobalHost.Configuration.DefaultMessageBufferSize = 1000;
            //app.Map("/signalr", map =>
            //{
            //    // Setup the CORS middleware to run before SignalR.
            //    // By default this will allow all origins. You can 
            //    // configure the set of origins and/or http verbs by
            //    // providing a cors options with a different policy.
            //    map.UseCors(CorsOptions.AllowAll);
            //    var hubConfiguration = new HubConfiguration
            //    {
            //        // You can enable JSONP by uncommenting line below.
            //        // JSONP requests are insecure but some older browsers (and some
            //        // versions of IE) require JSONP to work cross domain
            //        // EnableJSONP = true
            //    };
            //    // Run the SignalR pipeline. We're not using MapSignalR
            //    // since this branch already runs under the "/signalr"
            //    // path.
            //    map.RunSignalR(hubConfiguration);
            //});
            app.MapSignalR();

            EjecutarTareasProgramadas();
        }

        private static void EjecutarTareasProgramadas()
        {
            IScheduler scheduler = StdSchedulerFactory.GetDefaultScheduler();
            scheduler.Start();
            IJobDetail job = JobBuilder.Create<Jobclass>().Build();
            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity("trigger1", "group1")
                .StartNow()
                .WithCronSchedule("0 0/1 * 1/1 * ? *")
                //.WithSimpleSchedule(x => x
                //    .WithIntervalInSeconds(2)
                //    .RepeatForever())
                .Build();

            scheduler.ScheduleJob(job, trigger);
            
        }

        public class Jobclass : IJob
        {
            public int mensajeria = 0;
            public void Execute(IJobExecutionContext context)
            {
                mensajeria += 1;
              var x=  BSubasta.VerSubastaActual();
                var contextHub = GlobalHost.ConnectionManager.GetHubContext<GasHub>();
                contextHub.Clients.All.onNotificarCambioEnSubasta(x);
            }
        }

    }
}

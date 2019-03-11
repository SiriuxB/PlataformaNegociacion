using Microsoft.Owin;
using Owin;
namespace DataiFX.Gas.SignalR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
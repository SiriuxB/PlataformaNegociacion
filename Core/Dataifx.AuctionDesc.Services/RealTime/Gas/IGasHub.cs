using System.Collections.Generic;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Microsoft.AspNet.SignalR.Hubs;

namespace Dataifx.AuctionDesc.Services.RealTime.Gas
{
    public interface IGasHub : IHub
    {
        /// <summary>
        /// Evento generado cuando se suscribe un nuevo usuario a RealTime
        /// </summary>
        /// <param name="user"></param>
        GasUserHub Connect(GasUserHub user);

        /// <summary>
        /// Sesion finalizada 
        /// </summary>
        /// <param name="stopCalled"></param>
        /// <returns></returns>
        new System.Threading.Tasks.Task OnDisconnected(bool stopCalled);
        

        /// <summary>
        /// Obtiene la información de un usuario en caso de que el cliente haya perdido la sesion
        /// </summary>
        /// <param name="sessionId"></param>
        List<GasUserHub> GetConectedUsers(string sessionId);

        /// <summary>
        /// Notifica movimiento de demanda maxima en la inscripcion del Vendedor
        /// </summary>
        /// <returns></returns>
        bool NotifySellerDemand(int IdSubasta, UserAutentication objuser);


        bool NotifyPurchaserOffers(int IdSubasta, UserAutentication objuser);
    }
}

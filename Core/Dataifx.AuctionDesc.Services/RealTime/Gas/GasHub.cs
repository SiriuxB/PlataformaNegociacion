#region Header

// /*------------------------------------------------------------
//   <copyright file ="ChatHub.cs" company="DATA IFX">
//   </copyright>
//   <Summary>
//   Escriba una breve descripción
//   </Summary>
// ------------------------------------------------------------*/

#endregion

#region Dependencies

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dataifx.AuctionDesc.Business.Clases;
using Dataifx.AuctionDesc.Data.Clases;
using Dataifx.AuctionDesc.Infrastructure.Enumerations;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

#endregion

namespace Dataifx.AuctionDesc.Services.RealTime.Gas
{
    [HubName("GasHub")]
    public class GasHub : Hub, IGasHub
    {


        public static List<GasUserHub> _connectedUsers = new List<GasUserHub>();
        private bool _notifyReaded = true;
        private bool _notifyWriting = true;

        private bool _saveUsersConnected = true;
        private bool _saveUsersDisconnecteded = true;

        public override Task OnReconnected()
        {
            Console.WriteLine("OnReconnected");
            return null;
        }
        public bool MegaphonePlayers(string message, string de, string para)
        {
            var mensaje = new mensajes();
            mensaje.mensaje = message;
            mensaje.NombreUsuarioDe = de;
            mensaje.NombreUsuarioPara = para;
            var UserNameRemitent = _connectedUsers.SingleOrDefault(x => x.UserName == para);
            string NombreRemitente = "";
            var usuarioAenviar = new List<string>();
            usuarioAenviar.Add(UserNameRemitent.SessionId);
            //Clients.User(UserNameRemitent.SessionId).onMegaphonePlayers(mensaje);
            Clients.Clients(usuarioAenviar).onMegaphonePlayers(mensaje);

            return false;


        }

        private class mensajes
        {
            public string NombreUsuarioDe { get; set; }
            public string mensaje { get; set; }
            public string NombreUsuarioPara { get; set; }

        }
        public bool NotifyPurchaserRoundOffer()
        {
            Clients.Group(GasProfile.Subastador.ToString()).onNotifyPurchaserRoundOffer();
            Clients.Group(GasProfile.Comprador.ToString()).onNotifyPurchaserRoundOffer();
            return true;
        }

        public bool NotifySuspendAuction()
        {
            Clients.All.onNotifySuspendAuction();
            return true;
        }


        public bool NotifyClosingAuction()
        {
            Clients.All.onNotifyClosingAuction();
            return true;
        }

        public bool NotifyAditionalOfferAcepted()
        {
            Clients.All.onNotifyAditionalOfferAcepted();
            return true;
        }
        public bool NotifySellerDemand(int IdSubasta, UserAutentication objuser)
        {
            Auction Auctionobj = new Auction();
            Auctionobj.Id = IdSubasta;
            Auctionobj.User = objuser;
            List<Seller> sellersInfo = SellerB.SellersInfo(Auctionobj);
            Clients.All.onNotifySellerDemand(sellersInfo);
            return true;
        }
        public bool NotifyPurchaserOffers(int IdSubasta, UserAutentication objuser)
        {
            Auction Auctionobj = new Auction();
            Auctionobj.Id = IdSubasta;
            Auctionobj.User = objuser;
            List<Purchaser> purchasersInfo = PurchaserB.PurchasersInfo(Auctionobj);
            Clients.All.onNotifyPurchaserOffers(purchasersInfo);
            return true;
        }
        public bool NotificarCambioEnSubasta()
        {
            Clients.All.onNotificarCambioEnSubasta();
            return true;
        }
        public bool NotifyAprobateAuctionIngress(int IdSubasta, UserAutentication objuser)
        {
            Auction Auctionobj = new Auction();
            Auctionobj.Id = IdSubasta;
            Auctionobj.User = objuser;
            // GasUserHub user = _connectedUsers.Where(x => x.UserName == UserName ).FirstOrDefault();
            List<Purchaser> PurchaserInfo = PurchaserB.PurchasersInfo(Auctionobj);
            List<Seller> SellerrInfo = SellerB.SellersInfo(Auctionobj);
            Clients.Group(GasProfile.Subastador.ToString()).onNotifyAprobateAuctionIngressSeller(SellerrInfo);
            Clients.Group(GasProfile.Comprador.ToString()).onNotifyAprobateAuctionIngressPurchaser(PurchaserInfo);
            Clients.Group(GasProfile.Vendedor.ToString()).onNotifyAprobateAuctionIngressSeller(SellerrInfo);

            //  Clients.User(user.SessionId).afs();
            //      Clients.All.onNotifyIncriptionUpdate(AuctionInfo);
            return true;
        }

        public GasLog GetCurrentUser()
        {
            var currentUser = _connectedUsers.SingleOrDefault(x => x.SessionId == Context.ConnectionId);
            GasLog Logger = new GasLog();
            if (currentUser != null)
            {
                Logger.IdUsuario = currentUser.IdSegas;
                Logger.NombreUsuario = currentUser.Nombre;
            }
            return Logger;
        }


        public List<GasUserHub> GetConectedUsers(string sessionId)
        {

            var usersConnected = new List<GasUserHub>();
            usersConnected = _connectedUsers;

            return usersConnected;
        }

        public GasUserHub Connect(GasUserHub user)
        {
            try
            {

                user.SessionId = Context.ConnectionId;
                _connectedUsers.RemoveAll(x => x.UserName == user.UserName);
                _connectedUsers.Add(user);
                var usersConnected = new List<GasUserHub>();
                usersConnected = _connectedUsers;
                switch (user.GasProfile)
                {
                    case GasProfile.Subastador:
                        Groups.Add(Context.ConnectionId, GasProfile.Subastador.ToString());
                        break;
                    case GasProfile.Comprador:
                        Groups.Add(Context.ConnectionId, GasProfile.Comprador.ToString());
                        break;
                    case GasProfile.Vendedor:
                        Groups.Add(Context.ConnectionId, GasProfile.Vendedor.ToString());
                        break;
         
                }
                Clients.All.onNotifyConectedUser(usersConnected);
            }
            catch (Exception e)
            {

            }
            finally
            {

            }

            return user;
        }

        Task IHub.OnDisconnected(bool stopCalled)
        {
            GasUserHub user = null;
            try
            {
                user = _connectedUsers.FirstOrDefault(x => x.SessionId.Equals(Context.ConnectionId));

                _connectedUsers.Remove(user);
                return base.OnDisconnected(stopCalled);
            }
            catch (Exception e)
            {
                return null;
            }
            finally
            {
                //this.Logchat.SaveLogOutUser(user);
            }
        }

    }
}

/*
    
    cliente especifico 
    Clients.Client(Context.ConnectionId).addContosoChatMessageToPage

    clientes excepto los especificados  
    Clients.AllExcept(connectionId1, connectionId2).addContosoChatMessageToPage(name, message);

    
    emitido a todos los usuarios conectados de un grupo especifico 
    Clients.Group(groupName).addContosoChatMessageToPage(name, message);

    emitir al grupo excepto los id especificados  
    Clients.Group(groupName, connectionId1, connectionId2).addCon()

    emitir a todos los usuarios especificos en un grupo excepto el usuario que lo emite 
    Clients.OthersInGroup(groupName).addContosoChatMess()


    emitir al usuario identificado por el userid  
    Clients.User(userid).addContosoChat()

    emitir a todos los clientes y grupos en la lista de ids 
    Clients.Clients(ConnectionIds).broadcas()
     
    emitir a la lista de grupos especificados por el id 
    Clients.Groups(GroupIds).broadc()

    emitir por el username 
    Clients.Client(username).broadc()

    emitir a una lista de usuarios (signalr 2.1)
    Clients.Users(new string[] { "myUser", "myUser2" }).broadc




*/

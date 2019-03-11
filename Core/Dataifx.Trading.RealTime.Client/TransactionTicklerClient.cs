using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Client;
using Microsoft.AspNet.SignalR.Client.Hubs;
//using Dataifx.Trading.Infrastructure.Util;
using System.Configuration;


namespace Dataifx.Trading.RealTime.Client
{
    public class TransactionTicklerClient
    {
        //private readonly static Lazy<TransactionTicklerClient> _instance = new Lazy<TransactionTicklerClient>(() => new TransactionTicklerClient());
        //private TransactionTicklerClientState _state = TransactionTicklerClientState.unsubscribed;
        //public IHubProxy _RealTimeTicker;
        ////public event EventHandler<EventArgs<Exception>> ErrorEventHandler;
        ////public event EventHandler<EventArgs<string>> ConnectionStateEventHandler;
        //HubConnection hubConnection = new HubConnection(ConfigurationManager.AppSettings["Service"].ToString());
        ////HubConnection hubConnection = new HubConnection("http://localhost/Dataifx.Trading.Services/");

        //public ConnectionState StateConection { get; set; }

        //private TransactionTicklerClient()
        //{
        //    _RealTimeTicker = hubConnection.CreateHubProxy("RealTimeHubTicker");
        //    hubConnection.StateChanged += hubConnection_StateChanged;
        // //   hubConnection.Error += hubConnection_Error;
        //}

        //void hubConnection_StateChanged(StateChange obj)
        //{

        //    StateConection = hubConnection.State;
        //    RaiseConnectionStateEvent(this, new EventArgs<string>(hubConnection.State.ToString()));
        //    //if (hubConnection.State == ConnectionState.Disconnected)
        //    //    hubConnection.Start().Wait();
        //}


        //void hubConnection_Error(Exception obj)
        //{
        //    RaiseErrorEvent(this, new EventArgs<Exception>(obj));
        //}

        //private void RaiseErrorEvent(object sender, EventArgs<Exception> args)
        //{
        //    var handler = ErrorEventHandler;
        //    if (handler != null)
        //        handler(this, args);
        //}

        //private void RaiseConnectionStateEvent(object sender, EventArgs<string> args)
        //{
        //    var handler = ConnectionStateEventHandler;
        //    if (handler != null)
        //        handler(this, args);
        //}

        //private static string _group;
        //public static string Group
        //{
        //    get { return _group; }
        //    set { _group = value; }
        //}

        //public static TransactionTicklerClient Instance
        //{
        //    get
        //    {
        //        return _instance.Value;
        //    }
        //}


        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
        //public void Subscribe(Action<TransactionSummarized> onData)
        //{            
        //    _RealTimeTicker.On("updateTransaction", onData);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}
        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
        //public void SubscribeMin(Action<TransactionSummarized> onData)
        //{
        //    _RealTimeTicker.On("updateTransactionMin", onData);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}

        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
      

        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
        //public void SubscribeNotifyOrder(Action<Order> onData)
        //{
        //    _RealTimeTicker.On("notifyOrder", onData);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}
        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
        //public void SubscribeNotifyUpdateOrder(Action<Order> onData)
        //{
        //    _RealTimeTicker.On("notifyUpdateOrder", onData);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}
        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
        //public void SubscribeNotifyReplaceOrder(Action<Order> onData)
        //{
        //    _RealTimeTicker.On("notifyReplaceOrder", onData);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}
        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
        //public void SubscribeNotifyComplementadaOrder(Action<Order> onData)
        //{
        //    _RealTimeTicker.On("notifyComplementadaOrder", onData);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}

        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
        //public void SubscribeNotifyOrderCancel(Action<Order> onData)
        //{
        //    _RealTimeTicker.On("notifyOrdercancel", onData);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}
        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
        //public void SubscribeNotifyNews(Action<News> onData)
        //{
        //    _RealTimeTicker.On("notifynews", onData);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}
        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>

        //public void SubscribeNotifyIndicators(Action<Indicators> onData)
        //{
        //    _RealTimeTicker.On("notifyIndicator", onData);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}

        /// <summary>
        ///  Real Time Subscription 
        /// </summary>
        /// <param name="_bidoffer"></param>

        /// <summary>
        ///  Real Time Subscription 
        /// </summary>
        /// <param name="_bidoffer"></param>
        //public void SubscribeNotifyDisconnected(Action onDisconnected)
        //{
        //    _RealTimeTicker.On("notifyDisconnection", onDisconnected);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}
        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
        //public void SubscribeNotifyDisconnectedAdmin(Action onDisconnected)
        //{
        //    _RealTimeTicker.On("notifyDisconnectionAdmin", onDisconnected);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}
        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
        //public void AddConnectionGroup(string strGroup)
        //{
        //    Group = strGroup;
        //    _RealTimeTicker.Invoke("AddConnectionGroup", new object[] { strGroup });
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}
        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
     
        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
        //public void SubscribeDateTimeServer(Action<DateTime> onData)
        //{
        //    _RealTimeTicker.On("updateDateTime", onData);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}

        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>
        //public void StartConnection()
        //{
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}

        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>    
        //public void StartSimulation()
        //{
        //    _RealTimeTicker.Invoke("StartSimulation");
        //}
        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>   
        //public void StopSimulation()
        //{
        //    _RealTimeTicker.Invoke("StopSimulation");
        //}
        ///// <summary>
        /////  Real Time Subscription 
        ///// </summary>
        ///// <param name="_bidoffer"></param>   
        //public void SubscribeNotifyUpdateInfo(Action<string> onData)
        //{
        //    _RealTimeTicker.On("notifyUpdateInfo", onData);
        //    if (hubConnection.State != ConnectionState.Connected)
        //        hubConnection.Start().Wait();
        //}

    }

    public enum TransactionTicklerClientState
    {
        subscribed,
        unsubscribed
    }
}

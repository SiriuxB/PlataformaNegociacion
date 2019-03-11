using Newtonsoft.Json;
using SuperSocket.ClientEngine;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Threading;
using WebSocket4Net;

namespace Dataifx.Trading.RealTime.Client
{
    public class DataServerClient
    {
        private readonly static Lazy<DataServerClient> _instance = new Lazy<DataServerClient>(() => new DataServerClient());
        WebSocket4Net.WebSocket websocket;

        private readonly Queue<string> m_InMessagesTrade = new Queue<string>();
        private readonly Queue<string> m_InMessagesIndex = new Queue<string>();
        private readonly Queue<string> m_InMessagesQuote = new Queue<string>();
        private readonly Queue<string> m_InMessagesPrice = new Queue<string>();
        private readonly Queue<string> m_InMessagesLevel2 = new Queue<string>();

        private readonly Queue<string> m_InMessagesTradeClosingDay = new Queue<string>();

        public Action<LoginResponse> onLogin;
        public Action<NewTradeResponse> onMessageTrade;
        public Action<NewIndexResponse> onMessageIndex;
        public Action<NewTickResponse> onMessageQuote;
        public Action<NewPriceResponse> onMessagePrice;
        public Action<HistoryL2Response> onMessageLevel2;
        public Action<EventArgs> onSendLogin;

        public Action<NewTradeClosingDayResponse> onMessageTradeClosingDay;

        private DataServerClient()
        {
            websocket = new WebSocket4Net.WebSocket(ConfigurationManager.AppSettings["WebSocketUri"].ToString());
            websocket.Opened += new EventHandler(websocket_Opened);
            websocket.Error += new EventHandler<ErrorEventArgs>(websocket_Error);
            websocket.Closed += new EventHandler(websocket_Closed);
            websocket.MessageReceived += Websocket_MessageReceived;
            websocket.Open();
        }

        public static DataServerClient Instance
        {
            get
            {
                return _instance.Value;
            }
        }

        public void sendMessage(string aValue)
        {
            websocket.Send(aValue);
        }

      
      

        private void Websocket_MessageReceived(object sender, MessageReceivedEventArgs e)
        {
            Response aBaseTypeReq = JsonConvert.DeserializeObject<Response>(e.Message);

            if (aBaseTypeReq.MsgType == typeof(NewTradeResponse).Name)
            {
                lock (m_InMessagesTrade)
                {
                    m_InMessagesTrade.Enqueue(e.Message);
                    if (m_InMessagesTrade.Count == 1)
                        ThreadPool.QueueUserWorkItem(o => ThreadFunc_RequestWorkerTrade());
                }
            }
            else if (aBaseTypeReq.MsgType == typeof(NewTickResponse).Name)
            {
                lock (m_InMessagesQuote)
                {
                    m_InMessagesQuote.Enqueue(e.Message);
                    if (m_InMessagesQuote.Count == 1)
                        ThreadPool.QueueUserWorkItem(o => ThreadFunc_RequestWorkerQuote());
                }
            }
            else if (aBaseTypeReq.MsgType == typeof(NewIndexResponse).Name)
            {
                lock (m_InMessagesIndex)
                {
                    m_InMessagesIndex.Enqueue(e.Message);
                    if (m_InMessagesIndex.Count == 1)
                        ThreadPool.QueueUserWorkItem(o => ThreadFunc_RequestWorkerIndex());
                }
            }
            else if (aBaseTypeReq.MsgType == typeof(NewPriceResponse).Name)
            {
                lock (m_InMessagesPrice)
                {
                    m_InMessagesPrice.Enqueue(e.Message);
                    if (m_InMessagesPrice.Count == 1)
                        ThreadPool.QueueUserWorkItem(o => ThreadFunc_RequestWorkerPrice());
                }
            }
            else if (aBaseTypeReq.MsgType == typeof(HistoryL2Response).Name)
            {
                lock (m_InMessagesLevel2)
                {
                    m_InMessagesLevel2.Enqueue(e.Message);
                    if (m_InMessagesLevel2.Count == 1)
                        ThreadPool.QueueUserWorkItem(o => ThreadFunc_RequestWorkerLevel2());
                }
            }
            else if (aBaseTypeReq.MsgType == typeof(LoginResponse).Name)
            {
                LoginResponse aNewRequest = JsonConvert.DeserializeObject<LoginResponse>(e.Message);
                onLogin(aNewRequest);
            }
            else if (aBaseTypeReq.MsgType == typeof(NewTradeClosingDayResponse).Name)
            {
                lock (m_InMessagesTradeClosingDay)
                {
                    m_InMessagesTradeClosingDay.Enqueue(e.Message);
                    if (m_InMessagesTradeClosingDay.Count == 1)
                        ThreadPool.QueueUserWorkItem(o => ThreadFunc_RequestWorkerTradeClosingDay());
                }
            }
        }

        private void ThreadFunc_RequestWorkerTrade()
        {
            bool bContinue = true;

            while (bContinue)
            {
                string aRequest = null;

                try
                {
                    lock (m_InMessagesTrade)
                    {
                        if (m_InMessagesTrade.Count > 0)
                        {
                            aRequest = m_InMessagesTrade.Peek();
                        }
                    }
                    if (aRequest == null)
                        break;

                    try
                    {
                        NewTradeResponse aNewRequest = JsonConvert.DeserializeObject<NewTradeResponse>(aRequest);
                        onMessageTrade(aNewRequest);
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                    finally
                    {
                        lock (m_InMessagesTrade)
                        {
                            if (m_InMessagesTrade.Count > 0)
                                m_InMessagesTrade.Dequeue();

                            if (m_InMessagesTrade.Count == 0)
                                bContinue = false;
                        }
                    }
                }
                catch (Exception e)
                {
                    try
                    {
                       
                    }
                    catch
                    {
                    }
                }
            }
        }

        private void ThreadFunc_RequestWorkerTradeClosingDay()
        {
            bool bContinue = true;

            while (bContinue)
            {
                string aRequest = null;

                try
                {
                    lock (m_InMessagesTradeClosingDay)
                    {
                        if (m_InMessagesTradeClosingDay.Count > 0)
                        {
                            aRequest = m_InMessagesTradeClosingDay.Peek();
                        }
                    }
                    if (aRequest == null)
                        break;

                    try
                    {
                        NewTradeClosingDayResponse aNewRequest = JsonConvert.DeserializeObject<NewTradeClosingDayResponse>(aRequest);
                        onMessageTradeClosingDay(aNewRequest);
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                    finally
                    {
                        lock (m_InMessagesTradeClosingDay)
                        {
                            if (m_InMessagesTradeClosingDay.Count > 0)
                                m_InMessagesTradeClosingDay.Dequeue();

                            if (m_InMessagesTradeClosingDay.Count == 0)
                                bContinue = false;
                        }
                    }
                }
                catch (Exception e)
                {
                    try
                    {

                    }
                    catch
                    {
                    }
                }
            }
        }

        private void ThreadFunc_RequestWorkerQuote()
        {
            bool bContinue = true;

            while (bContinue)
            {
                string aRequest = null;

                try
                {
                    lock (m_InMessagesQuote)
                    {
                        if (m_InMessagesQuote.Count > 0)
                        {
                            aRequest = m_InMessagesQuote.Peek();
                        }
                    }
                    if (aRequest == null)
                        break;

                    try
                    {
                        NewTickResponse aNewRequest = JsonConvert.DeserializeObject<NewTickResponse>(aRequest);
                        onMessageQuote(aNewRequest);
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                    finally
                    {
                        lock (m_InMessagesQuote)
                        {
                            if (m_InMessagesQuote.Count > 0)
                                m_InMessagesQuote.Dequeue();

                            if (m_InMessagesQuote.Count == 0)
                                bContinue = false;
                        }
                    }
                }
                catch (Exception e)
                {
                    
                    try
                    {
                       
                    }
                    catch
                    {
                    }
                }
            }
        }

        private void ThreadFunc_RequestWorkerIndex()
        {
            bool bContinue = true;

            while (bContinue)
            {
                string aRequest = null;

                try
                {
                    lock (m_InMessagesIndex)
                    {
                        if (m_InMessagesIndex.Count > 0)
                        {
                            aRequest = m_InMessagesIndex.Peek();
                        }
                    }
                    if (aRequest == null)
                        break;

                    try
                    {
                        NewIndexResponse aNewRequest = JsonConvert.DeserializeObject<NewIndexResponse>(aRequest);
                        onMessageIndex(aNewRequest);
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                    finally
                    {
                        lock (m_InMessagesIndex)
                        {
                            if (m_InMessagesIndex.Count > 0)
                                m_InMessagesIndex.Dequeue();

                            if (m_InMessagesIndex.Count == 0)
                                bContinue = false;
                        }
                    }
                }
                catch (Exception e)
                {
                    
                    try
                    {
                      
                    }
                    catch
                    {
                    }
                }
            }
        }

        private void ThreadFunc_RequestWorkerPrice()
        {
            bool bContinue = true;

            while (bContinue)
            {
                string aRequest = null;

                try
                {
                    lock (m_InMessagesPrice)
                    {
                        if (m_InMessagesPrice.Count > 0)
                        {
                            aRequest = m_InMessagesPrice.Peek();
                        }
                    }
                    if (aRequest == null)
                        break;

                    try
                    {
                        NewPriceResponse aNewRequest = JsonConvert.DeserializeObject<NewPriceResponse>(aRequest);
                        onMessagePrice(aNewRequest);
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                    finally
                    {
                        lock (m_InMessagesPrice)
                        {
                            if (m_InMessagesPrice.Count > 0)
                                m_InMessagesPrice.Dequeue();

                            if (m_InMessagesPrice.Count == 0)
                                bContinue = false;
                        }
                    }
                }
                catch (Exception e)
                {
                    
                    try
                    {
                      
                    }
                    catch
                    {
                    }
                }
            }
        }

        private void ThreadFunc_RequestWorkerLevel2()
        {
            bool bContinue = true;

            while (bContinue)
            {
                string aRequest = null;

                try
                {
                    lock (m_InMessagesLevel2)
                    {
                        if (m_InMessagesLevel2.Count > 0)
                        {
                            aRequest = m_InMessagesLevel2.Peek();
                        }
                    }
                    if (aRequest == null)
                        break;

                    try
                    {
                        HistoryL2Response aNewRequest = JsonConvert.DeserializeObject<HistoryL2Response>(aRequest);
                        onMessageLevel2(aNewRequest);
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                    finally
                    {
                        lock (m_InMessagesLevel2)
                        {
                            if (m_InMessagesLevel2.Count > 0)
                                m_InMessagesLevel2.Dequeue();

                            if (m_InMessagesLevel2.Count == 0)
                                bContinue = false;
                        }
                    }
                }
                catch (Exception e)
                {
                    try
                    {

                    }
                    catch
                    {
                    }
                }
            }
        }

        private void websocket_Closed(object sender, EventArgs e)
        {
            
        }

        private void websocket_Error(object sender, ErrorEventArgs e)
        {
           
        }

        private void websocket_Opened(object sender, EventArgs e)
        {
            onSendLogin(e);
        }
    }
}

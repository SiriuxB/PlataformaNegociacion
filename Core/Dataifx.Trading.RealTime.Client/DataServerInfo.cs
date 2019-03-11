using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dataifx.Trading.RealTime.Client
{

    public class ExchangeInfo
    {
        public string Name;
        public List<SymbolInfo> Symbols;
    }

    public class SymbolInfo
    {
        public string Name;
        public string Company;
    }

    [JsonObject]
    public class SymbolItem
    {
        [JsonProperty]
        public string DataFeed { get; set; }
        [JsonProperty]
        public string Exchange { get; set; }
        [JsonProperty]
        public string Symbol { get; set; }
        [JsonProperty]
        public int Type { get; set; }
    }

    [JsonObject]
    public class HistoryParameters
    {
        [JsonProperty]
        public string Id { get; set; }
        [JsonProperty]
        public SymbolItem Symbol { get; set; }

        [JsonProperty]
        public int Interval { get; set; }
        [JsonProperty]
        public int BarsCount { get; set; }
        [JsonProperty]
        public DateTime From { get; set; }
        [JsonProperty]
        public DateTime To { get; set; }
    }

    [JsonObject]
    public class HistoryL2Parameters
    {
        /// <summary>
        /// request id
        /// </summary>
        [JsonProperty]
        public string Id { get; set; }
        /// <summary>
        /// symbol name
        /// </summary>
        [JsonProperty]
        public SymbolItem Symbol { get; set; }
        /// <summary>
        /// bar's count
        /// </summary>
        [JsonProperty]
        public int BarsCount { get; set; }
    }

    /// <summary>
    /// represents historical bar's
    /// </summary>
    [JsonObject]
    public class HistoryL2Response
    {
        /// <summary>
        /// ID, that was specified in historical request
        /// </summary>
        [JsonProperty]
        public string ID { get; set; }

        /// <summary>
        /// list of bars
        /// </summary>
        [JsonProperty]
        public Level2Data Bars { get; set; }
    }

    [JsonObject]
    public class Bar
    {
        [JsonProperty]
        [JsonConverter(typeof(JavaScriptDateTimeConverter))]
        public DateTime Date { get; set; }
        [JsonProperty]
        public double Open { get; set; }
        [JsonProperty]
        public double High { get; set; }
        [JsonProperty]
        public double Low { get; set; }
        [JsonProperty]
        public double Close { get; set; }
        [JsonProperty]
        public double Volume { get; set; }
    }


    /// <summary>
    /// represents bar info
    /// </summary>
    [JsonObject]
    public class PriceMarket
    {
        [JsonProperty]
        public SymbolItem Symbol { get; set; }

        [JsonProperty]
        public string TradingSession { get; set; }

        [JsonProperty]
        public double High { get; set; }

        [JsonProperty]
        public double Low { get; set; }

        [JsonProperty]
        public double Last { get; set; }

        [JsonProperty]
        public double Indicative { get; set; }
        [JsonProperty]
        public double Total { get; set; }

        [JsonProperty]
        public double Reference { get; set; }
        [JsonProperty]
        public string SecurityTradingStatus { get; set; }

        [JsonProperty]
        public double Close { get; set; }
        [JsonProperty]
        public double Average { get; set; }

        [JsonProperty]
        public double Change { get; set; }

        [JsonProperty]
        public double Variation { get; set; }

        [JsonProperty]
        public double SizeTrade { get; set; }

        [JsonProperty]
        public double LimitHigh { get; set; }

        [JsonProperty]
        public double LimitLow { get; set; }

        [JsonProperty]
        public string Statistics { get; set; }
    }

    [JsonObject]
    public class Tick
    {
        [JsonProperty]
        public SymbolItem Symbol { get; set; }
        [JsonProperty]
        [JsonConverter(typeof(JavaScriptDateTimeConverter))]
        public DateTime Date { get; set; }
        [JsonProperty]
        public double Price { get; set; }
        [JsonProperty]
        public double Volume { get; set; }
        [JsonProperty]
        public double Bid { get; set; }
        [JsonProperty]
        public double BidSize { get; set; }
        [JsonProperty]
        public double Ask { get; set; }
        [JsonProperty]
        public double AskSize { get; set; }
        [JsonProperty]
        public string Id { get; set; }

        [JsonProperty]
        public int TypeId { get; set; }

        [JsonProperty]
        public int Position { get; set; }

        [JsonProperty]
        public string UserTrader { get; set; }

        [JsonProperty]
        public int UpdateAction { get; set; }
    }

    /// <summary>
    /// represents bar info
    /// </summary>
    [JsonObject]
    public class Trade
    {
        [JsonProperty]
        public SymbolItem Symbol { get; set; }
        [JsonProperty]
        [JsonConverter(typeof(JavaScriptDateTimeConverter))]
        public DateTime Date { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [JsonProperty]
        public double Price { get; set; }

        /// <summary>
        /// volume
        /// </summary>
        [JsonProperty]
        public double Volume { get; set; }

        [JsonProperty]
        public double Last { get; set; }
        [JsonProperty]
        public string Id { get; set; }

    }


    [JsonObject]
    public class Level2Data
    {
        [JsonProperty]
        public SymbolItem Symbol { get; set; }

        [JsonProperty]
        public IList<Level2Item> Bids { get; set; }

        [JsonProperty]
        public IList<Level2Item> Asks { get; set; }
    }

    [JsonObject]
    public class Level2Item
    {
        [JsonProperty]
        public string MarketMaker { get; set; }

        [JsonProperty]
        public string Id { get; set; }

        [JsonProperty]
        public double Price { get; set; }

        [JsonProperty]
        public int Quantity { get; set; }

        [JsonConverter(typeof(JavaScriptDateTimeConverter))]
        public DateTime Date { get; set; }
    }

    public class DataFeed
    {
        public string Name { get; set; }
        public List<ExchangeInfo> Markets { get; set; }
    }

    [JsonObject(MemberSerialization.OptIn)]
    public class Request
    {
        [JsonProperty]
        public string MsgType { get; set; }

        public Request()
        {
            this.MsgType = this.GetType().Name;
        }
    }

    [JsonObject(MemberSerialization.OptIn)]
    public class Response
    {
        [JsonProperty]
        public string MsgType { get; set; }

        public Response()
        {
            this.MsgType = this.GetType().Name;
        }
    }

    [JsonObject]
    public class HistoryResponse : Response
    {
        [JsonProperty]
        public string ID { get; set; }

        [JsonProperty]
        public List<Bar> Bars { get; set; }
    }

    [JsonObject]
    public class LoginRequest : Request
    {
        [JsonProperty]
        public string Login { get; set; }
        [JsonProperty]
        public string Password { get; set; }

        public LoginRequest()
        {
        }

        public LoginRequest(string aLogin, string aPassword)
        {
            this.Login = aLogin;
            this.Password = aPassword;
        }
    }

    [JsonObject]
    public class LogoutRequest : Request
    {
        public LogoutRequest()
        {
        }
    }

    [JsonObject]
    public class SubscribeRequest : Request
    {
        public SubscribeRequest(SymbolItem aSymbol)
        {
            this.Symbol = aSymbol;
        }

        [JsonProperty]
        public SymbolItem Symbol { get; set; }
    }

    [JsonObject]
    public class UnsubscribeRequest : Request
    {
        [JsonProperty]
        public SymbolItem Symbol { get; set; }

        public UnsubscribeRequest(SymbolItem aSymbol)
        {
            Symbol = aSymbol;
        }
    }

    [JsonObject]
    public class TradeSubscribeRequest : Request
    {
        public TradeSubscribeRequest(SymbolItem aSymbol)
        {
            this.Symbol = aSymbol;
        }

        [JsonProperty]
        public SymbolItem Symbol { get; set; }
    }

    [JsonObject]
    public class TradeClosingDaySubscribeRequest : Request
    {
        public TradeClosingDaySubscribeRequest(SymbolItem aSymbol)
        {
            this.Symbol = aSymbol;
        }

        [JsonProperty]
        public SymbolItem Symbol { get; set; }
    }

    [JsonObject]
    public class TradeUnsubscribeRequest : Request
    {
        [JsonProperty]
        public SymbolItem Symbol { get; set; }

        public TradeUnsubscribeRequest(SymbolItem aSymbol)
        {
            Symbol = aSymbol;
        }
    }

    [JsonObject]
    public class IndexSubscribeRequest : Request
    {
        public IndexSubscribeRequest(SymbolItem aSymbol)
        {
            this.Symbol = aSymbol;
        }
        [JsonProperty]
        public SymbolItem Symbol { get; set; }
    }

    [JsonObject]
    public class IndexUnsubscribeRequest : Request
    {


        [JsonProperty]
        public SymbolItem Symbol { get; set; }

        public IndexUnsubscribeRequest(SymbolItem aSymbol)
        {
            Symbol = aSymbol;
        }
    }

    [JsonObject]
    public class PriceSubscribeRequest : Request
    {
        public PriceSubscribeRequest(SymbolItem aSymbol)
        {
            this.Symbol = aSymbol;
        }

        [JsonProperty]
        public SymbolItem Symbol { get; set; }
    }

    [JsonObject]
    public class PriceUnsubscribeRequest : Request
    {
        [JsonProperty]
        public SymbolItem Symbol { get; set; }

        public PriceUnsubscribeRequest(SymbolItem aSymbol)
        {
            Symbol = aSymbol;
        }
    }

    [JsonObject]
    public class L2SubscribeRequest : Request
    {
        [JsonProperty]
        public SymbolItem Symbol { get; set; }

        public L2SubscribeRequest(SymbolItem aSymbol)
        {
            Symbol = aSymbol;
        }
    }

    [JsonObject]
    public class L2UnsubscribeRequest : Request
    {
        [JsonProperty]
        public SymbolItem Symbol { get; set; }

        public L2UnsubscribeRequest(SymbolItem aSymbol)
        {
            Symbol = aSymbol;
        }
    }

    [JsonObject]
    public class HistoryRequest : Request
    {
        public HistoryRequest()
        {
        }

        [JsonProperty]
        public HistoryParameters Selection { get; set; }
    }


    /// <summary>
    /// historical bars request
    /// </summary>
    [JsonObject]
    public class HistoryL2Request : Request
    {
        /// <summary>
        /// request parameters
        /// </summary>
        [JsonProperty]
        public HistoryL2Parameters Selection { get; set; }

        public HistoryL2Request()
        {

        }
    }
    [JsonObject]
    public class LoginResponse : Response
    {
        [JsonProperty]
        public string Login { get; set; }

        public LoginResponse(string aLogin)
        {
            this.Login = aLogin;
        }
    }

    [JsonObject]
    public class ErrorResponse : Response
    {
        [JsonProperty]
        public string Reason { get; set; }

        public ErrorResponse(string msg)
        {
            this.Reason = msg;
        }
    }

    [JsonObject]
    public class NewTickResponse : Response
    {
        [JsonProperty]
        public List<Tick> Tick { get; set; }
    }

    [JsonObject]
    public class L2SubscribeResponse : Response
    {
        [JsonProperty]
        public Level2Data Level2 { get; set; }
    }

    [JsonObject]
    public class NewTradeResponse : Response
    {
        [JsonProperty]
        public List<Trade> Trade { get; set; }
    }

    [JsonObject]
    public class NewIndexResponse : Response
    {
        [JsonProperty]
        public List<Tick> Tick { get; set; }
    }

    [JsonObject]
    public class NewPriceResponse : Response
    {
        [JsonProperty]
        public List<PriceMarket> Tick { get; set; }
    }

    [JsonObject]
    public class NewTradeClosingDayResponse : Response
    {
        [JsonProperty]
        public List<Trade> Trade { get; set; }
    }

}

using System;
using Dataifx.AuctionDesc.Infrastructure.Enumerations;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    public class ChatMessage
    {
        public string Id { get; set; }
        public string Body { get; set; }
        public DateTime SendDate { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public MessageStatus StateMessage { get; set; }

        public ChatMessageType ChatMessageType { get; set; }


    }
}

using System;

namespace Dataifx.AuctionDesc.Infrastructure.Modulus
{
    public class Trade
    {
        public virtual decimal Close { get; set; }
        public virtual DateTime Date { get; set; }
        public virtual decimal High { get; set; }
        public virtual decimal Low { get; set; }
        public virtual string Mnemonic { get; set; }
        public virtual decimal Open { get; set; }
        public virtual long Quantity { get; set; }
        public virtual decimal Volume { get; set; }
        public virtual decimal Variation { get; set; }
    }
}

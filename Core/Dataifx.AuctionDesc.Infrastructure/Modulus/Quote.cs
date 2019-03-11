using System;

namespace Dataifx.AuctionDesc.Infrastructure.Modulus
{
    public class Quote
    {
        public virtual DateTime Date { get; set; }
        public virtual string Symbol { get; set; }
        public virtual decimal Price { get; set; }
        public virtual long Quantity { get; set; }
        public virtual int Position { get; set; }
        public virtual int Type { get; set; }
    }
}

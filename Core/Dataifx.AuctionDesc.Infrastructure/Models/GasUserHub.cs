using Dataifx.AuctionDesc.Infrastructure.Enumerations;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    public class GasUserHub
    {
        public string SessionId { get; set; }
        public int  IdSegas { get; set; }
        public string UserName { get; set; }
        public GasProfile GasProfile { get; set; }
        public string Nombre { get; set; }
        public virtual UserAutentication User
        {
            get;
            set;
        }

    }
}

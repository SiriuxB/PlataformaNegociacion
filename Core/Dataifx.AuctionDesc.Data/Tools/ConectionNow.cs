using System.Configuration;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Data.Tools
{
    public class ConectionNow
    {
        public static string BuildConection(UserAutentication userObj)
        {
            var ConectStr = ConfigurationSettings.AppSettings["ConectionAuction"];
            ConectStr = ConectStr.Replace("USER", userObj.username);//testgas1
            ConectStr = ConectStr.Replace("PASS", userObj.password);//test12345
            return ConectStr; //  Database dbeAuction = DatabaseFactory.CreateDatabase(a);
        }
    }
}

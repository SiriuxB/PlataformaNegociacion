

using System;

namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    public class Token
    {

        public virtual string IdUser
        {
            get;
            set;
        }
        public virtual string UserName
        {
            get;
            set;
        }

        public virtual string Password
        { get;
            set; }
        public virtual string AuthToken
        {
            get;
            set;
        }

        public virtual DateTime IssuedOn
        {
            get; set;

        }

        public virtual DateTime ExpiredOn
        {
            get; set;

        }


    }
}

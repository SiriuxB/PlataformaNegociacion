namespace Dataifx.AuctionDesc.Infrastructure.Models
{
    public class Error
    {
        public virtual bool existError
        {
            get;
            set;
        }

        public string Description
        {
            get;
            set;
        }

        public virtual int Code
        {
            get;
            set;
        }



    }
}

using System;
using System.Collections.Generic;
using System.Web.Http;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Dataifx.AuctionDesc.Services.Models;
using Params = Dataifx.AuctionDesc.Infrastructure.Models.Params;

namespace Dataifx.AuctionDesc.Services.Controllers
{
    public class ParamsController : ApiController
    {
        private static Lazy<IParams> _Instance = new Lazy<IParams>(() => new Services.Models.Params());
        public static IParams Instance
        {
            get
            {
                return _Instance.Value;
            }
        }
        [HttpPost]
        public List<Params> SearchParams(Params paramdsobj)
        {

            List<Params> Params = ParamsController.Instance.SearchParams(paramdsobj);
            return Params;
        }

        public bool SaveParams(List<Params> listParamsObj)
        {
            bool Params = ParamsController.Instance.SaveParams(listParamsObj);

            return true;
        }

        //public DateTime NowTime()
        //{
        //    DateTime localDate = DateTime.Now;
        //    return localDate;
        //}
        [HttpGet]
        public Hora NowTime()
        {
            DateTime Params = ParamsController.Instance.GetBDTime();
            var x = new Hora();
            x.HoraActual = Params;
            x.EstadoPeticionOK = true;
            return x;
        }

        public class Hora : EntidadBase
        {
            public DateTime HoraActual { get; set; }
        }

    }
}
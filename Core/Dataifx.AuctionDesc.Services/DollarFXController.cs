using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Dataifx.Trading.Infrastructure.Models;
using Dataifx.Trading.Services.Models;
using Dataifx.Trading.CommonObjects;

namespace Dataifx.Trading.Services.Controllers
{
    public class DollarFXController : ApiController
    {
        static readonly ILastDollarBidOffer MyLastDollar = new LastDollarBidOffer();
        [HttpGet]
        [HttpPost]
        public DollarBidOffer GetDollarBidOffer(AutenticationRequest objUser)
        {
            InfoUsuario MyUser = new InfoUsuario(objUser.strIdUser);
           
            return MyLastDollar.GetLastDollaBidOffer(MyUser);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Web.Http;
using Dataifx.AuctionDesc.Business.Clases;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Dataifx.AuctionDesc.Services.Models;
using Dataifx.AuctionDesc.Services.RealTime.Gas;
using Microsoft.AspNet.SignalR;
using Auction = Dataifx.AuctionDesc.Infrastructure.Models.Auction;
using Purchaser = Dataifx.AuctionDesc.Infrastructure.Models.Purchaser;

namespace Dataifx.AuctionDesc.Services.Controllers
{
    public class SubastaController : ApiController
    {





        [HttpPost]
        public Subasta CrearSubasta(Subasta entidad)
        {

            var context = GlobalHost.ConnectionManager.GetHubContext<GasHub>();
            Subasta Auction = BSubasta.CrearSubasta(entidad);
            context.Clients.All.onNotificarCambioEnSubasta();

            return Auction;
        }
        [HttpPost]
        public Ronda CrearRonda(Ronda entidad)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<GasHub>();
            entidad = BSubasta.CrearRonda(entidad);
            context.Clients.All.onNotificarCambioEnSubasta();
            context.Clients.All.onNotificarNuevaRonda(entidad);

            return entidad;
        }

        [HttpPost]
        public Ronda CancelarRonda(Ronda entidad)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<GasHub>();
            entidad = BSubasta.CancelarRonda(entidad);
            context.Clients.All.onNotificarCambioEnSubasta();
            return entidad;
        }


        [HttpPost]
        public Ronda TerminarRonda(Ronda entidad)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<GasHub>();
            entidad = BSubasta.TerminarRonda(entidad);
            context.Clients.All.onNotificarCambioEnSubasta(entidad);
            return entidad;
        }



        [HttpPut]
        public Subasta CancelarSubastas()
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<GasHub>();

            Subasta Auction = BSubasta.CancelarSubastas();
            context.Clients.All.onNotificarCambioEnSubasta();
            context.Clients.All.onNotificarSubastaCancelada();
            return Auction;
        }

        [HttpGet]
        public Subasta VerSubastaActual()
        {

            Subasta Auction = BSubasta.VerSubastaActual();
            return Auction;
        }

        [HttpPost]
        public Vendedor GuardarVendedor(Vendedor entidad)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<GasHub>();

            entidad = BSubasta.GuardarVendedor(entidad);
            context.Clients.All.onNotificarCambioEnSubasta();
            return entidad;
        }


        [HttpPost]
        public Vendedor VerVendedor(Vendedor entidad)
        {
            entidad = BSubasta.VerVendedor(entidad);
            return entidad;
        }


        [HttpPost]
        public Comprador GuardarComprador(Comprador entidad)
        {

            entidad = BSubasta.GuardarComprador(entidad);
            return entidad;
        }


        [HttpPost]
        public Comprador VerComprador(Comprador entidad)
        {
            entidad = BSubasta.VerComprador(entidad);
            return entidad;
        }


        [HttpPost]
        public Demanda GuardarDemanda(Demanda entidad)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<GasHub>();
            entidad = BSubasta.GuardarDemanda(entidad);
            context.Clients.All.onNotificarDemandaComprador(entidad);
            if (entidad.NotificarCierreSubasta)
            {
                context.Clients.All.onNotificarCambioEnSubasta();
            }
            return entidad;
        }

        [HttpPost]
        public Demanda VerDemanda(Demanda entidad)
        {
            entidad = BSubasta.VerDemanda(entidad);
            return entidad;
        }


        [HttpPost]
        public List<Demanda> VerHistorialDemandas(Demanda entidad)
        {
            return BSubasta.VerHistorialDemandas(entidad);
        }


        [HttpPost]
        public List<Demanda> VerHistorialGeneralDemandas(Demanda entidad)
        {
            return BSubasta.VerHistorialGeneralDemandas(entidad);
        }

        [HttpPost]
        public Subasta ClausurarSubasta(Subasta entidad)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<GasHub>();
            entidad = BSubasta.ClausurarSubasta(entidad);
            context.Clients.All.onNotificarSubastaClausurada();
            return entidad;

        }

        [HttpPost]
        public List<GasUserHub> ObtenerUsuariosChat()
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<GasHub>();
            var usuarios = GasHub._connectedUsers;
            return usuarios;
        }

        [HttpPost]
        public IEnumerable<Usuario> VerUsuarios()
        {
            return BSubasta.VerUsuarios();

        }
        [HttpPost]
        public Usuario VerUsuario(Usuario entidad)
        {
            return BSubasta.VerUsuario(entidad);

        }
       
        [HttpPost]
        public IEnumerable<Roles> VerRoles()
        {
            return BSubasta.VerRoles();

        }



    }
}

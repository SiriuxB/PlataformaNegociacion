using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.InteropServices;
using System.Runtime.Remoting.Messaging;
using System.Text;
using Dataifx.AuctionDesc.Data.Clases;
using Dataifx.AuctionDesc.Infrastructure.Builders;
using Dataifx.AuctionDesc.Infrastructure.Enumerations;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Business.Clases
{
    public class BSubasta
    {

        public static Infrastructure.Models.Subasta CrearSubasta(Infrastructure.Models.Subasta auctionObj)
        {
            var subasta = new Subasta();
            try
            {
                var validarSubasta = VerSubastaActual();
                if (validarSubasta.Id != 0 && validarSubasta.Estado == 1)
                {
                    subasta.ErrorMensaje = "Debe terminar o cancelar la subasta actual para poder crear una nueva";
                    subasta.EstadoPeticionOK = false;
                    return subasta;
                }
                return DSubasta.CrearSubasta(auctionObj);
            }
            catch (System.Exception ex)
            {
                GasLogB.CrearLogError(ex);
                return subasta;
            }

        }






        public static Subasta VerSubastaActual()
        {
            var x = new Subasta();
            try
            {
                x = DSubasta.VerSubastaActual();
                var fechaActual = ParamsB.GetBDTime();
                if (x.Ronda != null)
                {
                    var vendedor = new Vendedor();
                    vendedor.IdSubasta = x.Id;
                    vendedor = VerVendedor(vendedor);
                    if (x.Ronda.NumeroRonda > 0 &&
                        (x.Ronda.Valor == vendedor.PrecioPiso || x.Ronda.Valor == vendedor.PrecioTecho))
                    {
                        x.UltimaRonda = true;
                    }
                    x.RondaEnCurso = (fechaActual >= x.Ronda.FechaInicio && fechaActual <= x.Ronda.FechaFin);
                }
                return x;
            }
            catch (System.Exception ex)
            {
                x.ErrorMensaje = "Error al consultar" + ex.Message;
                x.EstadoPeticionOK = false;
                var user = new UserAutentication();
                GasLogB.CrearLogError(ex);
                return x;
            }

        }

        public static Subasta CancelarSubastas()
        {
            var x = new Subasta();
            try
            {
                x = DSubasta.CancelarSubastas();
                return x;
            }
            catch (System.Exception ex)
            {
                x.ErrorMensaje = "Error al cancelar subastas" + ex.Message;
                x.EstadoPeticionOK = false;
                var user = new UserAutentication();
                GasLogB.CrearLogError(ex);
                return x;
            }
        }

        public static Vendedor GuardarVendedor(Vendedor entidad)
        {
            try
            {
                var subasta = VerSubastaActual();
                if (subasta.Estado == 0)
                {
                    entidad.ErrorMensaje = "La subasta no se encuentra activa";
                    entidad.EstadoPeticionOK = false;
                    return entidad;
                }
                if (entidad.Id == 0)
                {
                    if (DSubasta.ValidarGuardadoVendedor(entidad).Any())
                    {
                        entidad.ErrorMensaje = "Ya se encuentra registrado el vendedor para esta subasta";
                        entidad.EstadoPeticionOK = false;
                        return entidad;
                    }
                    return DSubasta.GuardarVendedor(entidad);
                }
                else
                {
                    return DSubasta.ActualizarVendedor(entidad);
                }

            }
            catch (System.Exception ex)
            {
                entidad.ErrorMensaje = ex.Message;
                entidad.EstadoPeticionOK = false;
                GasLogB.CrearLogError(ex);
                return entidad;
            }
        }

        public static Vendedor VerVendedor(Vendedor entidad)
        {
            try
            {
                var retorno = DSubasta.VerVendedor(entidad);
                if (retorno == null)
                {
                    retorno = entidad;
                }
                return retorno;
            }
            catch (System.Exception ex)
            {
                GasLogB.CrearLogError(ex);
                return entidad;
            }
        }


        public static Comprador GuardarComprador(Comprador entidad)
        {
            try
            {
                var comprador = DSubasta.VerComprador(entidad);
                if (comprador != null && comprador.Id != 0)
                {
                    entidad.EstadoPeticionOK = false;
                    entidad.ErrorMensaje = "El comprador ya se encuentra registrado para esta subasta.";
                }
                if (entidad.Id == 0)
                {
                    entidad = DSubasta.GuardarComprador(entidad);
                }

                return entidad;
            }
            catch (System.Exception ex)
            {
                entidad.ErrorMensaje = ex.Message;
                entidad.EstadoPeticionOK = false;
                GasLogB.CrearLogError(ex);
                return entidad;
            }
        }



        public static Comprador VerComprador(Comprador entidad)
        {
            try
            {
                var retorno = DSubasta.VerComprador(entidad);
                if (retorno == null)
                {
                    retorno = entidad;
                }
                return retorno;
            }
            catch (System.Exception ex)
            {
                GasLogB.CrearLogError(ex);
                return entidad;
            }
        }

        public static Ronda CrearRonda(Ronda entidad)
        {
            var subasta = new Subasta();
            try
            {
                var vendedor = new Vendedor();
                vendedor.IdSubasta = entidad.IdSubasta;
                var subastaActual = VerSubastaActual();
                entidad.FechaFin = entidad.FechaFin.AddSeconds(-entidad.FechaFin.Second);
                entidad.FechaInicio = entidad.FechaInicio.AddSeconds(-entidad.FechaInicio.Second);
                vendedor = VerVendedor(vendedor);
                if (vendedor.Id == 0)
                {
                    entidad.EstadoPeticionOK = false;
                    entidad.ErrorMensaje = "No se encuentra registrada la oferta por parte del vendedor aun.";
                    return entidad;
                }
                entidad.IdVendedor = vendedor.Id;
                entidad.Estado = 1;
                var rondaActual = DSubasta.VerRondaActual(entidad.IdSubasta);
                if (rondaActual == null)
                {
                    entidad.CantidadOfertada = vendedor.Cantidad;
                    entidad.Valor = subastaActual.TipoSubasta == 1
                        ? vendedor.PrecioPiso
                        : vendedor.PrecioTecho;
                }
                else
                {

                    entidad.Valor = subastaActual.TipoSubasta == 1
                        ? rondaActual.Valor + vendedor.Variacion > vendedor.PrecioTecho ? vendedor.PrecioTecho : rondaActual.Valor + vendedor.Variacion
                        : rondaActual.Valor - vendedor.Variacion < vendedor.PrecioPiso ? vendedor.PrecioPiso : rondaActual.Valor - vendedor.Variacion;
                    if (rondaActual.Estado == 2)
                    {
                        // entidad.CantidadOfertada = rondaActual.CantidadOfertada - rondaActual.CantidadDemandada;
                        entidad.NumeroRonda = rondaActual.NumeroRonda + 1;
                    }
                    else
                    {
                        entidad = DSubasta.ActualizarRonda(entidad);
                        if (entidad.Valor == vendedor.PrecioPiso || entidad.Valor == vendedor.PrecioTecho)
                        {
                            entidad.UltimaRonda = true;
                        }
                        return entidad;
                    }
                }
                entidad = DSubasta.CrearRonda(entidad);
                if (entidad.NumeroRonda > 0 && (entidad.Valor == vendedor.PrecioPiso || entidad.Valor == vendedor.PrecioTecho))
                {
                    entidad.UltimaRonda = true;
                }

                return entidad;
            }
            catch (System.Exception ex)
            {
                entidad.EstadoPeticionOK = false;
                entidad.ErrorMensaje = ex.Message;
                GasLogB.CrearLogError(ex);
                return entidad;
            }

        }
        public static Ronda CancelarRonda(Ronda entidad)
        {
            var subasta = new Subasta();
            try
            {
                DSubasta.CancelarRonda(entidad.Id);
                var rondaActual = DSubasta.VerRondaActual(entidad.IdSubasta);
                if (rondaActual == null)
                {
                    rondaActual = new Ronda();
                    rondaActual.Id = 0;
                }
                return rondaActual;
            }
            catch (System.Exception ex)
            {
                entidad.EstadoPeticionOK = false;
                entidad.ErrorMensaje = ex.Message;
                GasLogB.CrearLogError(ex);
                return entidad;
            }
        }

        public static Ronda TerminarRonda(Ronda entidad)
        {

            try
            {
                DSubasta.TerminarRonda(entidad.Id);
                var rondaActual = DSubasta.VerRondaActual(entidad.IdSubasta);
                var vendedor = new Vendedor();
                var subasta = VerSubastaActual();
                vendedor.IdSubasta = entidad.IdSubasta;
                vendedor = VerVendedor(vendedor);
                if (rondaActual == null)
                {
                    rondaActual = new Ronda();
                    rondaActual.Id = 0;
                }
                if ((rondaActual.CantidadOfertada == 0 && rondaActual.Id != 0) ||
                    ((subasta.TipoSubasta == 1 && vendedor.PrecioTecho == rondaActual.Valor) ||
                     (subasta.TipoSubasta == 2 && vendedor.PrecioPiso == rondaActual.Valor)))
                {
                    CierreSubasta(entidad.IdSubasta);
                }
                return rondaActual;
            }
            catch (System.Exception ex)
            {
                entidad.EstadoPeticionOK = false;
                entidad.ErrorMensaje = ex.Message;
                GasLogB.CrearLogError(ex);
                return entidad;
            }
        }

        public static void CierreSubasta(int idsubasta)
        {
            var subasta = new Subasta();
            try
            {
                DSubasta.CierreSubasta(idsubasta);

            }
            catch (System.Exception ex)
            {

            }
        }

        public static Demanda VerDemanda(Demanda entidad)
        {
            try
            {
                var retorno = DSubasta.VerDemanda(entidad);
                if (retorno == null)
                {
                    retorno = entidad;
                }
                return retorno;
            }
            catch (System.Exception ex)
            {
                GasLogB.CrearLogError(ex);
                return entidad;
            }
        }

        public static Demanda GuardarDemanda(Demanda entidad)
        {
            try
            {
                double ofertaNueva = 0;
                double demandaNueva = 0;
                var RegistroRondaDemandas = new Ronda();
                var demandaActual = VerDemanda(entidad);
                var demandaEnCuestion = entidad.Demandas;
                var rondaActual = DSubasta.VerRondaActual(entidad.IdSubasta);
                if (demandaActual.Id != 0)
                {
                    entidad.Demandas = demandaActual.Demandas + demandaEnCuestion;
                    DSubasta.ActualizarDemanda(entidad);
                }
                else
                {
                    DSubasta.GuardarDemanda(entidad);
                }
                ofertaNueva = rondaActual.CantidadOfertada - demandaEnCuestion;
                demandaNueva = rondaActual.CantidadDemandada + demandaEnCuestion;

                rondaActual.CantidadDemandada = demandaNueva;
                rondaActual.CantidadOfertada = ofertaNueva;
                DSubasta.ActualizarOfertaRonda(rondaActual);
                var responseDemanda = VerDemanda(entidad);
                if (ofertaNueva == 0)
                {
                    responseDemanda.NotificarCierreSubasta = true;
                    rondaActual = DSubasta.VerRondaActual(entidad.IdSubasta);
                    TerminarRonda(rondaActual);
                }

                return responseDemanda;
            }
            catch (System.Exception ex)
            {
                entidad.EstadoPeticionOK = false;
                entidad.ErrorMensaje = ex.Message;
                GasLogB.CrearLogError(ex);
                return entidad;
            }

        }

        public static List<Demanda> VerHistorialDemandas(Demanda entidad)
        {
            try
            {
                var retorno = DSubasta.VerHistorialDemandas(entidad);
                if (retorno == null)
                {
                    retorno = new List<Demanda>();
                }
                return retorno;
            }
            catch (System.Exception ex)
            {
                GasLogB.CrearLogError(ex);
                return new List<Demanda>();
            }
        }

        public static List<Demanda> VerHistorialGeneralDemandas(Demanda entidad)
        {
            try
            {
                var retorno = DSubasta.VerHistorialGeneralDemandas(entidad);
                if (retorno == null)
                {
                    retorno = new List<Demanda>();
                }
                return retorno;
            }
            catch (System.Exception ex)
            {
                GasLogB.CrearLogError(ex);
                return new List<Demanda>();
            }
        }

        public static Subasta ClausurarSubasta(Subasta entidad)
        {
            CancelarSubastas();
            return VerSubastaActual();
        }
        //public static Usuario GuardarUsuario(Usuario entidad)
        //{
        //    try
        //    {
        //        entidad.Password = Encriptar(entidad.Password);
        //        if (entidad.Id == 0)
        //        {
        //            var obj = DataUser.LoginNow(entidad);
        //            if (obj != null && obj.UserName == entidad.UserName)
        //            {
        //                entidad.EstadoPeticionOK = false;
        //                entidad.ErrorMensaje = "Ya hay un usuario registrado con este nombre.";
        //            }
        //            else
        //            {
        //                entidad = DataUser.GuardarUsuario(entidad);
        //            }
        //            return entidad;
        //        }
        //        else
        //        {
        //            entidad = DataUser.ActualizarUsuario(entidad);
        //        }
        //        return entidad;
        //    }
        //    catch (System.Exception ex)
        //    {
        //        entidad.ErrorMensaje = ex.Message;
        //        entidad.EstadoPeticionOK = false;
        //        GasLogB.CrearLogError(ex);
        //        return entidad;
        //    }
        //}

        public static IEnumerable<Usuario> VerUsuarios()
        {
            IEnumerable<Usuario> resultado = null;
            try
            {
                resultado = DataUser.VerUsuarios();
                return resultado;
            }
            catch (System.Exception ex)
            {
            
                GasLogB.CrearLogError(ex);
                return resultado;
            }
        }
        public static IEnumerable<Roles> VerRoles()
        {
            IEnumerable<Roles> resultado = null;
            resultado = DataUser.VerRoles();
            return resultado;

        }
        public static Usuario VerUsuario(Usuario entidad)
        {
            var resultado = new Usuario();
            try
            {
                resultado = DataUser.VerUsuario(entidad);
                return resultado;
            }
            catch (System.Exception ex)
            {
                entidad.ErrorMensaje = ex.Message;
                entidad.EstadoPeticionOK = false;
                GasLogB.CrearLogError(ex);
                return resultado;
            }
        }


        //public static Usuario LoginNow(Usuario entidad)
        //{
        //    try
        //    {

        //        var retorno = DataUser.LoginNow(entidad);
        //        var userautentication = new UserAutentication();
        //        byte[] data = Convert.FromBase64String(entidad.Password);
        //        string decodedString = Encoding.UTF8.GetString(data);
        //        if (retorno != null)
        //        {
        //            retorno.UserAutentication = userautentication;
        //            entidad.Password = decodedString;
        //            retorno.Password = DesEncriptar(retorno.Password);
        //            if (entidad.Password == retorno.Password)ver
        //            {
        //                MapearObjetoUserAutentication(retorno);
        //                retorno.Password = Encriptar(retorno.Password);
        //            }
        //            else
        //            {
        //                entidad.Id = 0;
        //                retorno = entidad;
        //                retorno.UserAutentication = userautentication;
        //                retorno.UserAutentication.access = 0;
        //            }
        //        }
        //        else
        //        {
        //            retorno = new Usuario();
        //            retorno.UserAutentication = userautentication;
        //            retorno.UserAutentication.access = 0;
        //        }
        //        return retorno;
        //    }
        //    catch (System.Exception ex)
        //    {
        //        GasLogB.CrearLogError(ex);
        //        return entidad;
        //    }
        //}

        //private static void MapearObjetoUserAutentication(Usuario retorno)
        //{

        //    retorno.UserAutentication.Empresa = retorno.Nombre;
        //    retorno.UserAutentication.Nombre = retorno.Nombre;
        //    retorno.UserAutentication.Perfil = retorno.Rol;
        //    retorno.UserAutentication.Roll = retorno.Rol;
        //    retorno.UserAutentication.username = retorno.UserName;
        //    retorno.UserAutentication.IdSegas = retorno.Id;
        //    retorno.UserAutentication.access = retorno.Activo ? 1 : 0;
        //}

        /// Encripta una cadena
        public static string Encriptar(string _cadenaAencriptar)
        {
            string result = string.Empty;
            byte[] encryted = System.Text.Encoding.Unicode.GetBytes(_cadenaAencriptar);
            result = Convert.ToBase64String(encryted);
            return result;
        }

        /// Esta función desencripta la cadena que le envíamos en el parámentro de entrada.
        public static string DesEncriptar(string _cadenaAdesencriptar)
        {
            string result = string.Empty;
            byte[] decryted = Convert.FromBase64String(_cadenaAdesencriptar);
            //result = System.Text.Encoding.Unicode.GetString(decryted, 0, decryted.ToArray().Length);
            result = System.Text.Encoding.Unicode.GetString(decryted);
            return result;
        }

        public static Usuario ActivarUsuario(Usuario entidad)
        {

            var resultado = new Usuario();
            try
            {
                resultado = DataUser.ActivarUsuario(entidad);
                return resultado;
            }
            catch (System.Exception ex)
            {
                GasLogB.CrearLogError(ex);
                return resultado;
            }
        }
    }

}



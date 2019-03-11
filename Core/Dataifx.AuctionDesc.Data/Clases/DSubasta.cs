using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using Dapper;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Microsoft.Practices.EnterpriseLibrary.Data;

namespace Dataifx.AuctionDesc.Data.Clases
{
    public class DSubasta
    {


        public static Subasta CrearSubasta(Subasta Auctionobj)
        {
            var sqlCrear = "INSERT into subasta (Fecha,Estado,RondaEnCurso,CreadaPorVendedor,TipoSubasta,MultiploDemanda) values(@Fecha,@Estado,@RondaEnCurso,@CreadaPorVendedor,@TipoSubasta,@MultiploDemanda)";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var registroInsertado = connection.Execute(sqlCrear, new { Fecha = DateTime.Now,
                    Estado = true, RondaEnCurso = false, Auctionobj.CreadaPorVendedor, Auctionobj.TipoSubasta ,Auctionobj.MultiploDemanda
                });
                return VerSubastaActual();

            }
        }

        public static Ronda CrearRonda(Ronda entidad)
        {
            var sqlCrear = @"INSERT INTO dbo.Ronda(
                                  IdSubasta
                                , NumeroRonda
                                , CantidadOfertada
                                , Valor
                                , IdVendedor
                                , FechaInicio
                                , FechaFin
                                , Estado)
                            VALUES
                                ( @IdSubasta
                                , @NumeroRonda
                                , @CantidadOfertada
                                , @Valor
                                , @IdVendedor
                                , @FechaInicio
                                , @FechaFin
                                , @Estado)";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var registroInsertado = connection.Execute(sqlCrear, new
                {
                    entidad.IdSubasta
                   ,
                    entidad.NumeroRonda
                   ,
                    entidad.CantidadOfertada
                   ,
                    entidad.Valor
                   ,
                    entidad.IdVendedor
                   ,
                    entidad.FechaInicio
                   ,
                    entidad.FechaFin
                   ,
                    entidad.Estado
                });
                return VerRondaActual(entidad.IdSubasta);

            }
        }

        public static Ronda ActualizarRonda(Ronda entidad)
        {
            var sqlCrear = @"UPDATE dbo.Ronda   SET
            NumeroRonda = @NumeroRonda
            , Valor = @Valor
            , FechaInicio = @FechaInicio
            , FechaFin = @FechaFin
            , Estado = @Estado
              WHERE Id = @Id";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var registroInsertado = connection.Execute(sqlCrear, new
                {
                    entidad.NumeroRonda,
                    entidad.Valor,
                    entidad.FechaInicio,
                    entidad.FechaFin,
                    entidad.Estado,
                    entidad.Id
                });
                return VerRondaActual(entidad.IdSubasta);

            }
        }

        public static Subasta CancelarSubastas()
        {
            var sqlcancelar = "UPDATE subasta set Estado = 0";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var registroInsertado = connection.Execute(sqlcancelar);
                return VerSubastaActual();

            }
        }
        public static Subasta VerSubastaActual()
        {
            var sqlObtener = "Select top 1  * from  subasta order by id desc";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var subasta = connection.Query<Subasta>(sqlObtener).FirstOrDefault();
                subasta.Ronda = VerRondaActual(subasta.Id);
                return subasta;

            }
        }
        public static Ronda VerRondaActual(int IdSubasta)
        {
            var ronda = new Ronda();
            var sqlultimaronda = "  Select top 1  Valor from  Ronda where IdSubasta = @IdSubasta and NumeroRonda = @NumeroRonda order by id desc";

            var sqlObtener = "Select top 1  * from  Ronda where IdSubasta = @IdSubasta order by id desc";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                ronda = connection.Query<Ronda>(sqlObtener, new { IdSubasta }).FirstOrDefault();
                if (ronda != null && ronda.NumeroRonda > 0)
                {
                    var NumeroRonda = ronda.NumeroRonda - 1;
                    var x = connection.ExecuteScalar(sqlultimaronda, new { IdSubasta, NumeroRonda });
                    var PrecioRondaAnterior = Convert.ToDouble(x);
                    ronda.PrecioRondaAnterior = PrecioRondaAnterior;
                }

            }

            return ronda;
        }

        public static bool ActualizarOfertaRonda(Ronda entidad)
        {
            var sql = "UPDATE RONDA SET CantidadOfertada = @CantidadOfertada , CantidadDemandada = @CantidadDemandada WHERE Id = @Id ";


            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.ExecuteScalar(sql, new { entidad.Id, entidad.CantidadOfertada, entidad.CantidadDemandada });
                return true;

            }
        }


        public static Vendedor GuardarVendedor(Vendedor entidad)
        {

            var sql = "INSERT into Vendedor (Fecha,IdSubasta,Cantidad,Nombre,PrecioPiso,PrecioTecho,Variacion,IdSegas) values(@Fecha,@IdSubasta,@Cantidad,@Nombre,@PrecioPiso,@PrecioTecho,@Variacion,@IdSegas);" +
                     "SELECT @@IDENTITY";


            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.ExecuteScalar(sql, new { Fecha = DateTime.Now, entidad.IdSubasta, entidad.Cantidad, entidad.Nombre, entidad.PrecioPiso, entidad.PrecioTecho, entidad.Variacion, entidad.Id, entidad.IdSegas });
                entidad.Id = Convert.ToInt32(x);
                return entidad;

            }
        }

        public static Vendedor ActualizarVendedor(Vendedor entidad)
        {

            var sql = "UPDATE Vendedor SET Fecha = @Fecha,IdSubasta = @IdSubasta ,Cantidad = @Cantidad,Nombre = @Nombre,PrecioTecho = @PrecioTecho,PrecioPiso = @PrecioPiso,Variacion=@Variacion ,IdSegas = @IdSegas where Id = @Id ;" +
                   "SELECT  @Id";


            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.ExecuteScalar(sql, new { Fecha = DateTime.Now, entidad.IdSubasta, entidad.Cantidad, entidad.Nombre, entidad.PrecioTecho, entidad.PrecioPiso, entidad.Variacion, entidad.Id, entidad.IdSegas });
                entidad.Id = Convert.ToInt32(x);
                return entidad;

            }
        }


        public static Vendedor VerVendedor(Vendedor entidad)
        {
            var sqlObtener = "Select top 1 * from  Vendedor  where IdSubasta = @IdSubasta";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                return connection.Query<Vendedor>(sqlObtener, new { entidad.IdSubasta }).FirstOrDefault();

            }
        }

        public static IEnumerable<Vendedor> ValidarGuardadoVendedor(Vendedor entidad)
        {
            var sqlObtener = "Select * from  Vendedor  where idsubasta = @IdSubasta";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                return connection.Query<Vendedor>(sqlObtener, new { entidad.IdSubasta }).ToList();

            }
        }





        public static Comprador GuardarComprador(Comprador entidad)
        {

            var sql = "INSERT into COMPRADOR (Fecha,IdSubasta,Nombre,IdSegas) values(@Fecha,@IdSubasta,@Nombre,@IdSegas);" +
                     "SELECT @@IDENTITY";


            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.ExecuteScalar(sql, new { Fecha = DateTime.Now, entidad.IdSubasta, entidad.Nombre, entidad.IdSegas });
                entidad.Id = Convert.ToInt32(x);
                return entidad;

            }
        }
        public static Comprador VerComprador(Comprador entidad)
        {
            var sqlObtener = "Select * from  Comprador where IdSubasta = @IdSubasta and IdSegas = @IdSegas order by id desc";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                return connection.Query<Comprador>(sqlObtener, new { entidad.IdSubasta, entidad.IdSegas }).FirstOrDefault();

            }
        }

        public static bool CancelarRonda(int entidadIdSubasta)
        {
            var sql = "DELETE RONDA WHERE Id = @Id; DELETE Demanda WHERE IdRonda = @Id; ";


            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.ExecuteScalar(sql, new { Id = entidadIdSubasta });
                return true;

            }
        }

        public static bool TerminarRonda(int entidadId)
        {
            var sql = "UPDATE RONDA SET ESTADO = 2 WHERE Id = @Id ";


            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.ExecuteScalar(sql, new { Id = entidadId });
                return true;

            }
        }

        public static Demanda VerDemanda(Demanda entidad)
        {
            var sqlObtener = "Select * from  Demanda where IdComprador = @IdComprador and IdSubasta = @IdSubasta  and IdRonda = @IdRonda order by id desc";

            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                return connection.Query<Demanda>(sqlObtener, new { entidad.IdComprador, entidad.IdSubasta, entidad.IdRonda }).FirstOrDefault();

            }
        }


        public static Demanda GuardarDemanda(Demanda entidad)
        {
            var sql = "INSERT into DEMANDA (IdComprador,IdSubasta,IdRonda,Demandas,Fecha,NombreComprador) values(@IdComprador,@IdSubasta,@IdRonda,@Demandas,@Fecha,@NombreComprador);" +
                      "SELECT @@IDENTITY";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.ExecuteScalar(sql, new { Fecha = DateTime.Now, entidad.IdComprador, entidad.IdSubasta, entidad.IdRonda, entidad.Demandas, entidad.NombreComprador });
                entidad.Id = Convert.ToInt32(x);
                return entidad;

            }

        }
        public static Demanda ActualizarDemanda(Demanda entidad)
        {
            var sql = "UPDATE DEMANDA SET IdComprador = @IdComprador ,IdSubasta = @IdSubasta ,IdRonda=@IdRonda,Demandas=@Demandas,Fecha = @Fecha " +
                      ",NombreComprador = @NombreComprador WHERE  " +
                      "IdComprador = @IdComprador and IdSubasta = @IdSubasta  and IdRonda=@IdRonda";


            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.Query<Demanda>(sql, new { Fecha = DateTime.Now, entidad.IdComprador, entidad.IdSubasta, entidad.IdRonda, entidad.Demandas, entidad.NombreComprador }).FirstOrDefault();
                return x;

            }
        }


        public static List<Demanda> VerHistorialDemandas(Demanda entidad)
        {
            var sqlObtener = @"Select DE.*,RON.*,VEND.* from  Demanda DE
LEFT JOIN Ronda RON ON RON.Id = DE.IdRonda
LEFT JOIN Vendedor VEND ON VEND.Id = RON.IdVendedor
 where DE.IdComprador = @IdComprador and DE.IdSubasta = @IdSubasta  order by DE.id desc";

            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                return connection.Query<Demanda, Ronda, Vendedor, Demanda>(sqlObtener, (demanda, Ronda, Vendedor) =>
                    {
                        if (Vendedor != null && Ronda != null)
                        {
                            demanda.NombreVendedor = Vendedor.Nombre;
                            demanda.NumeroRonda = Ronda.NumeroRonda;
                            demanda.ValorCompra = Ronda.Valor;
                        }

                        return demanda;
                    },

                    new { entidad.IdComprador, entidad.IdSubasta }).ToList();

            }
        }

        public static void CierreSubasta(int idsubasta)
        {
            var sqlcancelar = "UPDATE subasta set Estado = 2 where id = @idsubasta";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var registroInsertado = connection.Execute(sqlcancelar, new { idsubasta });
            }
        }

        public static List<Demanda> VerHistorialGeneralDemandas(Demanda entidad)
        {
            var sqlObtener = @"Select distinct DE.*,RON.*,VEND.* from  Demanda DE
LEFT JOIN Ronda RON ON RON.Id = DE.IdRonda
LEFT JOIN Vendedor VEND ON VEND.Id = RON.IdVendedor
where DE.IdSubasta = @IdSubasta order by DE.id desc";

            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                return connection.Query<Demanda, Ronda, Vendedor, Demanda>(sqlObtener, (demanda, Ronda, Vendedor) =>
                     {
                         if (Vendedor != null && Ronda != null )
                         {
                             demanda.NombreVendedor = Vendedor.Nombre;
                             demanda.NumeroRonda = Ronda.NumeroRonda;
                             demanda.ValorCompra = Ronda.Valor;
                         }

                         return demanda;
                     },

                    new { entidad.IdSubasta }).ToList();

            }
        }
    }


}

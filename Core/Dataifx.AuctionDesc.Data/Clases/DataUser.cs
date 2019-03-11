using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using Dapper;
using Dataifx.AuctionDesc.Infrastructure.Enumerations;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Microsoft.Practices.EnterpriseLibrary.Data;

namespace Dataifx.AuctionDesc.Data.Clases
{
    public class DataUser
    {

        public static UserAutentication ValidateUser(UserAutentication userobj)
        {

            DataTable clientes = new DataTable();
            try
            {

                DataSet dsValidation = new DataSet();
                DataTable dtValidation = new DataTable();
                bool InsertBDok = false;
                var ConectStr = ConfigurationSettings.AppSettings["ConectionAuction"];
                ConectStr = ConectStr.Replace("USER", userobj.username);//testgas1
                ConectStr = ConectStr.Replace("PASS", userobj.password);//test12345
                                                                        //  Database dbeAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                var CompradorPerfil1 = "1";
                var CompradorPerfil2 = "8";
                var CompradorPerfil3 = "4";
                var VendedorPerfil1 = "2";
                var VendedorPerfil2 = "3";
                // Crear objeto SP
                DbCommand spUsuarios = dbeAuction.GetStoredProcCommand("SP_SEGAS_INFO");
                dbeAuction.AddInParameter(spUsuarios, "@i_operation", DbType.String, "S");
                dbeAuction.AddInParameter(spUsuarios, "@i_option", DbType.String, "A");
                dbeAuction.AddInParameter(spUsuarios, "@codigo_usuario", DbType.String, userobj.IdSegas);
                dsValidation = dbeAuction.ExecuteDataSet(spUsuarios);
                if (dsValidation.Tables[0].Rows.Count > 0)
                {
                    dtValidation = dsValidation.Tables[0];
                    userobj.access = 1;
                    userobj.username = dtValidation.Rows[0]["login"].ToString();
                    userobj.CodigoOperador = dtValidation.Rows[0]["codigo_operador"] == DBNull.Value ? 0 : Convert.ToInt32(dtValidation.Rows[0]["codigo_operador"]);
                    userobj.CodigoGrupoUsuario = dtValidation.Rows[0]["codigo_grupo_usuario"] == DBNull.Value ? 0 : Convert.ToInt32(dtValidation.Rows[0]["codigo_grupo_usuario"]);
                    userobj.CodigoTipoOperador = dtValidation.Rows[0]["codigo_tipo_operador"].ToString();
                    userobj.Nombre = dtValidation.Rows[0]["nombre_usuario"].ToString();
                    userobj.Empresa = dtValidation.Rows[0]["nombre_operador"].ToString();


                    if (userobj.CodigoGrupoUsuario == (int)RollSegas.Administrador
                        || userobj.CodigoGrupoUsuario == (int)RollSegas.Subastador
                        || userobj.CodigoGrupoUsuario == (int)RollSegas.OperadorBmc1
                        || userobj.CodigoGrupoUsuario == (int)RollSegas.OperadorBmc2)
                    {
                        if (userobj.CodigoGrupoUsuario == (int)RollSegas.Administrador
                        || userobj.CodigoGrupoUsuario == (int)RollSegas.OperadorBmc1
                        || userobj.CodigoGrupoUsuario == (int)RollSegas.OperadorBmc2)
                        {
                            userobj.Roll = (int)GasProfile.Subastador;
                        }
                        if (userobj.CodigoGrupoUsuario == (int)RollSegas.Subastador)
                        {
                            userobj.Roll = (int)GasProfile.Subastador;
                        }
                    }
                    else
                    {
                        if (userobj.CodigoTipoOperador == VendedorPerfil1.ToString()
                            || userobj.CodigoTipoOperador == VendedorPerfil2.ToString())
                        {
                            userobj.Roll = (int)GasProfile.Vendedor;
                        }
                        if (userobj.CodigoTipoOperador == CompradorPerfil1.ToString() ||
                            userobj.CodigoTipoOperador == CompradorPerfil2.ToString() ||
                            userobj.CodigoTipoOperador == CompradorPerfil3.ToString())
                        {
                            userobj.Roll = (int)GasProfile.Comprador;
                        }
                    }

                }
                else
                {
                    userobj.access = 0;
                }
                InsertBDok = true;

            }
            catch (Exception ex)
            {

                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));



            }
            return userobj;
        }

        public static bool CreateToken(Token tokenObj)
        {

            bool InsertBDok = false;

            try
            {


                var ConectStr = ConfigurationSettings.AppSettings["ConectionAuction"];
                ConectStr = ConectStr.Replace("USER", tokenObj.UserName);//testgas1
                ConectStr = ConectStr.Replace("PASS", tokenObj.Password);//test12345
                                                                         //  Database dbeAuction = DatabaseFactory.CreateDatabase(a);
                Database dbeAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                // Crear objeto SP
                DbCommand spUsuarios = dbeAuction.GetStoredProcCommand("SP_USUARIOS");

                dbeAuction.AddInParameter(spUsuarios, "@i_operation", DbType.String, "IU");
                dbeAuction.AddInParameter(spUsuarios, "@i_option", DbType.String, "A");
                dbeAuction.AddInParameter(spUsuarios, "@UserId", DbType.String, tokenObj.IdUser);
                dbeAuction.AddInParameter(spUsuarios, "@UserName", DbType.String, tokenObj.UserName);
                dbeAuction.AddInParameter(spUsuarios, "@AuthToken", DbType.String, tokenObj.AuthToken);
                dbeAuction.AddInParameter(spUsuarios, "@Password", DbType.String, tokenObj.Password);


                dbeAuction.ExecuteNonQuery(spUsuarios);
                InsertBDok = true;

            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));

            }

            return InsertBDok;
        }

        public static DataTable SearchToken(Token tokenObj)
        {
            DataSet dsSearch = new DataSet();
            DataTable dtSearch = new DataTable();
            bool InsertBDok = false;

            try
            {

                Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");

                // Crear objeto SP
                DbCommand spUsuarios = dbeAuction.GetStoredProcCommand("SP_USUARIOS");

                dbeAuction.AddInParameter(spUsuarios, "@i_operation", DbType.String, "S");
                dbeAuction.AddInParameter(spUsuarios, "@i_option", DbType.String, "A");
                dbeAuction.AddInParameter(spUsuarios, "@AuthToken", DbType.String, tokenObj.AuthToken);
                dsSearch = dbeAuction.ExecuteDataSet(spUsuarios);
                if (dsSearch.Tables[0].Rows.Count > 0)
                {
                    dtSearch = dsSearch.Tables[0];
                }
                InsertBDok = true;

            }
            catch (Exception ex)
            {


                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));

            }

            return dtSearch;
        }


        public static IEnumerable<Usuario> VerUsuarios()
        {
            List<Usuario> lista = new List<Usuario>();
            var roles = VerRoles();
            var sqlObtener = "Select * from  Usuario";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                lista = connection.Query<Usuario>(sqlObtener).ToList();
            }
            if (lista.Count > 0)
            {
                lista.ForEach(x => x.NombreRol = roles.FirstOrDefault((y) => y.Id == x.Rol).Nombre
                );
            }
            return lista;
        }


        public static IEnumerable<Usuario> VerUsuarios(Usuario entidad)
        {
            List<Usuario> lista = new List<Usuario>();
            var roles = VerRoles();
            var sqlObtener = "Select * from  Usuario";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                lista = connection.Query<Usuario>(sqlObtener).ToList();
            }
            if (lista.Count > 0)
            {
                lista.ForEach(x => x.NombreRol = roles.FirstOrDefault((y) => y.Id == x.Rol).Nombre
                );
            }
            return lista;
        }



        public static Usuario GuardarUsuario(Usuario entidad)
        {

            var sql = "INSERT into Usuario (FechaModificacion,Nombre,UserName,Password,Rol,Activo) values(@FechaModificacion,@Nombre,@UserName,@Password,@Rol,@Activo);" +
                     "SELECT @@IDENTITY";


            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.ExecuteScalar(sql, new { FechaModificacion = DateTime.Now, entidad.Nombre, entidad.UserName, entidad.Password, entidad.Rol, entidad.Activo });
                entidad.Id = Convert.ToInt32(x);
                return entidad;

            }
        }

        public static Usuario ActualizarUsuario(Usuario entidad)
        {

            var sql = "UPDATE Usuario SET FechaModificacion = @FechaModificacion ,Nombre = @Nombre ,UserName = @UserName ,Password = @Password,Rol = @Rol,Activo = @Activo WHERE Id = @Id ;" +
                     "SELECT @@IDENTITY";


            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.ExecuteScalar(sql, new { FechaModificacion = DateTime.Now, entidad.Nombre, entidad.UserName, entidad.Password, entidad.Rol, entidad.Activo, entidad.Id });
                return entidad;

            }
        }

        public static Usuario VerUsuario(Usuario entidad)
        {
            var sqlObtener = "Select * from  Usuario WHERE Id = @Id";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.Query<Usuario>(sqlObtener, new { entidad.Id }).FirstOrDefault();
                return x;
            }
        }

        public static Usuario LoginNow(Usuario entidad)
        {
            var sqlObtener = "Select * from  Usuario WHERE UserName = @UserName";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.Query<Usuario>(sqlObtener, new { entidad.UserName }).FirstOrDefault();
                return x;
            }
        }

        public static IEnumerable<Roles> VerRoles()
        {
            var sqlObtener = "Select * from  Roles";
            Database db = DatabaseFactory.CreateDatabase("Auction");
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var x = connection.Query<Roles>(sqlObtener).ToList();
                return x;
            }
        }
    }
}

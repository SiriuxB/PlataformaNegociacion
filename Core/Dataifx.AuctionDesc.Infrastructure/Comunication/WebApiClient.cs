using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Threading.Tasks;

namespace Dataifx.AuctionDesc.Infrastructure.Comunication
{
    public class GeneralToken
    {
        private static Lazy<GeneralToken> _instance = new Lazy<GeneralToken>(() => new GeneralToken());

        public static GeneralToken Instance
        {
            get
            {
                return _instance.Value;
            }
        }


        public string strToken
        {
            get;
            set;
        }

    }

    public static class WebApiClient<T, U>
    {

        static HttpClient client = new HttpClient();




        static WebApiClient()
        {
            string strURIService = ConfigurationManager.AppSettings["Service"].ToString();
            client.BaseAddress = new Uri(strURIService);
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));



            //if (!System.Diagnostics.EventLog.SourceExists("Dataifx"))
            //    System.Diagnostics.EventLog.CreateEventSource("Dataifx", "logDataifx");


        }


        public static async Task<T> Ejecutar(string metodo, U parametros, string credenciales = "")
        {
            try
            {
                //client.DefaultRequestHeaders.Add("Basic", token.AuthToken);
                //  string strToken = string.Empty;

                if (credenciales.Length > 0){
                    if (client.DefaultRequestHeaders.Contains("Basic"))
                    {
                        client.DefaultRequestHeaders.Remove("Basic");
                    }
                    client.DefaultRequestHeaders.Add("Basic", Base64Encode(credenciales));
                }
                else
                    {
                        if (!client.DefaultRequestHeaders.Contains("Token"))
                            client.DefaultRequestHeaders.Add("Token", GeneralToken.Instance.strToken);
                    }
                // request.Headers["Token"] = GeneralViewModel.Instance.Token;


                var response = await client.PostAsJsonAsync(metodo, parametros);



                if (credenciales.Length > 0 && response.Headers.Any(x => x.Key == "Token"))
                {
                    var headerValues = response.Headers.GetValues("Token");
                    var id = headerValues.FirstOrDefault();
                    GeneralToken.Instance.strToken = id;
                    // GeneralViewModel.Instance.Token = strToken;
                }


                //if (response.StatusCode == HttpStatusCode.OK)
                //{
                //string json = await response.Content.ReadAsStringAsync();
                var objetcs = await response.Content.ReadAsAsync<T>();
                //   }

                return objetcs;
            }
            catch (WebException e)
            {
                using (WebResponse response = e.Response)
                {
                    System.Diagnostics.Trace.WriteLine(string.Format("DATAIFX Services Auditoria: WebException e: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", e.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));
                    HttpWebResponse httpResponse = (HttpWebResponse)response;
                    throw new WebException("No es posible la conexion con el servidor", e, WebExceptionStatus.ConnectFailure, httpResponse);
                }
            }
            catch (Newtonsoft.Json.JsonException jEx)
            {
                // var _return = WebApiClient<bool, Models.Error>.Ejecutar("api/Error/AddError/",
                //new Models.Error { Code = 123, Description = jEx.Message.ToString(), existError = true });
                System.Diagnostics.Trace.WriteLine(string.Format("DATAIFX Services Auditoria: JsonException jEx: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", jEx.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));
                return default(T);
            }
            catch (HttpRequestException ex)
            {
                //var _return = WebApiClient<bool, Models.Error>.Ejecutar("api/Error/AddError/",
                //new Models.Error { Code = 123, Description = ex.Message.ToString(), existError = true });
                System.Diagnostics.Trace.WriteLine(string.Format("DATAIFX Services Auditoria: HttpRequestException ex: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));
                return default(T);
            }
            catch (Exception ex2)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("DATAIFX Services Auditoria: Exception ex2: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex2.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));
                // var _return = WebApiClient<bool, Models.Error>.Ejecutar("api/Error/AddError/",
                //new Models.Error { Code = 123, Description = ex2.Message.ToString(), existError = true });
                return default(T);
            }

        }


        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static async Task<T> EjecutarGet(string metodo, U parametros)
        {
            try
            {
                var response = await client.GetAsync(metodo);
                var objetcs = await response.Content.ReadAsAsync<T>();

                return objetcs;
            }
            catch (Newtonsoft.Json.JsonException jEx)
            {

                return default(T);
            }
            catch (HttpRequestException ex)
            {

                return default(T);
            }
            catch (Exception ex2)
            {

                return default(T);
            }

        }


    }
}

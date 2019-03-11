using System;
using System.Reflection;

namespace Dataifx.AuctionDesc.Services
{
    public partial class Realtime : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {

                //if (Request.Params["cmd"] != null)
                //{
                //    switch (Request.Params["cmd"].ToString())
                //    //{
                //    //    case "TRANS":

                //    //        //try
                //    //        //{
                //    //        //using (System.IO.StreamWriter file = new System.IO.StreamWriter(@"C:\Log\LogWeb1.txt", true))
                //    //        //{
                //    //        //    file.WriteLine("OK - Date=" + Request.Params["Hora"].ToString() + " Nemo=" + Request.Params["Nemotecnico"].ToString());
                //    //        //}

                //    //        // Dataifx.Trading.Data.Error.Adicionar(DateTime.Now, "RelaTime", Request.Params["Nemotecnico"].ToString(), "OK - Date=" + Request.Params["Hora"].ToString() + " Nemo=" + Request.Params["Nemotecnico"].ToString());

                //    //        //TransactionSummarized tran = new TransactionSummarized();
                //    //        //if (Request.Params["Hora"] != null)
                //    //        //tran.Date = DateTime.ParseExact(Request.Params["Hora"].ToString(), "yyyy-MM-dd HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                //    //        //if (Request.Params["Cantidad"] != null)
                //    //        //tran.Quantity = Convert.ToInt64(Request.Params["Cantidad"].ToString());
                //    //        //if (Request.Params["Precio"] != null)
                //    //        //tran.ClosingPrice = Convert.ToDouble(Request.Params["Precio"].ToString(), System.Globalization.CultureInfo.InvariantCulture);
                //    //        //if (Request.Params["Minimo"] != null)
                //    //        //tran.Minimum = Convert.ToDouble(Request.Params["Minimo"].ToString(), System.Globalization.CultureInfo.InvariantCulture);
                //    //        //if (Request.Params["Maximo"] != null)
                //    //        //tran.Maximum = Convert.ToDouble(Request.Params["Maximo"].ToString(), System.Globalization.CultureInfo.InvariantCulture);
                //    //        //if (Request.Params["Promedio"] != null)
                //    //        //tran.Average = Convert.ToDouble(Request.Params["Promedio"].ToString(), System.Globalization.CultureInfo.InvariantCulture);
                //    //        //if (Request.Params["Variacion"] != null)
                //    //        //tran.Variation = Convert.ToDouble(Request.Params["Variacion"].ToString(), System.Globalization.CultureInfo.InvariantCulture);
                //    //        //if (Request.Params["Cambio"] != null)
                //    //        //tran.Change = Convert.ToDouble(Request.Params["Cambio"].ToString(), System.Globalization.CultureInfo.InvariantCulture);
                //    //        //if (Request.Params["Estado"] != null)
                //    //        //tran.state = Request.Params["Estado"].ToString();
                //    //        //if (Request.Params["TotalNegociado"] != null)
                //    //        //tran.TotalTrading = Convert.ToDouble(Request.Params["TotalNegociado"].ToString(), System.Globalization.CultureInfo.InvariantCulture);

                //    //        //if (Request.Params["NumeroOperaciones"] != null)
                //    //        //    tran.OperationsNumber = Convert.ToInt64(Request.Params["NumeroOperaciones"].ToString(), System.Globalization.CultureInfo.InvariantCulture);

                //    //        //if (Request.Params["MarcaPrecio"] != null)
                //    //        //tran.SelectPrice = Request.Params["MarcaPrecio"].ToString();


                //    //        //if (Request.Params["TipoMercado"] != null)
                //    //        //{
                //    //        //    //tran.Instrument = new Instrument
                //    //        //    //{
                //    //        //    tran.mnemonic = Request.Params["Nemotecnico"].ToString();
                //    //        //    tran.DescriptionMnemonic = Request.Params["Nemotecnico"].ToString();
                //    //        //    tran.Type = (Dataifx.Trading.Infrastructure.Enumerations.MarketType)Convert.ToInt32(Request.Params["TipoMercado"].ToString());
                //    //        //    //};
                //    //        //}
                //    //        //else
                //    //        //{
                //    //        //    //tran.Instrument = new Instrument
                //    //        //    //{
                //    //        //    tran.mnemonic = Request.Params["Nemotecnico"].ToString();
                //    //        //    tran.DescriptionMnemonic = Request.Params["Nemotecnico"].ToString();
                //    //        //    //  };
                //    //        //}


                     
                //    //        //Response.Write("OK");
                //    //        ////}
                //    //        ////catch (Exception err)
                //    //        ////{
                //    //        ////   Dataifx.Trading.Data.Error.Adicionar(DateTime.Now, "RelaTime", "0", err.Message);
                //    //        ////}


                //    //        //break;

                      

                    

                          
                //    //}
                //}
            }
            catch (Exception ex)
            { // TODO manejo de la exception
                System.Diagnostics.Trace.WriteLine(string.Format("DATAIFX Services Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));
                Response.Write(ex.ToString());

            }
            finally
            {
                Response.End();
            }

        }
    }
}
﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.42000
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

// 
// Microsoft.VSDesigner generó automáticamente este código fuente, versión=4.0.30319.42000.
// 

using System;
using System.ComponentModel;
using System.Diagnostics;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Serialization;

#pragma warning disable 1591

namespace Dataifx.AuctionDesc.Services.Web_References.WS_BVC_Corredores {
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.3056.0")]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [WebServiceBinding(Name="BVC-IngresoAutomaticoOrdenesWS_BVC-IngresoAutomaticoOrdenesHttpBinding", Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes/Binding2")]
    public partial class BVCIngresoAutomaticoOrdenesWS_BVCIngresoAutomaticoOrdenesHttpService : System.Web.Services.Protocols.SoapHttpClientProtocol {
        
        private System.Threading.SendOrPostCallback IngresoAutomaticoOrdenesOperationCompleted;
        
        private bool useDefaultCredentialsSetExplicitly;
        
        /// <remarks/>
        public BVCIngresoAutomaticoOrdenesWS_BVCIngresoAutomaticoOrdenesHttpService() {
            this.Url = global::Dataifx.AuctionDesc.Services.Properties.Settings.Default.Dataifx_Trading_Services_WS_BVC_Corredores_BVC_IngresoAutomaticoOrdenesWS_BVC_IngresoAutomaticoOrdenesHttpService;
            if ((this.IsLocalFileSystemWebService(this.Url) == true)) {
                this.UseDefaultCredentials = true;
                this.useDefaultCredentialsSetExplicitly = false;
            }
            else {
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        public new string Url {
            get {
                return base.Url;
            }
            set {
                if ((((this.IsLocalFileSystemWebService(base.Url) == true) 
                            && (this.useDefaultCredentialsSetExplicitly == false)) 
                            && (this.IsLocalFileSystemWebService(value) == false))) {
                    base.UseDefaultCredentials = false;
                }
                base.Url = value;
            }
        }
        
        public new bool UseDefaultCredentials {
            get {
                return base.UseDefaultCredentials;
            }
            set {
                base.UseDefaultCredentials = value;
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        /// <remarks/>
        public event IngresoAutomaticoOrdenesCompletedEventHandler IngresoAutomaticoOrdenesCompleted;
        
        /// <remarks/>
        [SoapDocumentMethod("", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Bare)]
        [return: XmlElement("IngresoAutomaticoOrdenesResponse", Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
        public IngresoAutomaticoOrdenesResponse IngresoAutomaticoOrdenes([XmlElement("IngresoAutomaticoOrdenes", Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")] IngresoAutomaticoOrdenes IngresoAutomaticoOrdenes1) {
            object[] results = this.Invoke("IngresoAutomaticoOrdenes", new object[] {
                        IngresoAutomaticoOrdenes1});
            return ((IngresoAutomaticoOrdenesResponse)(results[0]));
        }
        
        /// <remarks/>
        public void IngresoAutomaticoOrdenesAsync(IngresoAutomaticoOrdenes IngresoAutomaticoOrdenes1) {
            this.IngresoAutomaticoOrdenesAsync(IngresoAutomaticoOrdenes1, null);
        }
        
        /// <remarks/>
        public void IngresoAutomaticoOrdenesAsync(IngresoAutomaticoOrdenes IngresoAutomaticoOrdenes1, object userState) {
            if ((this.IngresoAutomaticoOrdenesOperationCompleted == null)) {
                this.IngresoAutomaticoOrdenesOperationCompleted = new System.Threading.SendOrPostCallback(this.OnIngresoAutomaticoOrdenesOperationCompleted);
            }
            this.InvokeAsync("IngresoAutomaticoOrdenes", new object[] {
                        IngresoAutomaticoOrdenes1}, this.IngresoAutomaticoOrdenesOperationCompleted, userState);
        }
        
        private void OnIngresoAutomaticoOrdenesOperationCompleted(object arg) {
            if ((this.IngresoAutomaticoOrdenesCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.IngresoAutomaticoOrdenesCompleted(this, new IngresoAutomaticoOrdenesCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        public new void CancelAsync(object userState) {
            base.CancelAsync(userState);
        }
        
        private bool IsLocalFileSystemWebService(string url) {
            if (((url == null) 
                        || (url == string.Empty))) {
                return false;
            }
            System.Uri wsUri = new System.Uri(url);
            if (((wsUri.Port >= 1024) 
                        && (string.Compare(wsUri.Host, "localHost", System.StringComparison.OrdinalIgnoreCase) == 0))) {
                return true;
            }
            return false;
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(AnonymousType=true, Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class IngresoAutomaticoOrdenes {
        
        private IngresoAutomaticoOrdenesInput ingresoAutomaticoOrdenesInputField;
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, IsNullable=true)]
        public IngresoAutomaticoOrdenesInput IngresoAutomaticoOrdenesInput {
            get {
                return this.ingresoAutomaticoOrdenesInputField;
            }
            set {
                this.ingresoAutomaticoOrdenesInputField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class IngresoAutomaticoOrdenesInput {
        
        private string palabraClaveField;
        
        private IngresoAutomaticoOrdenesInputPunta puntaField;
        
        private float precioField;
        
        private bool precioFieldSpecified;
        
        private System.DateTime horaTransaccionField;
        
        private IngresoAutomaticoOrdenesInputTipo tipoField;
        
        private string duracionField;
        
        private System.DateTime vigenciaField;
        
        private bool vigenciaFieldSpecified;
        
        private int cantidadMinimaField;
        
        private bool cantidadMinimaFieldSpecified;
        
        private string numeroCuentaField;
        
        private IngresoAutomaticoOrdenesInputTipoCuenta tipoCuentaField;
        
        private bool tipoCuentaFieldSpecified;
        
        private IngresoAutomaticoOrdenesInputAccionEnDesconexion accionEnDesconexionField;
        
        private bool accionEnDesconexionFieldSpecified;
        
        private IngresoAutomaticoOrdenesInputTipoSeguimiento tipoSeguimientoField;
        
        private bool tipoSeguimientoFieldSpecified;
        
        private string especieEnSeguimientoField;
        
        private string ruedaEspecieEnSeguimientoField;
        
        private IngresoAutomaticoOrdenesInputAccion accionField;
        
        private string idOrdenField;
        
        private string idOrigenField;
        
        private Parte[] parteField;
        
        private InstruccionMostrada instruccionMostradaField;
        
        private Instrumento[] instrumentoField;
        
        private CantidadAcciones[] cantidadAccionesField;
        
        private PrecioTrigger precioTriggerField;
        
        private Rendimiento rendimientoField;
        
        private ParametroEstrategico[] parametroEstrategicoField;
        
        private Informacion[] informacionField;
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string PalabraClave {
            get {
                return this.palabraClaveField;
            }
            set {
                this.palabraClaveField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public IngresoAutomaticoOrdenesInputPunta Punta {
            get {
                return this.puntaField;
            }
            set {
                this.puntaField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public float Precio {
            get {
                return this.precioField;
            }
            set {
                this.precioField = value;
            }
        }
        
        /// <remarks/>
        [XmlIgnore()]
        public bool PrecioSpecified {
            get {
                return this.precioFieldSpecified;
            }
            set {
                this.precioFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public System.DateTime HoraTransaccion {
            get {
                return this.horaTransaccionField;
            }
            set {
                this.horaTransaccionField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public IngresoAutomaticoOrdenesInputTipo Tipo {
            get {
                return this.tipoField;
            }
            set {
                this.tipoField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string Duracion {
            get {
                return this.duracionField;
            }
            set {
                this.duracionField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public System.DateTime Vigencia {
            get {
                return this.vigenciaField;
            }
            set {
                this.vigenciaField = value;
            }
        }
        
        /// <remarks/>
        [XmlIgnore()]
        public bool VigenciaSpecified {
            get {
                return this.vigenciaFieldSpecified;
            }
            set {
                this.vigenciaFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public int CantidadMinima {
            get {
                return this.cantidadMinimaField;
            }
            set {
                this.cantidadMinimaField = value;
            }
        }
        
        /// <remarks/>
        [XmlIgnore()]
        public bool CantidadMinimaSpecified {
            get {
                return this.cantidadMinimaFieldSpecified;
            }
            set {
                this.cantidadMinimaFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string NumeroCuenta {
            get {
                return this.numeroCuentaField;
            }
            set {
                this.numeroCuentaField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public IngresoAutomaticoOrdenesInputTipoCuenta TipoCuenta {
            get {
                return this.tipoCuentaField;
            }
            set {
                this.tipoCuentaField = value;
            }
        }
        
        /// <remarks/>
        [XmlIgnore()]
        public bool TipoCuentaSpecified {
            get {
                return this.tipoCuentaFieldSpecified;
            }
            set {
                this.tipoCuentaFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public IngresoAutomaticoOrdenesInputAccionEnDesconexion AccionEnDesconexion {
            get {
                return this.accionEnDesconexionField;
            }
            set {
                this.accionEnDesconexionField = value;
            }
        }
        
        /// <remarks/>
        [XmlIgnore()]
        public bool AccionEnDesconexionSpecified {
            get {
                return this.accionEnDesconexionFieldSpecified;
            }
            set {
                this.accionEnDesconexionFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public IngresoAutomaticoOrdenesInputTipoSeguimiento TipoSeguimiento {
            get {
                return this.tipoSeguimientoField;
            }
            set {
                this.tipoSeguimientoField = value;
            }
        }
        
        /// <remarks/>
        [XmlIgnore()]
        public bool TipoSeguimientoSpecified {
            get {
                return this.tipoSeguimientoFieldSpecified;
            }
            set {
                this.tipoSeguimientoFieldSpecified = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string EspecieEnSeguimiento {
            get {
                return this.especieEnSeguimientoField;
            }
            set {
                this.especieEnSeguimientoField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string RuedaEspecieEnSeguimiento {
            get {
                return this.ruedaEspecieEnSeguimientoField;
            }
            set {
                this.ruedaEspecieEnSeguimientoField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public IngresoAutomaticoOrdenesInputAccion Accion {
            get {
                return this.accionField;
            }
            set {
                this.accionField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string IdOrden {
            get {
                return this.idOrdenField;
            }
            set {
                this.idOrdenField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string IdOrigen {
            get {
                return this.idOrigenField;
            }
            set {
                this.idOrigenField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement("Parte", Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public Parte[] Parte {
            get {
                return this.parteField;
            }
            set {
                this.parteField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public InstruccionMostrada InstruccionMostrada {
            get {
                return this.instruccionMostradaField;
            }
            set {
                this.instruccionMostradaField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement("Instrumento", Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public Instrumento[] Instrumento {
            get {
                return this.instrumentoField;
            }
            set {
                this.instrumentoField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement("CantidadAcciones", Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public CantidadAcciones[] CantidadAcciones {
            get {
                return this.cantidadAccionesField;
            }
            set {
                this.cantidadAccionesField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public PrecioTrigger PrecioTrigger {
            get {
                return this.precioTriggerField;
            }
            set {
                this.precioTriggerField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public Rendimiento Rendimiento {
            get {
                return this.rendimientoField;
            }
            set {
                this.rendimientoField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement("ParametroEstrategico", Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public ParametroEstrategico[] ParametroEstrategico {
            get {
                return this.parametroEstrategicoField;
            }
            set {
                this.parametroEstrategicoField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement("Informacion", Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public Informacion[] Informacion {
            get {
                return this.informacionField;
            }
            set {
                this.informacionField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [XmlType(AnonymousType=true, Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public enum IngresoAutomaticoOrdenesInputPunta {
        
        /// <remarks/>
        [XmlEnum("1")]
        Item1,
        
        /// <remarks/>
        [XmlEnum("2")]
        Item2,
        
        /// <remarks/>
        [XmlEnum("5")]
        Item5,
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [XmlType(AnonymousType=true, Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public enum IngresoAutomaticoOrdenesInputTipo {
        
        /// <remarks/>
        [XmlEnum("1")]
        Item1,
        
        /// <remarks/>
        [XmlEnum("2")]
        Item2,
        
        /// <remarks/>
        T,
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [XmlType(AnonymousType=true, Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public enum IngresoAutomaticoOrdenesInputTipoCuenta {
        
        /// <remarks/>
        [XmlEnum("3")]
        Item3,
        
        /// <remarks/>
        [XmlEnum("4001")]
        Item4001,
        
        /// <remarks/>
        [XmlEnum("4002")]
        Item4002,
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [XmlType(AnonymousType=true, Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public enum IngresoAutomaticoOrdenesInputAccionEnDesconexion {
        
        /// <remarks/>
        [XmlEnum("1")]
        Item1,
        
        /// <remarks/>
        [XmlEnum("2")]
        Item2,
        
        /// <remarks/>
        [XmlEnum("3")]
        Item3,
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [XmlType(AnonymousType=true, Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public enum IngresoAutomaticoOrdenesInputTipoSeguimiento {
        
        /// <remarks/>
        [XmlEnum("1")]
        Item1,
        
        /// <remarks/>
        [XmlEnum("2")]
        Item2,
        
        /// <remarks/>
        [XmlEnum("3")]
        Item3,
        
        /// <remarks/>
        [XmlEnum("4")]
        Item4,
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [XmlType(AnonymousType=true, Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public enum IngresoAutomaticoOrdenesInputAccion {
        
        /// <remarks/>
        [XmlEnum("0")]
        Item0,
        
        /// <remarks/>
        [XmlEnum("1")]
        Item1,
        
        /// <remarks/>
        [XmlEnum("3")]
        Item3,
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class Parte {
        
        private string idField;
        
        private string rolField;
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string Id {
            get {
                return this.idField;
            }
            set {
                this.idField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string Rol {
            get {
                return this.rolField;
            }
            set {
                this.rolField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class Error {
        
        private string codigoField;
        
        private string descripcionField;
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string Codigo {
            get {
                return this.codigoField;
            }
            set {
                this.codigoField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string Descripcion {
            get {
                return this.descripcionField;
            }
            set {
                this.descripcionField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class IngresoAutomaticoOrdenesOutput {
        
        private Instrumento instrumentoField;
        
        private string idOrdenField;
        
        private string palabraClaveField;
        
        private IngresoAutomaticoOrdenesOutputPunta puntaField;
        
        private string estadoDetalleField;
        
        private IngresoAutomaticoOrdenesOutputAccion accionField;
        
        private Error errorField;
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public Instrumento Instrumento {
            get {
                return this.instrumentoField;
            }
            set {
                this.instrumentoField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string IdOrden {
            get {
                return this.idOrdenField;
            }
            set {
                this.idOrdenField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string PalabraClave {
            get {
                return this.palabraClaveField;
            }
            set {
                this.palabraClaveField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public IngresoAutomaticoOrdenesOutputPunta Punta {
            get {
                return this.puntaField;
            }
            set {
                this.puntaField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string EstadoDetalle {
            get {
                return this.estadoDetalleField;
            }
            set {
                this.estadoDetalleField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public IngresoAutomaticoOrdenesOutputAccion Accion {
            get {
                return this.accionField;
            }
            set {
                this.accionField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public Error Error {
            get {
                return this.errorField;
            }
            set {
                this.errorField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class Instrumento {
        
        private string codigoEspecieField;
        
        private InstrumentoTipoMercado tipoMercadoField;
        
        private string idTableroField;
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string CodigoEspecie {
            get {
                return this.codigoEspecieField;
            }
            set {
                this.codigoEspecieField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public InstrumentoTipoMercado TipoMercado {
            get {
                return this.tipoMercadoField;
            }
            set {
                this.tipoMercadoField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string IdTablero {
            get {
                return this.idTableroField;
            }
            set {
                this.idTableroField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [XmlType(AnonymousType=true, Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public enum InstrumentoTipoMercado {
        
        /// <remarks/>
        CS,
        
        /// <remarks/>
        OOF,
        
        /// <remarks/>
        PZFJ,
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [XmlType(AnonymousType=true, Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public enum IngresoAutomaticoOrdenesOutputPunta {
        
        /// <remarks/>
        [XmlEnum("1")]
        Item1,
        
        /// <remarks/>
        [XmlEnum("2")]
        Item2,
        
        /// <remarks/>
        [XmlEnum("5")]
        Item5,
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [XmlType(AnonymousType=true, Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public enum IngresoAutomaticoOrdenesOutputAccion {
        
        /// <remarks/>
        [XmlEnum("0")]
        Item0,
        
        /// <remarks/>
        [XmlEnum("1")]
        Item1,
        
        /// <remarks/>
        [XmlEnum("3")]
        Item3,
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class Informacion {
        
        private string idField;
        
        private string tipoField;
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string Id {
            get {
                return this.idField;
            }
            set {
                this.idField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string Tipo {
            get {
                return this.tipoField;
            }
            set {
                this.tipoField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class ParametroEstrategico {
        
        private string nombreField;
        
        private string tipoField;
        
        private string valorField;
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string Nombre {
            get {
                return this.nombreField;
            }
            set {
                this.nombreField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string Tipo {
            get {
                return this.tipoField;
            }
            set {
                this.tipoField = value;
            }
        }
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string Valor {
            get {
                return this.valorField;
            }
            set {
                this.valorField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class Rendimiento {
        
        private double rendimiento1Field;
        
        /// <remarks/>
        [XmlElement("Rendimiento", Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public double Rendimiento1 {
            get {
                return this.rendimiento1Field;
            }
            set {
                this.rendimiento1Field = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class PrecioTrigger {
        
        private double precioField;
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public double Precio {
            get {
                return this.precioField;
            }
            set {
                this.precioField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class CantidadAcciones {
        
        private int cantidadField;
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public int Cantidad {
            get {
                return this.cantidadField;
            }
            set {
                this.cantidadField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class InstruccionMostrada {
        
        private string cantidadMostradaField;
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string CantidadMostrada {
            get {
                return this.cantidadMostradaField;
            }
            set {
                this.cantidadMostradaField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.7.3056.0")]
    [Serializable()]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    [XmlType(AnonymousType=true, Namespace="http://www.corredores.com/BVC-IngresoAutomaticoOrdenes")]
    public partial class IngresoAutomaticoOrdenesResponse {
        
        private IngresoAutomaticoOrdenesOutput ingresoAutomaticoOrdenesOutputField;
        
        /// <remarks/>
        [XmlElement(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, IsNullable=true)]
        public IngresoAutomaticoOrdenesOutput IngresoAutomaticoOrdenesOutput {
            get {
                return this.ingresoAutomaticoOrdenesOutputField;
            }
            set {
                this.ingresoAutomaticoOrdenesOutputField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.3056.0")]
    public delegate void IngresoAutomaticoOrdenesCompletedEventHandler(object sender, IngresoAutomaticoOrdenesCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.3056.0")]
    [DebuggerStepThrough()]
    [DesignerCategory("code")]
    public partial class IngresoAutomaticoOrdenesCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal IngresoAutomaticoOrdenesCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public IngresoAutomaticoOrdenesResponse Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((IngresoAutomaticoOrdenesResponse)(this.results[0]));
            }
        }
    }
}

#pragma warning restore 1591
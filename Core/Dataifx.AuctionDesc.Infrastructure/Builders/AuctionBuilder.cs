#region Header

// /*------------------------------------------------------------
//   <copyright file ="AuactionBuilder.cs" company="DATA IFX">
//   </copyright>
//   <Summary>
//   Clase qe construye un objeto Auction
//   </Summary>
// ------------------------------------------------------------*/

#endregion

#region Dependencies



#endregion

namespace Dataifx.AuctionDesc.Infrastructure.Builders
{
    public class AuctionBuilder
    {
        private string _action = string.Empty;
        private bool _activePrice;
        private double _maxLimitPx = 0;
        private double _minLimitPx = 0;
        private string _mnemonic = string.Empty;
       
        private double _targetPrice = 0;

      

        /// <summary>
        /// Construye objeto por defecto
        /// </summary>
        /// <returns></returns>
    
        /// <summary>
        /// Construye objeto con propiedad Action
        /// </summary>
        /// <param name="value">Valor a establecer</param>
        /// <returns></returns>
        public AuctionBuilder WithAction(string value)
        {
            this._action = value;
            return this;
        }

        /// <summary>
        /// Construye objeto con propiedad Price
        /// </summary>
        /// <param name="value">Valor a establecer</param>
        /// <returns></returns>
        public AuctionBuilder WithActivePrice(bool value)
        {
            this._activePrice = value;
            return this;
        }

        /// <summary>
        /// Construye objeto con propiedad Nemonic
        /// </summary>
        /// <param name="value">Valor a establecer</param>
        /// <returns></returns>
        public AuctionBuilder WithNemonic(string value)
        {
            this._mnemonic = value;
            return this;
        }

        /// <summary>
        /// Construye objeto con propiedad MaxLimit
        /// </summary>
        /// <param name="value">Valor a establecer</param>
        /// <returns></returns>
        public AuctionBuilder WithMaxLimit(double value)
        {
            this._maxLimitPx = value;
            return this;
        }

        /// <summary>
        /// Construye objeto con propiedad MinLimit
        /// </summary>
        /// <param name="value">Valor a establecer</param>
        /// <returns></returns>
        public AuctionBuilder WithMinLimit(double value)
        {
            this._minLimitPx = value;
            return this;
        }

        /// <summary>
        /// Construye objeto con propiedad targetPrice
        /// </summary>
        /// <param name="value">Valor a establecer</param>
        /// <returns></returns>
        public AuctionBuilder WithTargetPrice(double value)
        {
            this._targetPrice = value;
            return this;
        }
    }
}
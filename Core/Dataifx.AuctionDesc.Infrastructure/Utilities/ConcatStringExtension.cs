using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;
using System.Windows.Markup;

namespace Dataifx.Trading.Infrastructure.Util
{
    public class ConcatStringExtension : MarkupExtension 
    {
        //Converter to generate the string
        public class ConcatString : IValueConverter 
        {
            
            public string InitString { get; set; }

            #region IValueConverter Members
            public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
            {
                //append the string
                return InitString + value.ToString();
            }
            public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
            {
                throw new NotImplementedException();
            }
            #endregion
        }
        //the value to bind to
        public Binding BindTo { get; set; }
        //the string to attach in front of the value
        public string AttachString { get; set; }

       // public Binding BindUno { get; set; }

        public static DependencyProperty HeaderTextProperty = DependencyProperty.Register(
         "HeaderText", typeof(string), typeof(ConcatString), null);


        public string HeaderText { get; set; }
        //{
        //    get { return (string)GetValue(HeaderTextProperty); }
        //    set { SetValue(HeaderTextProperty, value); }
        //}

        public override object ProvideValue(IServiceProvider serviceProvider)
        {
            //modify the binding by setting the converter
            //string s = BindUno.ToString();
            BindTo.Converter = new ConcatString { InitString = HeaderText };
            return BindTo.ProvideValue(serviceProvider);
        }
    } 

}

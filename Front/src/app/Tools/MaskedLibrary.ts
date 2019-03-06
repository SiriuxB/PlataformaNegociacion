import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

export class GenerateMask {
    public static numberMask = createNumberMask({
        prefix: '',
        suffix: '',
        thousandsSeparatorSymbol: '.',
        allowDecimal: false
    })
    public static Nodecimal = createNumberMask({
        prefix: '',
        suffix: '',
        thousandsSeparatorSymbol: '',
        allowDecimal: false

    })
    public static DateMask = createAutoCorrectedDatePipe('mm/dd/yyyy')


 
}



import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export class MaskMoney {


    public static OnlyTwoDecimals(x: any): number {
        x = x.toString();
        x = x.slice(0, (x.indexOf(".")) + 3);
        return Number(x);
    }
    public static OnlyNumberForSend(x: any, $simbol: boolean = false) {
        if ($simbol) { x = (x.toString()).replace("$", "") }
        return Number((x.toString()).replace(/,/g, ""))
    }

    public static MaskedDollarPrice(): [any] {
        const numberMask = createNumberMask({
            thousandsSeparatorSymbol: ',',
            allowDecimal: true

        })
        return numberMask
    }

    public static MaskedCoPrice(): [any] {
        const numberMask = createNumberMask({
            prefix: '',
            thousandsSeparatorSymbol: ',',
            allowDecimal: true,
            decimalLimit: 2,
        })

        return numberMask
    }
    public static MaskedDollarPrice2(): [any] {
        const numberMask = createNumberMask({
            thousandsSeparatorSymbol: ',',
            allowDecimal: true,
            allowLeadingZeroes: false
        })
        return numberMask
    }

    public static MaskedInt(): [any] {
        const numberMask = createNumberMask({
            prefix: '',
            thousandsSeparatorSymbol: ',',
            allowDecimal: false

        })
        return numberMask
    }

    public static pad(n) {
        let decimalsRegex = /\.([0-9]{1,2})/;
        let result = decimalsRegex.exec(n);
        if (String(n).indexOf(".") == -1) {
            n = n + ".00"
            return n;
        }
        if (n[n.length] == ".") {
            n = n + "00"
            return n;
        }
        if (result != null && result && result[1].length < 2) {
            n = n + "0"
            return n;
        } else if (!result) {
            n = n + "00"
            return n;
        }
        return n;
    }
}
//core
import { Component, OnDestroy, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, AbstractControl, ValidationErrors, Validators, ValidatorFn } from '@angular/forms'
import { AppEnumerations } from 'app/enumerations/appEnumerations';
import { MaskMoney } from 'app/Tools/MaskMoney';
import * as _ from 'lodash';

@Component({
	moduleId: module.id,
	selector: 'Boleta-Venta',
	templateUrl: './Boleta-Venta.component.html',
	styleUrls: ['Boleta-Venta.component.css'],

})

export class BoletaVentaComponent implements OnInit {
	Productos: any = []
	productoSeleccionado: number = 0
	public MaskingInt = [];
	public MaskingPrice = [];
	form: FormGroup;
	FechaInicio: Date;
	FechaFin: Date;
	constructor(private formBuilder: FormBuilder, ) {

	}

	ngOnInit(): void {
		this.MaskingPrice = MaskMoney.MaskedCoPrice();
		this.MaskingInt = MaskMoney.MaskedInt();
		this.Productos = AppEnumerations.Productos

		this.form = this.formBuilder.group({
			Cantidad: ['', [Validators.required]],
			Precio: ['', [Validators.required]],
			ProductoSeleccionado: ['', [Validators.required]],
			FechaInicio: new FormControl(this.FechaInicio, [Validators.required]),
			FechaFin: ['', [Validators.required]],

		}, { validator: ValidadorFechas });
	}

	cambiarEstiloreloj(event) {
		var x = document.querySelector("owl-date-time-container") as any;
		x.style.fontSize = "16px"
		console.log(event)
	}
}

export function ValidadorFechas(c: AbstractControl) {
	if (c.get('FechaInicio').value < c.get('FechaFin').value) {
		c.get('FechaInicio').setErrors(null)
		c.get('FechaFin').setErrors(null)
		return null
	}
	else {
		c.get('FechaInicio').setErrors({ invalidEndDate: true })
		c.get('FechaFin').setErrors({ invalidEndDate: true })
	}
	return null
}
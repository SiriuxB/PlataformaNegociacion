//core
import { Component, OnDestroy, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, AbstractControl, ValidationErrors, Validators } from '@angular/forms'

@Component({
	moduleId: module.id,
	selector: 'Boleta-Venta',
	templateUrl: './Boleta-Venta.component.html',
	styleUrls: ['Boleta-Venta.component.css'],
	
})

export class BoletaVentaComponent implements OnInit, OnDestroy {
	ngOnDestroy(): void {
	}
	ngOnInit(): void {
	}

	cambiarEstiloreloj(event)
	{
		var x =document.querySelector("owl-date-time-container") as any;
		x.style.fontSize = "16px"
		console.log(event)
	}
}
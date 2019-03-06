import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { MapFields, FieldObj } from './Mapfields';
import { MatDialog } from '@angular/material';
import { MapDialogComponent } from '../Map-Dialog-Options/Map-Dialog-Options.component';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { ReunionService } from '../../../../../ApiServices/ReunionService';
import { E_Reunion } from '../../../../../Models/E_Reunion';
import { Platform } from '@angular/cdk/platform';
import { NavigationInfoService } from '../../../../../ApiServices/NavigationInfoService';
import { Router } from '@angular/router';
import { ImageService } from '../../../../../ApiServices/ImageServices';
import { E_Imagen } from '../../../../../Models/E_Imagen';

@Component({
    selector: 'Map-content',
    templateUrl: './Map-content.component.html',
    styleUrls: ['./Map-content.component.scss']
})
export class MapContentComponent implements OnInit {
    imageSources: Array<E_Imagen> = new Array<E_Imagen>()
    rows = [];
    ReunionInfo: E_Reunion[];
    slideIndex: number = 0
    public filteredStates2$: Observable<Array<E_Departamentos[]>>;
    stateCtrl: FormControl = new FormControl();
    CounterReunion: Array<E_Reunion> = new Array<E_Reunion>()
    ListDepartamentos: E_Departamentos[];
    Fields: Array<FieldObj> = MapFields.Fields()
    MobileApp: boolean = false
    constructor(public dialog: MatDialog,
        private ParameterService: ParameterService,
        private ReunionService: ReunionService,
        private ImageService: ImageService,
        private platform: Platform, private NavigationInfoService: NavigationInfoService, private Router: Router) {


        this.ObtenerReuniones();
        if (this.platform.ANDROID || this.platform.IOS) {
            this.MobileApp = true
        }

        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
                this.ReunionService.ContarReuniones().subscribe(
                    (x: Array<E_Reunion>) => {
                      //  var filtered = x.filter((x) => { x.Estado == true })
                        
                        this.setChangedFields(x)
                    }
                )
            })
        this.filteredStates2$ = this.stateCtrl.valueChanges.pipe(
            startWith(''),
            map(name => this.filterStatesComplex(name))
        )


    }

    ObtenerReuniones() {

        //ObjReu.Id_Departamento = this.DatoDepto
        this.ReunionService.ContarReuniones().subscribe((x) => {
            ;
            if (x != null && x != undefined)
                this.rows = x.slice(0, 3);
        }


        )
    }


    abrireventos(par: any) {
        ;
        this.NavigationInfoService.storage = par
        this.Router.navigate(["/eventvisor"])
    }

    displayFn(user?: E_Departamentos): string | undefined {
        return user ? user.Nombre : undefined;
    }

    SeleccionarDepto(Y) {

        console.log(Y.value)
        var idfiels = this.Fields.find(x => x.idBd == Y.value).id
        this.DepartamentoSeleccionado(idfiels, true)

    }
    BogotaSelect(y: number) {
        var depto = this.ListDepartamentos.find(x => x.Codigo == y.toString())
        var NumeroEventos = this.ReunionInfo.find(x => x.Id_Departamento == Number(depto.Codigo)) != undefined ?
            this.ReunionInfo.find(x => x.Id_Departamento == Number(depto.Codigo)).total : 0
        var data = { NumeroEventos: NumeroEventos, Nombre: depto.Nombre, CodigoDepto: depto.Codigo, IdDepto: depto.Id }
        this.openDialog(data)
    }
    filterStatesComplex(val: any): any[] {

        var TextX = typeof val == "object" ? val.Nombre : val

        return val ?
            this.ListDepartamentos.filter(s => s.Nombre.toLowerCase().indexOf(TextX.toLowerCase()) === 0)
            : this.ListDepartamentos;

    }


    ngOnInit(): void {

    }





    plusDivs(n) {
        this.showDivs(this.slideIndex += n);
    }

    showDivs(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        if (n > x.length) { this.slideIndex = 1 }
        if (n < 1) { this.slideIndex = x.length }
        for (i = 0; i < x.length; i++) {
            x[i].setAttribute("display", "none")
        }
        x[i].setAttribute("display", "block")
    }


    setChangedFields(x: Array<E_Reunion>) {
        var that = this
        var y = x
        this.Fields.forEach(function (obj) {
            
            if (that.ListDepartamentos.some((x) => x.Codigo == obj.idBd.toString())) {
                var CodigoDepto = that.ListDepartamentos.find((x) => x.Codigo == obj.idBd.toString()).Id

                if (y.some((x) => x.Id_Departamento == CodigoDepto)) {
                    obj.NumeroReuniones = y.find((x) => x.Id_Departamento == CodigoDepto).total
                }
            }

        })
        this.ReunionInfo = x
    }
    handleMouseMove(event) {

        var countryId = event.target.id;
        var tooltip = document.getElementById("tooltip");
        var tooltip1 = document.getElementById("tooltip1");
        var TextX = '';
        var NUmero = ""
        if (!(this.Fields.some(x => x.id == countryId))) {
            tooltip.classList.remove("active");
            tooltip1.classList.remove("active");
            return
        }

        TextX = this.Fields.find(x => x.id == countryId).Nombre
        NUmero = this.Fields.find(x => x.id == countryId).NumeroReuniones.toString()
        var x = event.clientX;
        var y = event.clientY;

        tooltip.style.left = (x + 20) + "px";
        tooltip.style.top = (y - 20) + "px";
        tooltip.innerHTML = TextX;
        tooltip.classList.add("active");
        tooltip1.style.left = (x + 20) + "px";
        tooltip1.style.top = (y) + "px";
        tooltip1.innerHTML = " Numero de Eventos " + NUmero;
        tooltip1.classList.add("active");

    }

    DepartamentoSeleccionado(x: any, Internal: boolean = false) {

        var y = Internal ? x : x.currentTarget.id
        var TextX = this.Fields.find(x => x.id == y).Nombre
        var NUmero = this.Fields.find(x => x.id == y).NumeroReuniones.toString()
        var CodigoDepto = this.Fields.find(x => x.id == y).idBd
        var IdDepto = this.ListDepartamentos.find(x => x.Codigo == CodigoDepto.toString()).Id
        var data = { NumeroEventos: NUmero, Nombre: TextX, CodigoDepto: CodigoDepto, IdDepto: IdDepto }

        this.openDialog(data)
    }
    openDialog(data: any) {
        // 
        const dialogRef = this.dialog.open(MapDialogComponent, {
            height: '350px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
}

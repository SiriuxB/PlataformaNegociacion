import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_TipoReunion } from 'app/Models/E_TipoReunion';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';

import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AppSettings } from 'app/app.settings';
import { ImageService } from 'app/ApiServices/ImageServices';
import { ReunionBuilder } from 'app/Builders/Reunion.model.builder';
import { ReunionService } from 'app/ApiServices/ReunionService';
import { Router } from '@angular/router';
import { E_Municipios } from 'app/Models/E_Municipios';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { E_ZonaElectoral } from '../../../../Models/E_ZonaElectoral';
import { E_PuestoVotacion } from 'app/Models/E_PuestoVotacion';
import { E_Mesa } from 'app/Models/E_Mesa';
import { E_DirectorDepartamento } from 'app/Models/E_DirectorDepartamento';
import { E_GerenteSector } from 'app/Models/E_GerenteSector';
import { IndividuoServices } from '../../../../ApiServices/IndividuoServices';
import { E_ReporteIndividuo2 } from '../../../../Models/E_ReporteIndividuo2';
import { UserService } from 'app/ApiServices/UserService';

@Component({
    moduleId: module.id,
    selector: 'ReporteIndividuo2FromDirector',
    templateUrl: 'ReporteIndividuo2FromDirector.component.html',
    styleUrls: ['ReporteIndividuo2FromDirector.component.scss']
})
export class ReporteIndividuo2FromDirectorComponent implements OnInit {
    CodigoDepto: string;
    DirectorSeleccionado: E_DirectorDepartamento;
    MunicipiosBase: E_Municipios[];
    SearchTypeAdvance: boolean = true
    SelectedMesas: any;
    SelectedPuestos: any;
    SelectedZonas: any;
    SelectedDirector: any;
    SelectedGerente: any;
    SelectedMunicipio: any;
    ReporteList: E_ReporteIndividuo2[];
    Municipios: E_Municipios[];
    Zonas: E_ZonaElectoral[];
    Puestos: E_PuestoVotacion[];
    Mesas: E_Mesa[];
    Gerentes: E_GerenteSector[];
    Directores: E_DirectorDepartamento[];
    SelectedDepto: any
    DepartamentosPivot: E_Departamentos[];
    FechaInicio: any
    FechaFin: any
    rows = [];
    public DepartamentoSeleccionado: string = ""
    public MunicipioSeleccionado: string = ""
    public ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    public ListMunicipiosBase: Array<E_Municipios> = new Array<E_Municipios>()
    public ListMunicipiosGroup: Array<E_Municipios> = new Array<E_Municipios>()
    public nombrefil: string;
    public cedula: string;
    public Aprobada: number;
    selected = [];
    loadingIndicator = true;
    reorderable = true;
    DeptoName = ""
    DatoDepto: any
    ListImage: Array<E_Imagen> = new Array<E_Imagen>();
    constructor(private NavigationData: NavigationInfoService,
        private ParameterService: ParameterService,
        private Router: Router,
        private AdminServices: AdminServices,
        private IndividuoServices: IndividuoServices,
        private UserService: UserService,public navigation:NavigationInfoService) {
            if (this.NavigationData.storage == undefined) {}
    }




    SelectedDepartamento(selected) {
        debugger
        if (this.SearchTypeAdvance) {
            this.ParameterService.ListarMunicipios().subscribe((x: Array<E_Municipios>) => {
                debugger
                this.Municipios = x.filter((y) => y.Id_Departamento == Number(selected.value.Codigo))
            })
        }
        this.AdminServices.ListarGerentesSector().subscribe((x: Array<E_GerenteSector>) => {
            this.Gerentes = x.filter((y) => y.Id_Departamento == selected.value.Id)
        })

    }
    ChangePuesto(selected) {
        var objMesas: E_Mesa = new E_Mesa()
        objMesas.Id_puestoVotacion = selected.value
        if (selected.value = 0) {
            this.Mesas = []
        }
        else {
            this.ParameterService.listarMesasxPuesto(objMesas)
                .subscribe((x: Array<E_Mesa>) => {
                    this.Mesas = x
                })
        }
    }
    ChangeZonas(selected) {
        var objPues: E_PuestoVotacion = new E_PuestoVotacion()
        objPues.Id_ZonaElectoral = selected.value
        if (selected.value = 0) {
            this.Puestos = []
        }
        else {
            this.ParameterService.listarPuestosVotacionxZona(objPues)
                .subscribe((x: Array<E_PuestoVotacion>) => {

                    this.Puestos = x
                })
        }
    }

    ChangeMunicipio(selected) {
        var objZona: E_ZonaElectoral = new E_ZonaElectoral()
        objZona.Id_Municipio = selected.value
        if (selected.value = 0) {
            this.Zonas = []
        }
        else {
            this.ParameterService.listarZonasxMunicipio(objZona)
                .subscribe((x: Array<E_ZonaElectoral>) => {
                    this.Zonas = x
                })
        }
    }
    ChangeGerente(selected) {
        if (this.SearchTypeAdvance) {

        }
        var objGer: E_DirectorDepartamento = new E_DirectorDepartamento()
        objGer.Id_GerenteSector = selected.value
        this.AdminServices.ListarDirectorDeptoxGerente(objGer)
            .subscribe((x: Array<E_DirectorDepartamento>) => {
                this.Directores = x
            })
    }
    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpagealtagerencia'])
    }
    ngOnInit(): void {
        var objGer: E_DirectorDepartamento = new E_DirectorDepartamento()
        objGer.Correo = this.UserService.GetCurrentCurrentUserNow().UserName
        this.AdminServices.directorxCorreo(objGer)
            .mergeMap((x: E_DirectorDepartamento) => {
                this.SelectedDirector = x.Id
                this.SelectedGerente = x.Id_GerenteSector
                this.SelectedDepto = x.Id_departamento
                var objDir: E_DirectorDepartamento = new E_DirectorDepartamento()
                objDir.Id_GerenteSector = this.SelectedGerente
                return this.ParameterService.listarDepartamentos()
            }).mergeMap((x: Array<E_Departamentos>) => {
                this.CodigoDepto = ""
                if (x.some((y) => y.Id == this.SelectedDepto)) {
                    this.CodigoDepto = x.find((y) => y.Id == this.SelectedDepto).Codigo
                }
                return this.ParameterService.ListarMunicipios()
            }).subscribe((x: Array<E_Municipios>) => {
                this.Municipios = x.filter((y) => y.Id_Departamento == Number(this.CodigoDepto))
            })
        this.SearchTypeAdvance = false
        this.chargeParamsBasic()
    }

    chargeParamsAdvance() {

        //  this.AdminServices.ListarAllDirectorDepto()
        //    .mergeMap((x) => {
        //        this.Directores = x
        //       return this.AdminServices.ListarGerentesSector()
        //  })
        //    .mergeMap((x) => {
        //    this.Gerentes = x

        //     .mergeMap((x) => {
        //           this.DepartamentosPivot = x
        //       return this.ParameterService.ListarMunicipios()
        //       })
        //  .subscribe((x) => {
        //         this.Municipios = x
        //  });
    }

    chargeParamsBasic() {
        this.Directores = new Array<E_DirectorDepartamento>()
        this.Gerentes = new Array<E_GerenteSector>()
        this.Puestos = new Array<E_PuestoVotacion>()
        this.Zonas = new Array<E_ZonaElectoral>()
        this.DepartamentosPivot = new Array<E_Departamentos>()
        this.Municipios = new Array<E_Municipios>()
        this.Mesas = new Array<E_Mesa>()


    }
    Search() {
        this.loadingIndicator = true
        var objSearch: E_ReporteIndividuo2 = new E_ReporteIndividuo2()

        this.IndividuoServices.ReporteIndividuo2(this.ValidSearchParams(objSearch))
            .subscribe((x: Array<E_ReporteIndividuo2>) => {
                this.ReporteList = x
                this.loadingIndicator = false
            })
    }
    ValidSearchParams(objSearch: E_ReporteIndividuo2) {
        objSearch.Param_fechafin = this.FechaFin == undefined ? null : this.FechaFin
        objSearch.Param_fechaini = this.FechaInicio == undefined ? null : this.FechaInicio
        objSearch.Param_id_departamento = this.SelectedDepto == undefined || this.SelectedDepto.Id == 0 ?
            null : this.SelectedDepto.Id
        objSearch.Param_id_municipio = this.SelectedMunicipio == undefined || this.SelectedMunicipio == 0 ?
            null : this.SelectedMunicipio
        objSearch.Param_id_director = this.SelectedDirector == undefined || this.SelectedDirector == 0 ?
            null : this.SelectedDirector
        objSearch.Param_id_gerente = this.SelectedGerente == undefined || this.SelectedGerente == 0 ?
            null : this.SelectedGerente
        objSearch.Param_id_zonaelectoral = this.SelectedZonas == undefined || this.SelectedZonas == 0 ?
            null : this.SelectedZonas
        objSearch.Param_id_puestovotacion = this.SelectedPuestos == undefined || this.SelectedPuestos == 0 ?
            null : this.SelectedPuestos
        objSearch.Param_id_mesa = this.SelectedMesas == undefined || this.SelectedMesas == 0 ?
            null : this.SelectedMesas

        return objSearch
    }

    ChangeType() {
        this.SearchTypeAdvance = !this.SearchTypeAdvance
        this.SelectedDepto = 0
        this.SelectedMunicipio = 0
        this.SelectedGerente = 0
        this.SelectedDirector = 0
        this.SelectedZonas = 0
        this.SelectedPuestos = 0
        this.SelectedMesas = 0
        if (this.SearchTypeAdvance == true) {
            this.chargeParamsAdvance()
        } else {
            this.chargeParamsBasic()
        }
    }

    modificar(event:any){
        
        console.log(event);
        this.navigation.reporte2=event;
        this.Router.navigate(['/Individuo2Dir'])

    }
}

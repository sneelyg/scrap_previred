const puppeteer = require("puppeteer");

const scrapPrevired = () => {
    let valores = {};
    (async () => {

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto("https://www.previred.com/indicadores-previsionales/");

        valores.PreviredID = '';
        valores.Fecha = new Date();



        const getPeriodos = await page.evaluate(() => {
            const periodo = document.querySelectorAll(".content"); //acá seleccion todos los DIV que contienen tablas
            let datosPeriodo = [];                                                     //Creo primero para leer tabla de valores de UF
            const tdTablaPeriodo = periodo[1].querySelectorAll("td");                     //Primero leo todos los TD           
            //acá estoy guardando el innerText de cada TD en el Arreglo "datosTablaUF"
            tdTablaPeriodo.forEach((td) => {
                datosPeriodo.push(td.innerHTML);
            });
            return datosPeriodo

        });
        const Periodo = getPeriodos[0].split("Remuneraciones ")[1].split(")")[0].split(' 20')[0];
        const yearPeriod = getPeriodos[0].split("Remuneraciones ")[1].split(")")[0].split(' 20')[1];
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        var mesPeriod = 0;
        for (let k = 0; k < meses.length; k++) {
            if (Periodo == meses[k]) {
                mes = k + 1;
            }
        }
        var mesText = (mes < 10 ? "0" : "") + mes;
        valores.Periodo = Periodo;
        valores.PeriodoMY = `${mesText}20${yearPeriod}`;
        valores.PeriodoYM = `${yearPeriod}${mesText}`;
        valores.PreviredID = `20${yearPeriod}${mesText}`;









        //TABLA UF
        const getTablaUF = await page.evaluate(() => {
            const allTables = document.querySelectorAll(".journal-content-article"); //acá seleccion todos los DIV que contienen tablas
            let datosTablaUF = [];                                                     //Creo primero para leer tabla de valores de UF
            const tdTablaUF = allTables[0].querySelectorAll("td");                     //Primero leo todos los TD           
            //acá estoy guardando el innerText de cada TD en el Arreglo "datosTablaUF"
            tdTablaUF.forEach((td) => {
                datosTablaUF.push(td.innerText);
            });
            return datosTablaUF
        });
        const tablaUF = getTablaUF;
        valores.UFDescPeriodo = getTablaUF[1].replace(/^\D+/g, '').replace(".", "");
        //valores.UFValPeriodo = getTablaUF[2].replace(/^\D+/g, '').replace(".","");
        valores.UFDescPeriodoAnt = getTablaUF[3].replace(/^\D+/g, '').replace(".", "");
        valores.UFValPeriodoAnt = getTablaUF[4].replace(/^\D+/g, '').replace(".", "");

        const getUFValDia = await page.evaluate(() => {
            const allTables = document.querySelectorAll(".journal-content-article"); //acá seleccion todos los DIV que contienen tablas
            let datosTablaUFvaldia = [];                                                     //Creo primero para leer tabla de valores de UF
            const tdTablaUFvaldia = allTables[0].querySelectorAll("td");                     //Primero leo todos los TD           
            //acá estoy guardando el innerText de cada TD en el Arreglo "datosTablaUF"
            tdTablaUFvaldia.forEach((td) => {
                datosTablaUFvaldia.push(td.innerText);
            });
            return datosTablaUFvaldia
        });
        valores.UFValPeriodo = getUFValDia[2].replace(/^\D+/g, '').replace(".", "");


        //TABLA UTM
        const getTablaUTM = await page.evaluate(() => {
            const allTables = document.querySelectorAll(".journal-content-article"); //acá seleccion todos los DIV que contienen tablas
            let datosTablaUTM = [];                                                     //Creo primero para leer tabla de valores de UF
            const tdTablaUTM = allTables[1].querySelectorAll("td");                     //Primero leo todos los TD           
            //acá estoy guardando el innerText de cada TD en el Arreglo "datosTablaUF"
            tdTablaUTM.forEach((td) => {
                datosTablaUTM.push(td.innerText);
            });
            return datosTablaUTM
        });

        const tablaUTM = getTablaUTM;
        valores.UTMDesc = getTablaUTM[3];
        valores.UTMVal = getTablaUTM[4].replace(/^\D+/g, '').replace(".", "");
        valores.UTAVal = getTablaUTM[5].replace(/^\D+/g, '').replace(".", "");

        //TABLA RENTA TOPE IMPONIBLE  RTI
        const getTablaRTI = await page.evaluate(() => {
            const allTables = document.querySelectorAll(".journal-content-article"); //acá seleccion todos los DIV que contienen tablas
            let datosTablaRTI = [];                                                     //Creo primero para leer tabla de valores de UF
            const tdTablaRTI = allTables[2].querySelectorAll("td");                     //Primero leo todos los TD           
            //acá estoy guardando el innerText de cada TD en el Arreglo "datosTablaUF"
            tdTablaRTI.forEach((td) => {
                datosTablaRTI.push(td.innerText);
            });
            return datosTablaRTI
        });
        const tablaRTI = getTablaRTI;
        valores.RTIAfpUF = getTablaRTI[1].replace(/^\D+/g, '').split(' UF')[0];
        valores.RTIIpsUF = getTablaRTI[3].replace(/^\D+/g, '').split(' UF')[0];
        valores.RTISegCesUF = getTablaRTI[5].replace(/^\D+/g, '').split(' UF')[0];
        valores.RTIAfpPesos = getTablaRTI[2].replace(/^\D+/g, '').replace(".", "");
        valores.RTIIpsPesos = getTablaRTI[4].replace(/^\D+/g, '').replace(".", "").split(`\n`)[0];
        valores.RTISegCesPesos = getTablaRTI[6].replace(/^\D+/g, '').replace(".", "");

        //TABLA RENTA MINIMA IMPONIBLE  RMI
        const getTablaRMI = await page.evaluate(() => {
            const allTables = document.querySelectorAll(".journal-content-article"); //acá seleccion todos los DIV que contienen tablas
            let datosTablaRMI = [];                                                     //Creo primero para leer tabla de valores de UF
            const tdTablaRMI = allTables[3].querySelectorAll("td");                     //Primero leo todos los TD           
            //acá estoy guardando el innerText de cada TD en el Arreglo "datosTablaUF"
            tdTablaRMI.forEach((td) => {
                datosTablaRMI.push(td.innerText);
            });
            return datosTablaRMI
        });
        const tablaRMI = getTablaRMI;
        valores.RMITrabDepeInd = getTablaRMI[2].replace(/^\D+/g, '').replace(".", "");
        valores.RMIMen18May65 = getTablaRMI[4].replace(/^\D+/g, '').replace(".", "");
        valores.RMITrabCasaPart = getTablaRMI[6].replace(/^\D+/g, '').replace(".", "");
        valores.RMINoRemu = getTablaRMI[8].replace(/^\D+/g, '').replace(".", "");


        //TABLA APV
        const getTablaAPV = await page.evaluate(() => {
            const allTables = document.querySelectorAll(".journal-content-article"); //acá seleccion todos los DIV que contienen tablas
            let datosTablaAPV = [];                                                     //Creo primero para leer tabla de valores de UF
            const tdTablaAPV = allTables[4].querySelectorAll("td");                     //Primero leo todos los TD           
            //acá estoy guardando el innerText de cada TD en el Arreglo "datosTablaUF"
            tdTablaAPV.forEach((td) => {
                datosTablaAPV.push(td.innerText);
            });
            return datosTablaAPV
        });
        const tablaAPV = getTablaAPV;
        valores.APVTopeMensUF = getTablaAPV[1].replace(/^\D+/g, '').split(' UF')[0];
        valores.APVTopeAnuUF = getTablaAPV[3].replace(/^\D+/g, '').split(' UF')[0];
        valores.APVTopeMensPesos = getTablaAPV[2].replace(/^\D+/g, '').replace(".", "");
        valores.APVTopeAnuPesos = getTablaAPV[4].replace(/^\D+/g, '').replace(".", "");

        //TABLA DEPOSITO CONVENIDO DC
        const getTablaDC = await page.evaluate(() => {
            const allTables = document.querySelectorAll(".journal-content-article"); //acá seleccion todos los DIV que contienen tablas
            let datosTablaDC = [];                                                     //Creo primero para leer tabla de valores de UF
            const tdTablaDC = allTables[5].querySelectorAll("td");                     //Primero leo todos los TD           
            //acá estoy guardando el innerText de cada TD en el Arreglo "datosTablaUF"
            tdTablaDC.forEach((td) => {
                datosTablaDC.push(td.innerText);
            });
            return datosTablaDC
        });
        valores.DepConvenidoUF = getTablaDC[1].replace(/^\D+/g, '').split(' UF')[0];
        valores.DepConvenidoPesos = getTablaDC[2].replace(/^\D+/g, '').replace(".", "");

        //TABLA SEGURO DE CESANTIA AFC
        const getTablaAFC = await page.evaluate(() => {
            const allTables = document.querySelectorAll(".journal-content-article"); //acá seleccion todos los DIV que contienen tablas
            let datosTablaAFC = [];                                                     //Creo primero para leer tabla de valores de UF
            const tdTablaAFC = allTables[6].querySelectorAll("td");                     //Primero leo todos los TD           
            //acá estoy guardando el innerText de cada TD en el Arreglo "datosTablaUF"
            tdTablaAFC.forEach((td) => {
                datosTablaAFC.push(td.innerText);
            });
            return datosTablaAFC
        });

        valores.AFCCpiEmpleador = getTablaAFC[6].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFCCpiTrabajador = getTablaAFC[7].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFCCpfEmpleador = getTablaAFC[9].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFCCpfTrabajador = getTablaAFC[10].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFCCpi11Empleador = getTablaAFC[12].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFCCpi11Trabajador = getTablaAFC[13].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFCTcpEmpleador = getTablaAFC[15].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFCTcpTrabajador = getTablaAFC[16].replace(/^\D+/g, '').replace(".", "").split("%")[0];

        //TABLA COTIZACION AFP
        const getTablaAFP = await page.evaluate(() => {
            const allTables = document.querySelectorAll(".journal-content-article"); //acá seleccion todos los DIV que contienen tablas
            let datosTablaAFP = [];                                                     //Creo primero para leer tabla de valores de UF
            const tdTablaAFP = allTables[8].querySelectorAll("td");                     //Primero leo todos los TD           
            //acá estoy guardando el innerText de cada TD en el Arreglo "datosTablaUF"
            tdTablaAFP.forEach((td) => {
                datosTablaAFP.push(td.innerText);
            });
            return datosTablaAFP
        });
        valores.AFPCapitalTasaDep = getTablaAFP[9].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPCapitalTasaSIS = getTablaAFP[10].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPCapitalTasaInd = getTablaAFP[11].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPCuprumTasaDep = getTablaAFP[13].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPCuprumTasaSIS = getTablaAFP[14].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPCuprumTasaInd = getTablaAFP[15].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPHabitatTasaDep = getTablaAFP[17].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPHabitatTasaSIS = getTablaAFP[18].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPHabitatTasaInd = getTablaAFP[19].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPPlanVitalTasaDep = getTablaAFP[21].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPPlanVitalTasaSIS = getTablaAFP[22].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPPlanVitalTasaInd = getTablaAFP[23].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPProVidaTasaDep = getTablaAFP[25].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPProVidaTasaSIS = getTablaAFP[26].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPProVidaTasaInd = getTablaAFP[27].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPModeloTasaDep = getTablaAFP[29].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPModeloTasaSIS = getTablaAFP[30].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPModeloTasaInd = getTablaAFP[31].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPUnoTasaDep = getTablaAFP[33].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPUnoTasaSIS = getTablaAFP[34].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.AFPUnoTasaInd = getTablaAFP[35].replace(/^\D+/g, '').replace(".", "").split("%")[0];


        //TABLA ASIGNACION FAMILIAR AFAM
        const getTablaAFam = await page.evaluate(() => {
            const allTables = document.querySelectorAll(".journal-content-article"); //acá seleccion todos los DIV que contienen tablas
            let datosTablaAFam = [];                                                     //Creo primero para leer tabla de valores de UF
            const tdTablaAFam = allTables[9].querySelectorAll("td");                     //Primero leo todos los TD           
            //acá estoy guardando el innerText de cada TD en el Arreglo "datosTablaUF"
            tdTablaAFam.forEach((td) => {
                datosTablaAFam.push(td.innerText);
            });
            return datosTablaAFam
        });
        valores.AFamTramoAMonto = getTablaAFam[5].replace(/^\D+/g, '');
        valores.AFamTramoADesde = '0';
        valores.AFamTramoAHasta = getTablaAFam[6].split("=")[1].replace(/^\D+/g, '');
        valores.AFamTramoBMonto = getTablaAFam[8].replace(/^\D+/g, '');
        valores.AFamTramoBDesde = getTablaAFam[9].split("<")[0].replace(/^\D+/g, '');
        valores.AFamTramoBHasta = getTablaAFam[9].split("<")[1].replace(/^\D+/g, '');
        valores.AFamTramoCMonto = getTablaAFam[11].replace(/^\D+/g, '');
        valores.AFamTramoCDesde = getTablaAFam[12].split("<")[0].replace(/^\D+/g, '');
        valores.AFamTramoCHasta = getTablaAFam[12].split("<")[1].replace(/^\D+/g, '');
        valores.AFamTramoDMonto = getTablaAFam[14].replace(/^\D+/g, '');
        valores.AFamTramoDDesde = getTablaAFam[15].split("<")[0].replace(/^\D+/g, '');
        valores.AFamTramoDHasta = '99999999999';


        //TABLA TRABAJO PESADO TPES
        const getTablaTPes = await page.evaluate(() => {
            const allTables = document.querySelectorAll(".journal-content-article"); //acá seleccion todos los DIV que contienen tablas
            let datosTablaTPes = [];                                                     //Creo primero para leer tabla de valores de UF
            const tdTablaTPes = allTables[10].querySelectorAll("td");                     //Primero leo todos los TD           
            //acá estoy guardando el innerText de cada TD en el Arreglo "datosTablaUF"
            tdTablaTPes.forEach((td) => {
                datosTablaTPes.push(td.innerText);
            });
            return datosTablaTPes
        });

        valores.TrabPesadoCalif = getTablaTPes[7].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.TrabPesadoEmpl = getTablaTPes[8].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.TrabPesadoTrabaj = getTablaTPes[9].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.TrabMenosPesadoCalif = getTablaTPes[11].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.TrabMenosPesadoEmpl = getTablaTPes[12].replace(/^\D+/g, '').replace(".", "").split("%")[0];
        valores.TrabMenosPesadoTrabaj = getTablaTPes[13].replace(/^\D+/g, '').replace(".", "").split("%")[0];

        for (const property in valores) {
            if (valores[property] == '') {
                valores[property] = '0';
            }
        }
        console.log(valores);
        await browser.close();
        return valores;

    })();
}



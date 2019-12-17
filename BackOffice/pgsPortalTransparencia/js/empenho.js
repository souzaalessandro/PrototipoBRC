var contador = 0;
const bntSearch = document.getElementById('btnbuscar');
var fornecedores = [];



$(document).ready(function() {

    $("#dtInicial").datepicker({
        format: "dd/mm/yyyy",
        clearBtn: true,
        language: "pt-BR",
        autoclose: true,
        orientation: "left",
        todayHighlight: true,

    });

    $("#dtFinal").datepicker({
        format: "dd/mm/yyyy",
        clearBtn: true,
        language: "pt-BR",
        autoclose: true,
        orientation: "left",
        todayHighlight: true,

    });

    $('#collapse-collapsed').collapse({
        toggle: false
    });
    //GetFornecedores();
    SetDateInForm();
});

function SetDateInForm() {
    const dateNow = new Date();
    const dateEnd = new Date();
    dateNow.setDate(dateEnd.getDate() - 90);
    $("#dtInicial").datepicker("setDate", dateNow);
    $("#dtFinal").datepicker("setDate", dateEnd);

}

function GetFornecedores() {
    $.ajax({
        type: "POST",
        url: "proxy/ApoioFiltros.ashx?method=GetFornecedores",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function(response) {
            for (var i in response) {
                fornecedores.push(response[i].NomeFornecedor);
            }
        },
        failure: function(response) {
            console.log(response.d);
        }

    });
}

function split(val) {
    return val.split(/,\s*/);
}

function extractLast(term) {
    return split(term).pop();
}

window.addEventListener('load', function() {
    // Pega todos os formulários que nós queremos aplicar estilos de validação Bootstrap personalizados.
    var forms = document.getElementsByClassName('needs-validation');
    // Faz um loop neles e evita o envio
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}, false);

function ValidateRangeDate(StartDate, EndDate) {

    if (typeof StartDate === 'undefined')
        return false;

    if (StartDate === null)
        return false;




    if (StartDate > EndDate) {

        const obj = {
            class: 'danger',
            message: 'Data emissão final está menor que data emissão inicial!'
        };
        showAlert(obj);
        return false;
    }

    return true;

}

function ValidateRangeEmpenhos(numeroInicial, numeroFinal) {

    if (typeof numeroInicial === 'undefined')
        return false;

    if (numeroInicial === null)
        return false;

    if (numeroInicial > numeroFinal) {

        const obj = {
            class: 'danger',
            message: 'Número final está menor que número inicial!',
            id: "dataRange"
        };
        showAlert(obj);
        return false;

    }
    return true;

}

function showAlert(obj) {
    var html = '<div id="' + obj.id + '" class="alert alert-' + obj.class + ' alert-dismissible" role="alert">' +
        '   <strong>' + obj.message + '</strong>' +
        '       <button class="close" type="button" data-dismiss="alert" aria-label="Close">' +
        '           <span aria-hidden="true">×</span>' +
        '       </button>' +
        '   </div>';
    $('#alert').append(html);
}

function ObtemTipoEmpenho() {

    const ordinario = document.getElementById("ordinario").checked;
    const estimativa = document.getElementById("estimativa").checked;
    const global = document.getElementById("global").checked;
    let tipoEmpenho = 0; //todos

    if (estimativa)
        tipoEmpenho = 1;

    if (global)
        tipoEmpenho = 2;

    if (ordinario)
        tipoEmpenho = 3;

    return tipoEmpenho;
}

function SearchRegister() {

    ClearElements("cardTable");
    ClearElements("alert");

    const elStartDate = $("#dtInicial").datepicker("getDate");
    const elEndDate = $("#dtFinal").datepicker("getDate");

    let podeConsultar = ValidateRangeDate(elStartDate, elEndDate);
    if (!podeConsultar)
        return;

    const numeroEmpenhoInicial = document.getElementById('numeroIni').value;
    const numeroEmpenhoFinal = document.getElementById('numeroFim').value;

    podeConsultar = ValidateRangeEmpenhos(numeroEmpenhoInicial, numeroEmpenhoFinal);

    if (!podeConsultar)
        return;

    const fornecedorFiltro = document.getElementById('fornecedor').value;
    var dados = {
        dataInicial: elStartDate,
        dataFinal: elEndDate,
        numeroEmpenhoInicial: numeroEmpenhoInicial,
        numeroEmpenhoFinal: numeroEmpenhoFinal,
        tipoEmpenho: ObtemTipoEmpenho(),
        fornecedor: fornecedorFiltro

    };
    console.log(dados);

    ObtemDadosFiltrados(dados);

}

function ClearElements(objId) {
    const card = document.getElementById(objId);
    while (card.firstChild) {
        card.removeChild(card.firstChild);
    }

}


function ObtemDadosFiltrados(dataFilter) {


    var htmlTable = '<div class="card"><div class="card-body"> <table id="dataFilter" class="table table-striped table-bordered dt-responsive nowrap" style="width:100%">' +
        '<thead>                       ' +
        '    <tr>                      ' +
        '        <th>Nr.Empenho</th>         ' +
        '        <th>Emissão</th>     ' +
        '        <th>Tipo</th>       ' +
        '        <th>Fornecedor</th>       ' +
        '        <th>Despesa orç.</th>   ' +
        '        <th>Objeto</th>       ' +
        '        <th>Empenhado</th>       ' +
        '        <th>Liquidado</th>       ' +
        '        <th>Pago</th>       ' +
        '        <th>Anulado</th>       ' +
        '    </tr>                     ' +
        '</thead>                      ' +
        '</table> </div></div>               ';
    $('#cardTable').append(htmlTable);


    let tableArray = [
        [1, "05/12/2019", "Global", "Maroquinho", "Orçamento Público", "caneta esferográfica", "258,98", "263,98", "235,58", "569,98"],
        [2, "05/12/2019", "Global", "Maroquinho", "Orçamento Público", "caneta esferográfica", "258,98", "263,98", "235,58", "569,98"],
        [3, "05/12/2019", "Global", "Maroquinho", "Orçamento Público", "caneta esferográfica", "258,98", "263,98", "235,58", "569,98"],
        [4, "05/12/2019", "Global", "Maroquinho", "Orçamento Público", "caneta esferográfica", "258,98", "263,98", "235,58", "569,98"],
        [5, "05/12/2019", "Global", "Maroquinho", "Orçamento Público", "caneta esferográfica", "258,98", "263,98", "235,58", "569,98"],
        [18, "03/01/2019", "Estimativa", "Papelaria TH e Filhos Ltda", "6.2.2.1.1.33.90.30.004 - Material de Expediente", "Vr. empenhado a Papelaria T.H. & Filhos, material de escritório.", "R$ 307.10", "R$ 307.10", "R$ 307.10", "R$ 0.00"],
        [19, "03/01/2019", "Estimativa", "Sky Brasil Serviços Ltda", "6.2.2.1.1.33.90.39.030 - Serviços de Telecomunicações em Geral", "Vr. empenhado a Sky Brasil, serviços de tv por assinatura.", "R$ 380.58", "R$ 380.58", "R$ 380.58", "R$ 0.00"],
        [20, "03/01/2019", "Estimativa", "Condomínio do Edf. Executive Plaza - Delegacia de Juiz de Fora", "6.2.2.1.1.33.90.39.002 - Condomínios e Estacionamentos", "Vr. empenhado a Condomínio Edifício Executive Plaza, taxas de condomínio da Delegacia de Juiz de Fora.", "R$ 626.49", "R$ 626.49", "R$ 626.49", "R$ 0.00"],
        [21, "03/01/2019", "Estimativa", "Bras Park Estacionamento Ltda", "6.2.2.1.1.33.90.33.005 - Pedágios", "Vr. empenhado a Brás Park Estacionamento, referente a estacionamento para veículo deste Conselho.", "R$ 300.00", "R$ 300.00", "R$ 300.00", "R$ 0.00"],
        [22, "03/01/2019", "Estimativa", "Redenet Com. e Serviços em PABX Ltda ME", "6.2.2.1.1.33.90.39.015 - Manutenção e Conserv. de Bens Móveis - Outras Naturezas", "Vr. empenhado a Redenet, assistência técnica rede de telefones CRQ2MG.", "R$ 345.00", "R$ 345.00", "R$ 345.00", "R$ 0.00"],
        [23, "04/01/2019", "Estimativa", "Status Reformadora Adilson Justino Soares", "6.2.2.1.1.33.90.39.015 - Manutenção e Conserv. de Bens Móveis - Outras Naturezas", "Vr. empenhado a Status Reformadora Adilson Justino Soares, referente a serviços de reforma de 10 cadeiras.", "R$ 1,520.00", "R$ 1,520.00", "R$ 1,520.00", "R$ 0.00"],
        [24, "04/01/2019", "Estimativa", "Waz Hardware Import. e Comércio de Suprimentos de Informática Ltda", "6.2.2.1.2.44.90.52.004 - Computadores e Periféricos", "Vr. referente aquisição de 4 impressoras multifuncional jato de tinta Epson Ecotank L575 Wi-fi.", "R$ 6,399.96", "R$ 6,399.96", "R$ 6,399.96", "R$ 0.00"],
        [25, "04/01/2019", "Estimativa", "Oficina dos Bits", "6.2.2.1.1.33.90.30.012 - Material Elétrico, Eletrônico e de Telefonia", "Vr. empenhado a Oficina dos Bits, aquisição de 5 x SSD Kingston 240 GB , 5 cabos sata, e dois adaptadores baia.", "R$ 1,272.80", "R$ 1,272.80", "R$ 1,272.80", "R$ 0.00"],
        [26, "04/01/2019", "Estimativa", "Arcongel Serviços Faria e Soares Ltda EPP", "6.2.2.1.1.33.90.39.015 - Manutenção e Conserv. de Bens Móveis - Outras Naturezas", "Vr. empenhado a Faria e Lemos Ltda EPP, serviços de manutenção preventiva em 01 aparelho de ar condicionado.", "R$ 330.00", "R$ 330.00", "R$ 330.00", "R$ 0.00"],
        [27, "04/01/2019", "Estimativa", "André Luiz Pimenta Maia", "6.2.2.1.1.33.90.36.003 - Estagiários e Menores Aprendizes", "Vr. empenhado a André Luiz Pimenta Maia, bolsa de estágio, ref. janeiro/19.", "R$ 1,380.27", "R$ 1,380.27", "R$ 1,380.27", "R$ 0.00"],
        [28, "04/01/2019", "Estimativa", "Victor Mendes Oliveira Farias", "6.2.2.1.1.33.90.14.001 - Diárias no País - Servidores", "Vr. empenhado a Victor Mendes Oliveira Farias, 2,5 diárias, afastando da cidade de Montes Claros MG, para a cidade de Belo Horizonte, participar de treinamentos na Sede deste Conselho.", "R$ 780.10", "R$ 780.10", "R$ 780.10", "R$ 0.00"],

    ];

    $('#dataFilter').DataTable({
        responsive: true,
        dom: 'Bfrtip',
        buttons: [{
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'Excel',
                exportOptions: {
                    orthogonal: 'export'
                }
            },

            {
                extend: 'csvHtml5',
                text: '<i class="fas fa-file-csv"></i>',
                titleAttr: 'CSV',
		exportOptions: {
                    orthogonal: 'export'
                }
            },

            {
                text: '<i class="fas fa-file-pdf"></i>',
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'LEGAL',
                titleAttr: 'PDF',
		exportOptions: {
                    orthogonal: 'export'
                },
                title: function () {
                    return 'Portal de Transparência - Consulta de empenhos';
                }

            }

        ],
        data: tableArray,
        columns: [
            { "title": "Empenho", "target": 0, "width": "10px" },
      
            {   
	    "title": "Data Vencimento", 
	        "target": 1, 
		"width": "30px", 
		className: "text-center",
                data: 'dataEmissao',
                type: "date",
		target:1,
                format: "DD/MM/YYYY",
                render: function (data) {
                    return convertJsonDateToShortDate(data);
                }
            },
            { "title": "Tipo", "target": 2, "width": "30px", className: "text-center" },
            {
                "title": "Fornecedor",
                target: 3,
                "width": "40px",
                render: $.fn.dataTable.render.ellipsis(17)

            },
            {
                "title": "Despesa orç.",
                target: 4,
                width: "40px",
                render: $.fn.dataTable.render.ellipsis(20)
            },
            {
                "title": "Objeto",
                target: 5,
		data: 'objetoEmpenho', 
		type: 'string',
                width: "40px",
                render: $.fn.dataTable.render.ellipsis(20)
            },
            {
                "title": "Valor empenhado",
                width: "30px",
                target: 6,
                className: "text-right",
		 data: 'valorEmpenhado', 
		 render: $.fn.dataTable.render.number(',', '.', 2, 'R$ '), 
		 type: 'num-fmt'
            },
            {
                "title": "Valor liquidado",
                target: 7,
                width: '30px',
                className: "text-right",
		data: 'valorLiquidado', 
		render: $.fn.dataTable.render.number(',', '.', 2, 'R$ '), 
		type: 'num-fmt'
            },
            {
                "title": "Valor pago",
                width: "30px",
                target: 8,
                className: "text-right",
		data: 'valorPago', 
		render: $.fn.dataTable.render.number(',', '.', 2, 'R$ '), 
		type: 'num-fmt'
            },
            {
                "title": "Valor anulado",
                width: "30px",
                target: 9,
                className: "text-right",
		data: 'valorAnulado', 
		render: $.fn.dataTable.render.number(',', '.', 2, 'R$ '), 
		type: 'num-fmt'
            }
        ]



    });

}

function convertJsonDateToShortDate(data) {
    // This function converts a json date to a short date
    // e.g. /Date(1538377200000)/ to 10/1/2018
    const dateValue = new Date(parseInt(data.substr(6)));
    return dateValue.toLocaleDateString();
}
$("#fornecedor")
    // don't navigate away from the field on tab when selecting an item
    .on("keydown", function (event) {
        console.log($(this).autocomplete("instance").menu);
        if (event.keyCode === $.ui.keyCode.TAB &&
            $(this).autocomplete("instance").menu.active) {
            event.preventDefault();
        }
    })
    .autocomplete({
        minLength: 3,
        source: function (request, response) {
            // delegate back to autocomplete, but extract the last term
            response($.ui.autocomplete.filter(
                fornecedores, extractLast(request.term)));
        },
        focus: function () {
            // prevent value inserted on focus
            return false;
        },
        select: function (event, ui) {
            var terms = split(this.value);
            // remove the current input
            terms.pop();
            // add the selected item
            terms.push(ui.item.value);
            // add placeholder to get the comma-and-space at the end
            terms.push("");
            this.value = terms.join(", ");
            return false;
        }
    });

bntSearch.addEventListener('click', SearchRegister);
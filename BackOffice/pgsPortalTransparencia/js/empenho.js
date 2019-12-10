var contador = 0;
const bntSearch = document.getElementById('btnSearch');
var fornecedores = [];

$(document).ready(function () {
    $("#dtInicial").datepicker({
        format: "dd/mm/yyyy",
        clearBtn: true,
        language: "pt-BR",
        autoclose: true,
        todayHighlight: true
    });
    $("#dtFinal").datepicker({
        format: "dd/mm/yyyy",
        clearBtn: true,
        language: "pt-BR",
        autoclose: true,
        todayHighlight: true
    });
    $('#collapse-collapsed').collapse({
        toggle: false
    });
    GetFornecedores();
    SetDateInForm();
});

function SetDateInForm() {
    const dateNow = new Date();
    const dateEnd = new Date();
    dateEnd.setDate(dateNow.getDate() + 90);
    $("#dtInicial").datepicker("setDate",dateNow);
    $("#dtFinal").datepicker("setDate", dateEnd);

}

function GetFornecedores() {

    $.ajax({
        type: "POST",
        url: "proxy/ApoioFiltros.ashx?method=GetFornecedores",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {
            for (var i in response) {
                fornecedores.push(response[i].NomeFornecedor);
            }
        },
        failure: function (response) {
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

window.addEventListener('load', function () {
    // Pega todos os formulários que nós queremos aplicar estilos de validação Bootstrap personalizados.
    var forms = document.getElementsByClassName('needs-validation');
    // Faz um loop neles e evita o envio
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
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
        return;

    if (StartDate === null)
        return;

    if (StartDate > EndDate) {

        const obj = {
            class: 'danger',
            message: 'Data emissão final está menor que data emissão inicial!'
        };
        showAlert(obj);

    }

}

function ValidateRangeEmpenhos(numeroInicial, numeroFinal) {

    if (typeof numeroInicial === 'undefined')
        return;

    if (numeroInicial === null)
        return;

    if (numeroInicial > numeroFinal) {

        const obj = {
            class: 'danger',
            message: 'Número final está menor que número inicial!'
        };
        showAlert(obj);

    }


}

function showAlert(obj) {

    var html = '<div id="msgValidate" class="alert alert-' + obj.class + ' alert-dismissible" role="alert">' +
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
    $('#msgValidate').alert('close');
    const elStartDate = $("#dtInicial").datepicker("getDate");
    const elEndDate = $("#dtFinal").datepicker("getDate");

    ValidateRangeDate(elStartDate, elEndDate);

    const numeroEmpenhoInicial = document.getElementById('numeroIni').value;
    const numeroEmpenhoFinal = document.getElementById('numeroFim').value;

    ValidateRangeEmpenhos(numeroEmpenhoInicial, numeroEmpenhoFinal);

    $('#collapse-collapsed').collapse({
        toggle: true
    });

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


function ObtemDadosFiltrados(dataFilter) {




    var htmlTable = '<table id="dataFilter" class="table table-striped table-bordered dt-responsive nowrap" style="width:100%"> </table>';
    $('#dataTable').append(htmlTable);
    let tableArray = [
        [1, "05/12/2019", "Global", "Maroquinho", "Orçamento Público", "caneta esferográfica", "258,98", "263,98", "235,58", "569,98"],
        [2, "05/12/2019", "Global", "Maroquinho", "Orçamento Público", "caneta esferográfica", "258,98", "263,98", "235,58", "569,98"],
        [3, "05/12/2019", "Global", "Maroquinho", "Orçamento Público", "caneta esferográfica", "258,98", "263,98", "235,58", "569,98"],
        [4, "05/12/2019", "Global", "Maroquinho", "Orçamento Público", "caneta esferográfica", "258,98", "263,98", "235,58", "569,98"],
        [5, "05/12/2019", "Global", "Maroquinho", "Orçamento Público", "caneta esferográfica", "258,98", "263,98", "235,58", "569,98"],

    ];

    $('#dataFilter').DataTable({
        responsive: true,
 dom: 'Bfrtip',
        buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fas fa-file-excel"></i>',
                        titleAttr: 'Excel'
                    },

                    {
                        extend: 'csvHtml5',
                        text:'<i class="fas fa-file-csv"></i>',
                        titleAttr: 'CSV'
                    },

                    {
                        text: '<i class="fas fa-file-pdf"></i>',
                        extend: 'pdfHtml5',
                        orientation: 'landscape',
                        pageSize: 'LEGAL',
                        titleAttr: 'PDF',
                        messageTop:'Portal de Transparência - Consulta de empenhos'
                       
                    }
                 ],
        data: tableArray,
        "columns": [
            { "title": "Número do empenho" },
            { "title": "Data Vencimento" },
            { "title": "Tipo" },
            { "title": "Fornecedor" },
            { "title": "Despesa orç." },
            { "title": "Objeto" },
            { "title": "Valor empenhado" },
            { "title": "Valor liquidado" },
            { "title": "Valor pago" },
            { "title": "Valor anulado" }
        ]

    });

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


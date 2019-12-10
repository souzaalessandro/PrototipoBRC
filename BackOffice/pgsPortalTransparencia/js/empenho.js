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
    })

    GetFornecedores();

});


function GetFornecedores() {
    console.log('GetFornecedor');
    $.ajax({
        type: "POST",
        url: "http://localhost/brcConselhos/BackOffice/pgsPortalTransparencia/proxy/ApoioFiltros.ashx?method=GetFornecedores",
        data: { method: "GetFornecedores" },
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (response) {

            array.forEach(data => {
                fornecedores.push(data.nomeFornecedor)
            });

            $("#messages").append(msg.d);
        },
        failure: function (response) {
            console.log(response.d);
        }

    });


}


const bntSearch = document.getElementById('btnSearch');

var fornecedores = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
];

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
            message: 'A data inicial do filtro não pode ser maior que a data final'
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
            message: 'O numero inicial do empenho não pode ser maior que o numero final do empenho'
        };
        showAlert(obj);

    }


}

function showAlert(obj) {

    var html = '<div id="msgValidate" class="alert alert-' + obj.class + ' alert-dismissible" role="alert">' +
        '   <strong>' + obj.message + '</strong>' +
        '       <button class="close" type="button" data-dismiss="alert" aria-label="Close">' +
        '           <span aria-hidden="true">×</span>' +
        '       </button>'
    '   </div>';
    $('#alert').append(html);
}

function SearchRegister() {
    $('#msgValidate').alert('close');
    ObtemDadosFiltrados("");
    const elStartDate = $("#dtInicial").datepicker("getDate");
    const elEndDate = $("#dtFinal").datepicker("getDate");

    ValidateRangeDate(elStartDate, elEndDate);

    const numeroEmpenhoInicial = document.getElementById('numeroIni').value;
    const numeroEmpenhoFinal = document.getElementById('numeroFim').value;

    ValidateRangeEmpenhos(numeroEmpenhoInicial, numeroEmpenhoFinal);

    $('#collapse-collapsed').collapse({
        toggle: true
    });

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



bntSearch.addEventListener('click', SearchRegister);
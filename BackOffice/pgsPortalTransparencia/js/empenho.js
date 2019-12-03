$(document).ready(function() {
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

        success: function(response) {

            array.forEach(data => {
                fornecedores.push(data.nomeFornecedor)
            });

            $("#messages").append(msg.d);
        },
        failure: function(response) {
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

    let message = "";

    if (StartDate == "")
        message = 'A data '

    const startDate = new Date(elStartDate.value);
    const endDate = new Date(elEndDate.value);
    if (startDate < endDate) {


    }

}

function showAlert(obj) {
    $('#msgValidate').alert('close');
    var html = '<div id="msgValidate" class="alert alert-' + obj.class + ' alert-dismissible" role="alert">' +
        '   <strong>' + obj.message + '</strong>' +
        '       <button class="close" type="button" data-dismiss="alert" aria-label="Close">' +
        '           <span aria-hidden="true">×</span>' +
        '       </button>'
    '   </div>';
    $('#alert').append(html);
}

function SearchRegister() {

    const elStartDate = document.getElementById('dtInicial');
    const elEndDate = document.getElementById('dtFinal');

    var messageWarning = ValidateRangeDate(elStartDate, elEndDate);
    const obj = {
        class: 'danger',
        message: 'Faltou algo ' + contador
    };
    showAlert(obj);



}

$("#fornecedor")
    // don't navigate away from the field on tab when selecting an item
    .on("keydown", function(event) {
        console.log($(this).autocomplete("instance").menu);
        if (event.keyCode === $.ui.keyCode.TAB &&
            $(this).autocomplete("instance").menu.active) {
            event.preventDefault();
        }
    })
    .autocomplete({
        minLength: 3,
        source: function(request, response) {
            // delegate back to autocomplete, but extract the last term
            response($.ui.autocomplete.filter(
                fornecedores, extractLast(request.term)));
        },
        focus: function() {
            // prevent value inserted on focus
            return false;
        },
        select: function(event, ui) {
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
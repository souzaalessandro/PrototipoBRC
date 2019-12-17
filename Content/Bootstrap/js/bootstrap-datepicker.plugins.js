function ControlDatePicker(dateControl) {

    dateControl.datepicker({
            orientation: "left",
            autoclose: true,
            language: "pt-BR",
            todayBtn: "linked",
            forceParse: false,
            clearBtn: true,
            todayHighlight: true,

        })
        .off('focus')
        .click(function() {
            $(this).datepicker('show');
        });

    // handle input group button click
    dateControl.next().children('button').on('click', function(e) {
        e.preventDefault();
        var datePicker = $(this).parent().parent().find('.datepicker');
        datePicker.datepicker('show');
        datePicker.focus();
    });

    dateControl.on('focusout', function(e) {
        var value = $(this).val();
        var format = $(this).attr("data-date-format");
        if (!value || format.length == value.length)
            return;
        var textDate = null;
        if (format.length === 10)
            textDate = Date.formatDayMonthYear(value, '/');
        else if (format.length === 7)
            textDate = "01" + "/" + Date.formatMonthYear(value, '/');
        else
            textDate = "01/01/" + value;
        var date = Date.getDateFromFormat(textDate, 'dd/MM/yyyy');
        $(this).datepicker('setDate', date);
    });

    dateControl.on('keypress', function(e) {
        if (e.key === 'h' || e.key === 'H' || e.charCode === 104 || e.keyCode === 72) {
            $(this).datepicker('setDate', new Date());
            $(this).change();
            return;
        }
        return validationKeyDate(e);
    });

    dateControl.on('keydown', function(e) {
        $(e.currentTarget).datepicker('hide');
    });

    dateControl.on('paste', function(e) {
        validationDatetime(this);
    });

}


validationDatetime = function(control) {
    var input = $(control);
    setTimeout(function() {
        //Busca o formato do campo
        var placeholder = input.attr("placeholder");
        var regex;
        //Utiliza regex apropriada para o campo
        if (placeholder == "aaaa")
            regex = new RegExp(/\d{4}/g);
        else if (placeholder == "mm/aaaa")
            regex = new RegExp(/^(0[1-9]|1[0-2])\/\d{4}$/g);
        else if (placeholder == "dd/mm/aaaa")
            regex = new RegExp(/^(0[1-9]|1\d|2\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/g);
        else if (placeholder == "hh:mm" || placeholder == "hh:mm:ss")
            regex = new RegExp(/^(?:[01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])*$/g);
        //Caso o campo estaja em um formato incorreto Ã© limpado o campo
        if (!regex.test(input.val()))
            input.val("");
    }, 200);
}

validationKeyDate = function(event) {

    var key = (window.event) ? event.keyCode : event.which;
    if (key > 47 && key < 58)
        return true;
    else
    if (datepicker.plugin.isNavigationKey(key) ||
        event.key === '/' ||
        key === 0)
        return true;
    else
        return false;
}


isNavigationKey = function(keyCode) {
    return (keyCode === 13 || // enter
        keyCode === 9 || // tab
        keyCode === 8 || // backspace
        keyCode === 46 || // delete
        keyCode === 37 || // left arrow
        keyCode === 39 || // right arrow
        keyCode === 35 || // end
        keyCode === 36 // home
    );
}

toDDMMYYYY = function(date) {
    return date.getUTCDate() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCFullYear();
}
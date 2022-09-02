let myCaptcha;

var name_regex = /^[a-zA-Z]+$/;
var email_regex = /\S+@\S+\.\S+/;;
var code = /^[A-Za-z0-9]*$/;
var zip_regex = /^[0-9]+$/;
var telephone = /^\d{10}$/;

var nombre, correo, telefono, codigo, check;

$( document ).ready(function() {

    $('#txtNombre').val('Victor');
    $('#txtCorreo').val('vicuo@hotmail.com');
    $('#txtTelefono').val('1234567890');
    $('#txtCodigo').val('');

    HideLoading();

    myCaptcha = new jCaptcha({
        el: '.jCaptcha',
        canvasClass: 'jCaptchaCanvas',
        canvasStyle: {
            // required properties for captcha stylings:
            width: 50,
            height: 15,
            textBaseline: 'top',
            font: '15px Arial',
            textAlign: 'left',
            fillStyle: '#ddd'
        },
        // set callback function for success and error messages:
        callback: ( response, $captchaInputElement, numberOfTries ) => {
            debugger;
            if ( response == 'success' ) {
                alert('correcto');
                $.ajax(
                    {
                        type: "POST",
                        url: "https://waaplicacionesiisi.azurewebsites.net/Help/Api/POST-CheckIT-RegistroLanding",
                        contentType: false,
                        processData: false,
                        cache: false,
                        data: {
                            "Nombre": $('#txtNombre').val().trim(),
                            "CorreoElectronico": $('#txtCorreo').val().trim(),
                            "Telefono": $('#txtTelefono').val().trim(),
                            "CodigoReferido": $('#txtCodigo').val().trim()
                          },
                        dataType: "json",
                        success: function (data) {
                            debugger;
                            if (data.Respuesta === '') {
                                HideLoading();
                                window.location.href = conCuesHandler + "?pg=DescargaExcel";
                                return false;
                            } else {
                                HideLoading();
                                MostrarNotificacionToast(data.TipoToast, data.Respuesta)
                                return false;
                            }
                        },
                        error: function (xhr) {
                            HideLoading();
                            MostrarNotificacionToast('danger', 'Tuvimos un problema, intenta nuevamente');
                        }
                    }
                )
                // $.ajax({
    //         type: "POST",
    //         url: `https://siicdevseguridad.azurewebsites.net/Seguridad/Token`,
    //         data: {
    //             "idUsuario": "1",
    //             "login": "jmcortes"
    //         },
    //         success:function(data){ //success es una funcion que se utiliza si el servidor retorna informacion
    //             console.log(data)
    //         },
    //         error: function(err){
    //             console.log(err)
    //         },
    //         crossDomain: true,
    //         dataType: 'jsonp',
    //       });

    // $.ajax({
    //     url: "https://formspree.io/f/mdojkbzv",
    //     method: "POST",
    //     dataType: "json",
    //     data: {
    //       email: "a.visitor@email.com",
    //       message: "Hello!"
    //     },
    //     success:function(data){ //success es una funcion que se utiliza si el servidor retorna informacion
    //         console.log(data)
    //     },
    //     error: function(err){
    //         console.log(err)
    //     },
    //   });

        // var config = {
        //     headers: {'Access-Control-Allow-Origin': '*'}
        // };
        //   axios.post('https://siicdevseguridad.azurewebsites.net/Seguridad/Token', {
        //         idUsuario: "1",
        //         login: "jmcortes"
        //   }, config)
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

    // Swal.fire(
    //     'The Internet?',
    //     'That thing is still around?',
    //     'error'
    //   )

    // var recaptcha = $('#g-recaptcha-response').val();
    // var secret = "6LfIKrYhAAAAAAOkQNdZVV_IjA2GGrkjFLDpiugC";

    // $.ajax({
    //     type: "POST",
    //     url: `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptcha}`,
    //     data: {
    //         "secret": "6LfIKrYhAAAAAAOkQNdZVV_IjA2GGrkjFLDpiugC",
    //         "response": recaptcha
    //     },
    //     success:function(data){ //success es una funcion que se utiliza si el servidor retorna informacion
    //         console.log(data)
    //     },
    //     error: function(err){
    //         console.log(err)
    //     },
    //     dataType: "json" 
    //   });

            }
            if ( response == 'error' ) {
                alert('incorrecto')
                // error handle, e.g. add error class to captcha input
            }
        }
    });

});

function VerVideo(){
    window.open('https://www.youtube.com/watch?v=lOI3_y_x3a4');
    if (win) {
        win.focus();
    } else {
        alert('Por favor habilita los pop ups para esta página');
    }
}

$( "#formulario" ).submit(function( event ) {
    event.preventDefault();
    // ShowLoading();

    if (!name_regex.test($('#txtNombre').val())) {
        Swal.fire(
            'Error',
            'Proporciona un nombre con formato correcto',
            'error'
          )
          return false;
    }

    if (!email_regex.test($('#txtCorreo').val())) {
        Swal.fire(
            'Error',
            'Proporciona un correo con formato correcto',
            'error'
          )
          return false;
    }

    if (!telephone.test($('#txtTelefono').val())) {
        Swal.fire(
            'Error',
            'Proporciona un teléfono con formato correcto',
            'error'
          )
          return false;
    }

    if ($(txtCodigo).length != 0) {
        if (!code.test($('#txtCodigo').val())) {
            Swal.fire(
                'Error',
                'Proporciona un código con formato correcto',
                'error'
              )
              return false;
        } 
    }

    if (!$('#check').is(":checked")) {
        Swal.fire(
            'Error',
            'Acepte el aviso de privacidad',
            'error'
            )
            return false;
    }

    myCaptcha.validate();
});

function HideLoading() {
    var preloader = $('#preloader');
    preloader.fadeOut('slow', function () { });
}

function ShowLoading() {
    var preloader = $('#preloader');
    preloader.fadeIn('slow', function () { });
}

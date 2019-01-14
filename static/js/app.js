

function App(){

}

App.prototype = {

    init: function(){ 
        console.log(document.location.href.indexOf('login'))
        if(document.location.href.indexOf('login')!=-1) {
            this.loginTest()
            this.routeTest()
        }
    },

    loginTest(){

        $('#form_login').submit(function(e) {
            e.preventDefault();

            var route = "/v1/auth",
                username = $('#username').val(),
                password = $('#password').val();
            
            $.ajax({
                url: route,
                data: {username: username, password: password},
                method: 'POST',
                success: function(res){
                    console.log(res)
                  $('.token-alert span').html(res.token);
                  $('.token-alert').removeClass('alert-danger');
                  $('.token-alert').addClass('show');
                },
                error: function(err) {
                    $('.token-alert span').html('Not Authorised');
                    $('.token-alert').addClass('alert-danger');
                    $('.token-alert').addClass('show');
                    
                }
              });

        })
    },

    routeTest: function() {

        var route = $('#route').val();
        var token = $('#authToken');
       
        $('#form_protected_routes').submit(function(e){
            e.preventDefault();
            
            $.ajax({
                url: route,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer '+token.val());
                },
                method: 'GET',
                success: function(res){
       
                  $('#response').val(JSON.stringify(res));
                },
                error: function(err) {
                    $('#response').val('Not Authorised');
                }
              });

        })
    }
}

var Samewave = new App();
Samewave.init();
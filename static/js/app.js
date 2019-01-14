

function App(){

}

App.prototype = {

    init: function(){ 
        console.log(document.location.href.indexOf('login'))
        if(document.location.href.indexOf('login')!=-1) {
            this.loginTest()
            this.registerUser()
            this.routeTest()
        }
    },

    registerUser: function() {
        $('#form_create_user').submit(function(e) {
            e.preventDefault();

            var route = "/v1/users",
                email = $('#new-email').val(),
                password = $('#new-password').val(), 
                first_name = $('#new-first_name').val(),
                last_name = $('#new-last_name').val();
            
            $.ajax({
                url: route,
                data: {email: email, password: password, first_name: first_name, last_name: last_name},
                method: 'POST',
                success: function(res){
                    if(res.error){
                        $('.newuser-alert').html(JSON.stringify(res));
                        $('.newuser-alert').addClass('alert-danger');
                        $('.newuser-alert').addClass('show');
                    }else{
                        $('.newuser-alert span').html(res.ops[0]._id);
                        $('.newuser-alert').removeClass('alert-danger');
                        $('.newuser-alert').addClass('show');
                    }
                    
                }
               
            });
        });
            
    },

    loginTest: function() {

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

        $('#form_protected_routes').submit(function(e){
            e.preventDefault();

            var route = $('#route').val();
            var token = $('#authToken');
            
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
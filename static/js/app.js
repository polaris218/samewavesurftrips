
function App(){

}

App.prototype = {

    init: function(){ 
        if(document.location.href.indexOf('sandbox')!=-1) {
            this.loginTest()
            this.registerUser()
            this.updateUser()
            this.routeTest()
            this.createTrip()
            this.sendMessage();
            this.refreshToken();
            this.getAvatar();
            this.getCover();
            
        }
    },
    
    getAvatar: function(){
        $.ajax({
            method:"GET",
            url: "/v1/user/5c56acfee483b439c6cbc99d/avatar",
            success: function(res){
                $('#avatarImg').attr("src", res)
            }
        });
    },

    getCover: function() {
        $.ajax({
            method:"GET",
            url: "/v1/user/5c56acfee483b439c6cbc99d/cover",
            success: function(res){
                $('#coverImg').attr("src", res)
            }
        });
    },

    refreshToken: function() {

        $('#form_refresh').submit(function(e){
            e.preventDefault();

            var token = $('#expired-token').val();
            var refresh = $('#refresh-token').val();
            
            $.ajax({
                url: '/v1/token',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer '+token);
                },
                method: 'POST',
                data: {
                    refreshToken: refresh
                },
                success: function(res){
       
                  $('.refresh-alert span').html(JSON.stringify(res));
                },
                error: function(err) {
                    $('.refresh-alert span').html('Not Authorised');
                }
              });

        })
        
    },

    sendMessage: function() {
        
        $('#form_create_message').submit(function(e){
            e.preventDefault();

            var subject = $('#message-subject').val();
            var message = $('#message-message').val();
            var to = $('#message-to').val();
            var token = $('#message-token');
            
            $.ajax({
                url: '/v1/messages',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer '+token.val());
                },
                method: 'POST',
                data: {
                    subject,
                    message,
                    recipient_id: to
                },
                success: function(res){
       
                  $('#message-response').val(JSON.stringify(res));
                },
                error: function(err) {
                    $('#message-response').val('Not Authorised');
                }
              });

        })

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
                        $('.newuser-alert span').html(res);
                        $('.newuser-alert').removeClass('alert-danger');
                        $('.newuser-alert').addClass('show');
                    }
                    
                }
               
            });
        });
            
    },

    updateAvatar: function() {

        $('#form_update_avatar').submit(function(e) {
            e.preventDefault();

            let data =  new FormData();
            let avatar = document.getElementById('profile-avatar');

            let files = avatar.files;

            let token = $('#avatar-token');
          

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
              
                // Check the file type.
                if (!file.type.match('image.*')) {
                  continue;
                }
              
                // Add the file to the request.
                data.append('avatar', file, file.name);
              }

       
    

            $.ajax( {
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer '+token.val());
                },
                url: '/v1/user/avatar',
                type: 'POST',
                data: data,
                processData: false
            } );

        });

    },

    updateUser: function() {

        $('#form_update_profile').submit(function(e) {
            e.preventDefault();

            var route = "/v1/user",
                token = $('#profile-token');

            $.ajax({
                url: route,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer '+token.val());
                },
                data: { 
                    first_name: $('#profile-firstname').val(), 
                    last_name: $('#profile-lastname').val(),
                    email: $('#profile-email').val(),
                    gender: $('#profile-gender').val(),
                    bio: $('#profile-bio').val()
                },
                method: 'PUT',
                success: function(res){
        
                    $('#profile-response').val(JSON.stringify(res));
                },
                error: function(err) {
                    $('#profile-response').val('Not Authorised');
                }
                });
        })

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
    },

    createTrip: function() {

        $('#form_create_trip').submit(function(e){
            e.preventDefault();

            var token = $('#trip-token');
            var object = {};
            var elements = document.getElementById("form_create_trip").elements;


            for(var i = 0; i < elements.length; i++) {
                object[elements[i].name] = elements[i].value;
            }

            var json = JSON.stringify(object);
            
            console.log(json)

            $.ajax({
                url: '/v1/trips',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer '+token.val());
                },
                method: 'POST',
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(res){
       
                  $('#tripresponse').val(JSON.stringify(res));
                },
                error: function(err) {
                    $('#tripresponse').val(JSON.stringify(err));
                }
            });
        })


    }
}

var Samewave = new App();
Samewave.init();
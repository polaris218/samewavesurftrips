

function App(){

}

App.prototype = {

    init: function(){ 
        console.log(document.location.href.indexOf('login'))
        if(document.location.href.indexOf('login')!=-1) {
            this.sandBox()
        }
    },

    sandBox: function() {

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
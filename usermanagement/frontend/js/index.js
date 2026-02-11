// =========================
// ADD USER
// =========================
$("#add_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n){
        data[n['name']] = n['value'];
    });

    var request = {
        "url": "http://localhost:8080/api/users",
        "method": "POST",
        "data": data
    };

    $.ajax(request).done(function(response){
        alert("Data Inserted Successfully!");
        window.location.href = "/";
    });
});


// =========================
// UPDATE USER
// =========================
$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n){
        data[n['name']] = n['value'];
    });

    var request = {
        "url": "http://localhost:8080/api/users/" + data.id,
        "method": "PUT",
        "data": data
    };

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        window.location.href = "/";
    });
});


// =========================
// DELETE USER
// =========================
if (window.location.pathname == "/") {

    var $ondelete = $(".table tbody td a.delete");

    $ondelete.click(function(){

        var id = $(this).attr("data-id");

        var request = {
            "url": "http://localhost:8080/api/users/" + id,
            "method": "DELETE"
        };

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            });
        }
    });
}

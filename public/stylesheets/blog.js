  $('#example1').calendar(); 
		$(document).ready(function(){
        var date_input=$('input[name="date"]');
        var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
        date_input.datepicker({
            format: 'mm/dd/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        });
 $(function() {
    $('#datetimepicker1').datetimepicker({
      language: 'pt-BR'
    });
  });
			   var h1 = document.quearySelectorAll("#newlyccc");
			   h1.style.color = "pink";
			console.log("hi there");
			alert("hi therer!!");
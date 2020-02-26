/**
 * 
 */

$(document).ready(function(){
	
	$.ajax({
		url: 'http://172.26.2.41:8080/producto/',
		type: 'GET',
		success: function(data) {
			var html = "";
			$.each(data, function(index, value){
				html += '<tr>';
				html += '<td>'+ value.id+'</td>';
				html += '<td>'+ value.nombre+'</td>';
				html += '<td>'+ value.categoriaNombre+'</td>';
				html += '</tr>';
			});
			$("#productos-table-body").append(html);
		},
		error: function(error) {
			console.log("Error: " + error);
		}
	});
	
});
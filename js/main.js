$(document).ready(function(){
		
		var wikipediaApi = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
		var articleURL = "https://en.wikipedia.org/?curid=";

		$(".btn3").hide();

		function wpResults(){
		
			var searchWord = document.getElementsByClassName("wiki-search")[0].value;
			$(".wp-image").hide();
			$(".btn3").show();
			$(".results").show();
			
            $.ajax({
                url: wikipediaApi + searchWord,
                dataType: 'jsonp',
                type: 'POST',
    			headers: { 'Api-User-Agent': 'Example/1.0' },
                success: function(dataWeGotViaJsonp){
                        
                	var results = dataWeGotViaJsonp.query.pages;
                	var html ="";
                	//console.log(results);
					for (var key in results) {
						html += "<a class='result-item' target = '_blank' href = '" + articleURL + results[key].pageid + "'>" + results[key].title;
						html += "</br></br><span>";
						html +=  results[key].extract + "</span>";
						html += "</a>";
						
					}
					
				$(".results").html(html);

                }
            });
        }

        $(".btn1").click(function() {
			wpResults();
		});

		$('.wiki-search').keypress(function(e){
      		if(e.keyCode==13)
     	 wpResults();
    	});

		$(".btn3").click(function() {
			$(".wp-image").show();
			$(".results").hide();
			$(".btn3").hide();
			ClearFields();

		});
		
		function ClearFields() {
			document.getElementsByClassName("wiki-search")[0].value = "";
		}

	});
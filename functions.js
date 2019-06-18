// YOU WILL NEED TO ADD YOUR OWN API KEY IN QUOTES ON LINE 5, EVEN FOR THE PREVIEW TO WORK.
// 
// GET YOUR API HERE https://console.developers.google.com/apis/api


// https://developers.google.com/youtube/v3/docs/playlistItems/list

// https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=webtut-195115&duration=PT1H

// <iframe width="560" height="315" src="https://www.youtube.com/embed/qxWrnhZEuRU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

// https://i.ytimg.com/vi/qxWrnhZEuRU/mqdefault.jpg

// --------------------------------------------------------------------------------------------------------------------------

$(document).ready(function () {

    var key ='AIzaSyDr6Uh5QzHGCGag905Vcc6kQ38B9nD5AhQ';
    var playlistId = 'PL8tdUV2vzUn4kkQMDmmLEMJE0zH6yQ3Xz';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId
    }

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('#video').html(`
					<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }

		
    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;


            $('main').append(`
							<article class="item" data-key="${vid}">

								<img src="${thumb}" alt="" class="thumb">
								<div class="details">
									<h4>${title}</h4>
									<p>${desc}</p>
								</div>

							</article>
						`);
        });
    }

		// CLICK EVENT
    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });


});

function getvideoid(){
    var song=document.getElementById("song").value;
    alert(song);
    var key ='AIzaSyDr6Uh5QzHGCGag905Vcc6kQ38B9nD5AhQ';
    var search = "https://www.googleapis.com/youtube/v3/search?part=snippet&key="+key + "&q="+song;
    alert(search);
    data = JSON.parse(httpGet(search));
    if (data.items){
        var thumb=(data['items'][0]['snippet']['thumbnails']['medium']['url']);
        var title = (data['items'][0]['snippet']['title']);
        var desc = (data['items'][0]['snippet']['description']);
        var vid=(data['items'][0]['id']['videoId']);
    }
    // embedurl="https://www.youtube.com/watch?v="+vid;
    // alert (embedurl);
    $("main").append(`
							<article class="item" data-key="${vid}">

								<img src="${thumb}" alt="" class="thumb">
								<div class="details">
									<h4>${title}</h4>
									<p>${desc}</p>
								</div>

							</article>
						`);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
};

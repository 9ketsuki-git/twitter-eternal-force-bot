var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
const http = require('http');
const PORT = process.env.PORT || 80;
http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.end('server is running....');
}).listen(PORT);


client.stream('user', {},  function(stream) {
    stream.on( 'data', function( data ) {
        var text = data.text; // ツイートのテキスト
	client.post('favorites/create', {id: data.id_str}, function(err, response) {
        	    if (err) {
        	        console.log(text + ' - CANNOT BE FAVORITE... Error');
        	    } else {
        	        console.log(text + ' - FAVORITED... Success!!!');
       	  	    }
     	   });
	
    });
});
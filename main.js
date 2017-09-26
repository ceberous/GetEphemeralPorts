require("shelljs/global");
module.exports = function wEXEC( wFN ) {
	if ( !wFN ) { return; }
	var r1 = exec( wFN , { silent: true , async: false } );
	if ( r1.stderr.length > 1 ) { return r1.stderr; }
	r1 = r1.stdout.split("\n");
	if ( r1[0].split(" ")[0].trim() !== "Netid" ) { return "'ss' command error"; }
	var op = { udp: [] , tcp: [] };
	for ( var i = 1; i < r1.length; ++i ) {
		if ( !r1[i] ) { continue; }
		var x1 = r1[i].split(" ").filter(function(n){ return n != '' });
		var la = x1[4].split(":");
		var lp = la.pop();
		la = la.join("");
		var pa = x1[5].split(":");
		var pp = pa.pop();
		pa = pa.join("");
		op[ x1[0] ].push({
			status: x1[1] ,
			localAddr: la , 
			localPort: lp ,
			peerAddr: pa ,
			peerPort: pp ,
		});
	}
	return op;
}
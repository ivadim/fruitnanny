'use strict';
var AgeCalc = (function() {

    var getAge = function(fromdate, todate){
        if(todate) todate= new Date(todate);
        else todate= new Date();
  
        var age= [], fromdate= new Date(fromdate),
        y= [todate.getFullYear(), fromdate.getFullYear()],
        ydiff= y[0]-y[1],
        m= [todate.getMonth(), fromdate.getMonth()],
        mdiff= m[0]-m[1],
        d= [todate.getDate(), fromdate.getDate()],
        ddiff= d[0]-d[1];
        
        if(mdiff < 0 || (mdiff=== 0 && ddiff<0))--ydiff;
        if(mdiff<0) mdiff+= 12;
        if(ddiff<0){
            fromdate.setMonth(m[1]+1, 0);
            ddiff= fromdate.getDate()-d[1]+d[0];
            --mdiff;
        }
        if (mdiff < 0) {
            mdiff = 12 + mdiff
        }
        if(ydiff> 0) age.push(ydiff+ ' year'+(ydiff> 1? 's ':' '));
        if(mdiff> 0) age.push(mdiff+ ' month'+(mdiff> 1? 's':''));
        if(ddiff> 0) age.push(ddiff+ ' day'+(ddiff> 1? 's':''));
        if(age.length>1) age.splice(age.length-1,0,' and ');  
        
        
        return age.join('');
    }
    return {
        getAge: getAge
    }
})();
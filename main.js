const today = new Date();
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);
const days = [ "日", "月", "火", "水", "木", "金", "土" ];
window.onload = function () {
    showProcess(showDate);
};

//今月の祝日の抽出
function getSyukujitsu(year, month) {
    var holidays = [];
    var ym = year + "/" + (month+1);
    for (var i = 0; i < syukujitsu.length; i++) {
        if (syukujitsu[i].startsWith(ym)) {
            holidays.push(syukujitsu[i]);
        }
    }
    return holidays;
}

function prev(){
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}

function next(){
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}

//カレンダーの表示
function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var monthyear=document.getElementById("manthyear");
    monthyear.textContent=year+"年"+(month+1)+"月";

    var calendar=showday(year,month);
    document.querySelector('#calendar').innerHTML = calendar;
   

}

function showday(year, month){
    //今月の末日
    var lastdayOFthemonth = new Date(year, month+1, 0) ;
    var LastDayOfTheMonth = lastdayOFthemonth.getDate() ;
    //先月の末日
    var lastdayOFlastmonth=new Date(year, month, 0) ;
    var LastDayOfLastMonth = lastdayOFlastmonth.getDate() ;
    //今月の始めの曜日
    var dayofweek=days[showDate.getDay()];
    //祝日
    var holidays = getSyukujitsu(year, month);
    //祝日の年月日
    var holidayyearmonth=[];
    //祝日の日付
    var holidayDays=[];
    //祝日の名前
    var holidayNames=[];

    //祝日の年月日と名前を分離
    for (var i=0;i<holidays.length;i++){
        var holiday=holidays[i];
        var DaysNames=holiday.split(",");
        holidayyearmonth.push(DaysNames[0])
        holidayNames.push(DaysNames[1])
    }
    //年月日の分離
    for(var i=0;i<holidays.length;i++){
        var yearmonth=holidayyearmonth[i].split("/");
        holidayDays.push(parseInt(yearmonth[2]));
    }

    var NumberOfDays = [];
    var daysdate=[];
    //今月の日付
    for(var i=1;i<=LastDayOfTheMonth;i++){
        NumberOfDays.push(new Date(year, month, i));
    }
    //先月
    for(var i=0;i<showDate.getDay();i++){
        NumberOfDays.unshift(new Date(year, month-1,LastDayOfLastMonth-i));
        daysdate.unshift(LastDayOfLastMonth-i);
    }
    
    //来月
    for(var i=1;i<=6-lastdayOFthemonth.getDay();i++){
        NumberOfDays.push(new Date(year,month+1,i));
        daysdate.push(i);
    }
    var showcakendar ="<table><tr>"
    //曜日
    for(var i=0;i<days.length;i++){
        showcakendar+="<th>"+days[i]+"</th>"
    }
    
    showcakendar+="</tr>"
    var k=0;
    for(var i=0;i<NumberOfDays.length;i++){

        if(i%7===0){
            showcakendar+="<tr>"
        }
        if(year===today.getFullYear()&& month===(today.getMonth())&&NumberOfDays[i].getDate()===today.getDate()){

            //今日が休みか判定

            if (holidayDays.includes(NumberOfDays[i].getDate())){

                showcakendar+="<td class='todayholiday'>"+NumberOfDays[i].getDate()+"<p class='small'>"+holidayNames[k]+"</p>"+"</td>";

            }else if(i%7===0){

                showcakendar+="<td class='sun'>"+NumberOfDays[i].getDate()+"</td>";

            }else if(i%7===6){

                showcakendar+="<td class='sat'>"+NumberOfDays[i].getDate()+"</td>";

            }else{

                showcakendar+="<td class='today'>" + today.getDate() + "</td>";

            }

        }else if(i<showDate.getDay()||i>=(showDate.getDay()+LastDayOfTheMonth)){

            showcakendar+="<td class='notthemonth'>"+NumberOfDays[i].getDate()+"</td>"

        }else if(holidayDays.includes(NumberOfDays[i].getDate())){

            showcakendar+="<td class='holidaycolor'>"+NumberOfDays[i].getDate()+"<p class='small'>"+holidayNames[k]+"</p>"+"</td>";
            k++;

        }else{

            showcakendar+="<td>"+NumberOfDays[i].getDate()+"</td>"
        }

        if(i%7===6){
            showcakendar+="</tr>"
        }
        
    }
    showcakendar+="</table>"
   return showcakendar;

}

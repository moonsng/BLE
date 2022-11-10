// const {
//    Chart
// } = require("chart.js");

/*초기 날짜 설정*/
let today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1
let date = today.getDate();

let hours = today.getHours();
let minutes = today.getMinutes();
let seconds = today.getSeconds();

let query_table;
let chart_table;

//차트 정보갱신 및 그리기
function draw_chart(data) {
   //차트 상단 정보 갱신
   var sensor_info = document.getElementById("chart_info").children;
   var row_data = data;
   //0번은 선택센서 텍스트
   sensor_info[1].innerHTML = row_data.Gateway;
   sensor_info[2].innerHTML = row_data.Sensor_ID;
   sensor_info[3].innerHTML = row_data.Sensor_Name;
   sensor_info[4].innerHTML = "감지대상 " + row_data.Sensor_Target;
   if (row_data.Value == undefined) {
      sensor_info[5].innerHTML = "없음";
   } else {
      sensor_info[5].innerHTML = row_data.Value;
   }

   var last_time = row_data.Last;
   sensor_info[6].innerHTML = (last_time.substring(0, 10) + " " + last_time.substring(12, 19));

   //order by 시 성능저하.. 서브쿼리나, 인덱싱(DB측에서)
   var query = "select A.Gw_ID, A.Mdfy_Dttm,A.ss_Value," +
      "C.Ss_ID as Sensor_ID, C.Ss_ID_Nm as Sensor_Name, C.Ss_Stat as Sensor_Stat, " +
      " D.Ss_Nm as Sensor_Target " +
      "from r_sensor_dat A " +
      " join c_sensor_info C on A.Ss_ID = C.Ss_ID " +
      " join c_sensor_code D on C.Ss_Code = D.Ss_Code " + " where C.Ss_ID = " + "'" + row_data.Sensor_ID + "'" + " limit 40";

   //console.log(query);

   socket.emit('request_chart', query);
}

$(document).ready(function () {
   //날짜지정
   $("#cur_date").html(year + "-" + month + "-" + date);
   $("#cur_time").html(hours + ":" + minutes + ":" + seconds);

   //  $("#s_date").val(year+"-"+month+"-"+date);
   //  $("#e_date").val(year+"-"+month+"-"+date);

   //MIT lICENSE Tabulator
   chart_table = new Tabulator("#value_area", {
      layout: "fitColumns",
      renderHorizontal: "virtual",
      selectable: 1,
      debugInvalidOptions: false,
      columns: [{
            title: "번호",
            field: "index"
         },
         {
            title: "G/W ID",
            field: "Gateway"
         },
         {
            title: "센서ID",
            field: "Sensor_ID"
         },
         {
            title: "센서이름",
            field: "Sensor_Name"
         },
         {
            title: "감지대상",
            field: "Sensor_Target"
         },
         {
            title: "수신값",
            field: "Value"
         },
         {
            title: "수신시간",
            field: "Last"
         },
      ],
   });
   query_table = new Tabulator("#result_area", {
      layout: "fitColumns",
      renderHorizontal: "virtual",
      selectable: 1,
      debugInvalidOptions: false,
      columns: [{
            title: "번호",
            field: "index"
         },
         {
            title: "G/W ID",
            field: "Gateway"
         },
         {
            title: "G/W Name",
            field: "GW_Name"
         },
         {
            title: "게이트웨이상태",
            field: "GW_State"
         },
         {
            title: "위치",
            field: "Location"
         },
         {
            title: "구역",
            field: "Area"
         },
         {
            title: "센서ID",
            field: "Sensor_ID"
         },
         {
            title: "센서이름",
            field: "Sensor_Name"
         },
         {
            title: "센서상태",
            field: "Sensor_Stat"
         },
         {
            title: "감지대상",
            field: "Sensor_Target"
         },
         {
            title: "수신시간",
            field: "Last"
         },
         {
            title: "수신값",
            field: "Value"
         },
      ],
   });

   search();

});

//소켓이벤트
var socket = io();
//검색 데이터 리턴처리
socket.on('request_data', (result) => {
   //console.log(result);
   var work_sensor = 0;
   var broken_sensor = 0;

   query_table.setData();

   for (var i = 0; i < result.length; i++) {
      //숫자 카운트
      if (result[i].ss_Stat == "00") {
         work_sensor = work_sensor + 1;
      } else if (result[i].ss_Stat == "01") {
         broken_sensor = broken_sensor + 1;
      }

      var data = result[i];

      //console.log(data.Sensor_Stat);

      query_table.addRow({
         index: (i + 1),
         Gateway: data.Gw_ID,
         GW_Name: data.Gw_Nm,
         GW_State: data.gw_stat,
         Location: data.Gw_Nm_Abbr,
         Area: data.Gw_Nm_Pst,
         Sensor_ID: data.Sensor_ID,
         Sensor_Name: data.Sensor_Name,
         Sensor_Target: data.Sensor_Target,
         Sensor_Stat: data.Sensor_Stat,
         Last: data.Mdfy_Dttm,
         Value: data.ss_Value,
      });
   }

   //query_table.on("rowSelectionChanged", function(data, rows){
   query_table.on("rowClick", function (e, rows) {
      draw_chart(rows.getData());
   });

   $("#sensor_cnt").html("센서 건수 : " + result.length);
   $("#work_cnt").html("정상 건수 : " + work_sensor);
   $("#error_cnt").html("에러 건수 : " + broken_sensor);
});

//차트데이터 리턴 처리
socket.on('request_chart', (result) => {

   chart_table.setData();
   //차트 값 배열
   var chart_value = new Array();
   var chart_time = new Array();
   //차트 정보
   for (var i = 0; i < result.length; i++) {
      var data = result[i];
      chart_table.addRow({
         index: (i + 1),
         Gateway: data.Gw_ID,
         Sensor_ID: data.Sensor_ID,
         Sensor_Name: data.Sensor_Name,
         Sensor_Target: data.Sensor_Target,
         Value: data.ss_Value,
         Last: data.Mdfy_Dttm
      });
      //차트 측정 값 삽입
      chart_value.push(data.ss_Value);
      chart_time.push(data.Mdfy_Dttm.substring(0, 10) + " " + data.Mdfy_Dttm.substring(12, 19));
   }

   //캔버스 초기화를 위해 삭제 후 html 삽입   
   $('#chart_graph').remove();
   $('#chart_result').append('<canvas id="chart_graph"><canvas>');

   var chart_canvas = document.getElementById("chart_graph");

   // var ctx = document.getElementById("sensor_chart");
   // ctx.style.backgroundColor = 'rgba(0,0,10,0.5)';

   var sensor_chart = new Chart(chart_canvas, {
      type: 'line',
      data: {
         labels: chart_time,
         datasets: [{
            data: chart_value,
            backgroundColor: 'rgba(153, 204, 255, 0.75)',
            borderColor: 'rgba(255, 255, 255, 0.8)'
         }, ]
      },
      options: {
         //최신버전 범례 숨기기는 plugins 안에
         plugins: {
            legend: {
               display: false
            },
         },
         maintainAspectRatio: false,
         layout: {
            padding: {
               left: 50,
               right: 50,
               top: 10,
               bottom: 10
            }
         },
         title: {
            display: false,
            //text: 'World population per region (in millions)'
         },

      }
   });
});

function search() {
   var where = "";

   //게이트웨이
   var gateway = $('input[name="gateway"]:checked').val();
   //최근센서상태
   var state = $('input[name="state"]:checked').val();
   //Wi-sundmlruddn WSN01~WSN03
   switch (gateway) {
      case "All":
         where = "where ((A.Gw_ID Like 'PLC%') or (A.Gw_ID Like 'WSN%'))";
         break;
      case "PLC01":
         where = "where A.Gw_ID in(" + "'PLC01') ";
         break;
      case "PLC02":
         where = "where A.Gw_ID in(" + "'PLC02') ";
         break;
      case "PLC03":
         where = "where A.Gw_ID in(" + "'PLC03') ";
         break;
      case "Wi_Sun":
         where = "where A.Gw_ID Like 'WSN%' ";
         break;
   }

   switch (state) {
      case "All":
         where += " and C.Ss_Stat in(00,01,02,09) ";
         break;
      case "Work":
         where += " and C.Ss_Stat in(00) ";
         break;
      case "Alarm":
         where += " and C.Ss_Stat in(01,02) ";
         break;
      case "Other":
         where += " and C.Ss_Stat in(09) ";
         break;
   }

   // 날짜 불분명 검색안함
   // var s_date = $("#s_date").val();
   // var e_date = $("#e_date").val();

   // if((s_date!="")&(e_date !="")){
   //    where += ""
   // }
   // else if(s_date!=""){
   //    console.log("only start");
   // }
   // else if(e_date!=""){
   //    console.log("only end");
   // }

   //order by 시 성능저하.. 서브쿼리나, 인덱싱(DB측에서)
   var query = "select A.Gw_ID,A.ss_ID,A.ss_Stat as gw_stat,A.Mdfy_Dttm,A.ss_Value," +
      "B.Gw_Nm,B.Gw_Stat,B.Gw_Nm_Abbr,B.Gw_Nm_Pst," +
      "C.Ss_ID as Sensor_ID, C.Ss_ID_Nm as Sensor_Name, C.Ss_Stat as Sensor_Stat, " +
      " D.Ss_Nm as Sensor_Target " +
      "from r_sensor_dat A JOIN c_gateway_code B ON A.Gw_ID = B.Gw_ID " +
      " join c_sensor_info C on A.Ss_ID = C.Ss_ID " +
      " join c_sensor_code D on C.Ss_Code = D.Ss_Code " + where + " limit 40";

   socket.emit('request_data', query);
}

//자동검색 10초
setInterval(() => {
   var auto_checked = $('#auto_search').is(':checked');
   //console.log(auto_checked);
   if (auto_checked == true) {
      search();
   } else if (auto_checked == false) {
      console.log("false");
   }
}, 10000);

//현재시간
setInterval(() => {
   /*날짜 재지정*/
   let today = new Date();
   let hours = today.getHours();
   let minutes = today.getMinutes();
   let seconds = today.getSeconds();

   $("#cur_time").html(hours + ":" + minutes + ":" + seconds);

}, 1000);
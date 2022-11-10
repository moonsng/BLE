function getSensorData() {

    $.ajax({
        url: "/query",
        async: false,
        method: "GET"
    }).done(function (text) {
        if (text == null || text == "" || !text.result || text.result.length <= 0)
            return;

        //연도별 통계
        var yearDataMap = {};
        for (var i = 0; i < text.result.length; i++) {
            var year = new Date(text.result[i].event_time).getFullYear();
            var value = text.result[i].event_status;

            if (yearDataMap[year] == null)
                yearDataMap[year] = [];
            yearDataMap[year].push(value);
        }

        for (var year in yearDataMap) {
            console.log(yearDataMap[year]);

            var sum = 0;
            for (var val of yearDataMap[year]) {
                sum += val;
            }
            var avg = sum / yearDataMap[year].length;

            chartyear.data.labels.push(year);
            chartyear.data.datasets[0].data.push(avg);
        }

        chartyear.update();

        //월별 통계
        var monthDataMap = {};
        for (var i = 0; i < text.result.length; i++) {
            var month = new Date(text.result[i].event_time).getMonth() + 1;
            var value = text.result[i].event_status;

            if (monthDataMap[month] == null)
                monthDataMap[month] = [];
            monthDataMap[month].push(value);
        }

        for (var month in monthDataMap) {
            console.log(monthDataMap[month]);

            var sum = 0;
            for (var val of monthDataMap[month]) {
                sum += val;
            }
            var avg = sum / monthDataMap[month].length;

            chartmonth.data.labels.push(month);
            chartmonth.data.datasets[0].data.push(avg);
        }

        chartmonth.update();

        //요일 통계
        var dowDataMap = {};
        for (var i = 0; i < text.result.length; i++) {
            var dow = new Date(text.result[i].event_time).getDay();
            var value = text.result[i].event_status;

            if (dowDataMap[dow] == null)
                dowDataMap[dow] = [];
            dowDataMap[dow].push(value);
        }

        for (var dow in dowDataMap) {
            console.log(dowDataMap[dow]);

            var sum = 0;
            for (var val of dowDataMap[dow]) {
                sum += val;
            }
            var avg = sum / dowDataMap[dow].length;

            chartdow.data.labels.push(dow);
            chartdow.data.datasets[0].data.push(avg);
        }

        chartdow.update();

        //시간별 통계
        var hourDataMap = {};
        for (var i = 0; i < text.result.length; i++) {
            var hour = new Date(text.result[i].event_time).getHours();
            var value = text.result[i].event_status;

            if (hourDataMap[hour] == null)
                hourDataMap[hour] = [];
            hourDataMap[hour].push(value);
        }

        for (var hour in hourDataMap) {
            console.log(hourDataMap[hour]);

            var sum = 0;
            for (var val of hourDataMap[hour]) {
                sum += val;
            }
            var avg = sum / hourDataMap[hour].length;

            charthour.data.labels.push(hour);
            charthour.data.datasets[0].data.push(avg);
        }

        charthour.update();


        //센서별 통계 - photo scanner
        var laserDataMap = {};
        for (var i = 0; i < text.result.length; i++) {
            var sensor = text.result[i].sensorid;
            var value = text.result[i].event_status;

            if (laserDataMap[sensor] == null)
                laserDataMap[sensor] = [];
            laserDataMap[sensor].push(value);
        }
        for (var sensor in laserDataMap) {
            console.log(laserDataMap[sensor]);

            var sum = 0;
            for (var val of laserDataMap[sensor]) {
                sum += val;
            }
            var avg = sum / laserDataMap[sensor].length;

            chartphoto.data.labels.push(sensor);
            chartphoto.data.datasets[0].data.push(avg);
        }
        chartphoto.update();


    });
}

var chartyear;
var chartmonth;
var chartdow;
var charthour;

var chartphoto;

$(document).ready(() => {

    var chartArea = document.getElementById('chartyear').getContext('2d');

    chartyear = new Chart(chartArea, {
        type: 'bar',
        data: {
            // ③x축에 들어갈 이름들(Array)
            labels: [],
            // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
            datasets: [{
                label: 'event status',
                data: [],
                backgroundColor: 'rgba(255, 51, 51, 0.5)',
                borderColor: 'rgba(255, 00, 00, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var chartArea = document.getElementById('chartmonth').getContext('2d');

    chartmonth = new Chart(chartArea, {
        type: 'bar',
        data: {
            // ③x축에 들어갈 이름들(Array)
            labels: [],
            // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
            datasets: [{
                label: 'event status',
                data: [],
                backgroundColor: 'rgba(255, 204, 00, 0.5)',
                borderColor: 'rgba(255, 204, 00, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var chartArea = document.getElementById('chartdow').getContext('2d');

    chartdow = new Chart(chartArea, {
        type: 'bar',
        data: {
            // ③x축에 들어갈 이름들(Array)
            labels: [],
            // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
            datasets: [{
                label: 'event status',
                data: [],
                backgroundColor: 'rgba(000, 255, 255, 0.5)',
                borderColor: 'rgba(000, 255, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    var chartArea = document.getElementById('charthour').getContext('2d');

    charthour = new Chart(chartArea, {
        type: 'bar',
        data: {
            // ③x축에 들어갈 이름들(Array)
            labels: [],
            // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
            datasets: [{
                label: 'event status',
                data: [],
                backgroundColor: 'rgba(153, 255, 051, 0.5)',
                borderColor: 'rgba(153, 255, 051, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    //파이차트 시작

    var chartArea = document.getElementById('chartphoto').getContext('2d');
    chartphoto = new Chart(chartArea, {
        type: 'pie',
        data: {
            datasets: [{
                label: 'event status',
                data: [],
                backgroundColor: 'rgba(255, 255, 051, 0.8)',
                borderColor: 'rgba(255, 255, 051, 1)',
                borderWidth: 1
            }]
        },
        // ⑩차트의 설정(Object)
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Pie Chart'
                }
            }
        }
    });

    getSensorData();
});
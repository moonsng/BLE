function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
}

function shiftData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
}

function getDataLength(chart) {
    return chart.data.datasets[0].data.length;
}

function formatTime(seconds) {
    seconds = seconds.toFixed(0);
    var hour = parseInt(seconds / 3600) < 10 ? '0' + parseInt(seconds / 3600) : parseInt(seconds / 3600);
    var min = parseInt((seconds % 3600) / 60) < 10 ? '0' + parseInt((seconds % 3600) / 60) : parseInt((seconds % 3600) / 60);
    var sec = seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60;

    return min + ":" + sec;
}

function initGraph(chartID, label) {
    return new Chart(document.getElementById(chartID), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: [],
                label: label,
                borderColor: "#58c26a",
                fill: false,
                lineTension: 0.4
            }]
        },
        options: {
            bezierCurve: true,
            legend: {
                display: true
            }
        }
    });
}

function getSensorData(url, onSuccess) {
    $.ajax({
        url: url,
        async: false,
        method: "GET"
    }).done(function (text) {
        if (text == null || text == "")
            return;
        dom = parseXml(text);
        json = xml2json(dom);
        json = json.replaceAll("undefined", "");
        console.log(json);

        var jsonObj = JSON.parse(json);
        console.log(jsonObj);

        if (jsonObj.read_sample_seq == null || jsonObj.read_sample_seq.sample == null)
            return;

        let sampleArr = [];
        if (!Array.isArray(jsonObj.read_sample_seq.sample)) {
            sampleArr.push(jsonObj.read_sample_seq.sample);
        } else {
            sampleArr = jsonObj.read_sample_seq.sample;
        }

        for (let sam of sampleArr) {
            console.log(sam.data.sensorVal);
            sam.data.machineID = Number(sam.data.machineID);
            sam.data.sensorID = Number(sam.data.sensorID);
            sam.data.sensorType = Number(sam.data.sensorType);
            sam.data.sensorVal = Number(sam.data.sensorVal);
            sam.data.timestamp = Number(sam.data.timestamp) / 1000;
        }

        onSuccess(sampleArr);

        return sampleArr;
    });
}

$(document).ready(() => {
    var psGraph = initGraph("chartdivPS", "Photo sensor");
    var lsGraph = location.pathname.includes("main-2.html") ? psGraph : initGraph("chartdivLS", "Laser scanner");

    function updateData(useShift = false) {
        getSensorData("http://192.168.100.96:3000/applications/SafetySubscriberApplication/domain_participants/SafetySubscriberParticipant/subscribers/SafetySubscriber/data_readers/SafetyDataReader5/", (dataArr) => {
            for (let sam of dataArr) {
                if (sam.data.machineID == 2) {
                    let graph = sam.data.sensorType == 1 ? psGraph : lsGraph;
                    if (useShift && getDataLength(graph) > 30)
                        shiftData(graph);
                    addData(graph, formatTime(sam.data.timestamp), sam.data.sensorVal);

                }
            }
        });

        if ($("#psButton.on").length > 0)
            psGraph.update();
        if ($("#lsButton.on").length > 0)
            lsGraph.update();
    }

    updateData();
    setInterval(function () {
        updateData(true);
    }, 100)
});
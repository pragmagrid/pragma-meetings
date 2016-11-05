<!doctype html>
<html>

<head>
    <link href="style.css" type="text/css" rel="stylesheet" />
</head>

    <body>
	
        <div class='left'>
            <div class='total' style="font-size:25px;">TOTAL</div>
            <div class='totnum' id="box-total"></div>
            <div class='exp' style="font-size:18px;">EXPERIMENTS</div>
            <div id="chart"></div>
        </div>
        <div class='top'>
		
            <div id="header" style="padding-top:20px; height:60px; color:white; background-color:#363636; text-align:center; font-size:20px;
			font-weight:bold; width:100%; float:right;">
                LifeMapper <?php echo "    ".date('d-m-Y'); ?>
            </div>
			
            <div id="allcontents">
                <div class='col' style="background:#2cb0d7;">
                    <div style="text-align:center; margin-top:3%; font-size:31px; font-weight:bold;">INITIAL</div>
                    <img src="check2.png" height="25%" width="25%" style="display: -webkit-box; margin:auto; margin-top:5%;" />
                        <div style="text-align:center; margin-top:1%; font-size:70px; font-weight:bold;  margin-top:5%;" id="box-intitial">  </div>
                </div>
                <div class='col' style="background:#f9bb58">
                    <div style="text-align:center; margin-top:3%; font-size:31px; font-weight:bold;">RUNNING</div>
                    <img src="loading.png" height="25%" width="25%" style="display: -webkit-box; margin:auto; margin-top:5%;">
                     <div style="text-align:center; margin-top:1%; font-size:70px; font-weight:bold;  margin-top:5%;" id="box-running"></div>
                </div>
                <div class='col' style="background:#15bd9e">
                    <div style="text-align:center; margin-top:3%; font-size:31px; font-weight:bold;">COMPLETE</div>
                    <img src="check1.png" height="25%" width="25%" style="display: -webkit-box; margin:auto; margin-top:5%;">
                        <div style="text-align:center; margin-top:1%; font-size:70px; font-weight:bold;  margin-top:5%;" id="box-complete"></div>
                </div>
                <div class='col' style="background:#e14355">
                    <div style="text-align:center; margin-top:3%; font-size:31px; font-weight:bold;">ERROR</div>
                    <img src="error-advice-sign.png" height="25%" width="25%" style="display: -webkit-box; margin:auto; margin-top:5%;">
                        <div style="text-align:center; margin-top:1%; font-size:70px; font-weight:bold;  margin-top:5%;" id="box-error"> </div>
                </div>
            </div>
            <center><div id="algochart" style=" background-color:white; width:100%; float:right;">
                
                    <div style="margin-left:1%; width:100%;  background-color: #ffffff; color:black;" id="test">ERROR BY ALGORITHM</div>
                    <div id='donutchart' style='width: 50%; height: 400px;'></div>
                
            </div></center>
        </div>
        <script src="google-chart.js"></script>
        <script src="loader.js"></script>
        <script src='jquery.js'></script>
		<?php
			
			$startDate = date('Y-m-d');
			$date1 = str_replace('-', '/', $startDate);
			$endDate = date('Y-m-d',strtotime($date1 . "+1 days"));
		?>
        <script>
            var apiLink = 'http://svc.lifemapper.org/services/sdm';
			
            var startDate = '2016-09-05';
			 var startDate = <?php echo json_encode($startDate); ?>;
            var endDate = '2016-09-06';
			 var endDate = <?php echo json_encode($endDate); ?>;
            var att_max = 0; 
            var other = 0;

            window.total = 0;
            window.totalIntitial = 0;
            window.totalComplete = 0;
            window.totalRunning = 0;
            window.totalError = 0;
            window.totalErrorBIOCLIM = 0;
            window.totalErrorATT = 0;

            

            $.getJSON(apiLink + '/experiments/json' + '?afterTime=' + startDate + '&beforeTime=' + endDate + '&perPage=0', function(experimentData) {
                total = parseInt(experimentData.itemCount);
                $('#box-total').html(total);
                console.log('total = ' + total)
            });

            $.getJSON(apiLink + '/experiments/json' + '?afterTime=' + startDate + '&beforeTime=' + endDate + '&status=1' + '&perPage=0', function(experimentData) {
                totalIntitial = parseInt(experimentData.itemCount);
                $('#box-intitial').html(totalIntitial);
                console.log('totalIntitial = ' + totalIntitial)
            });

            $.getJSON(apiLink + '/experiments/json' + '?afterTime=' + startDate + '&beforeTime=' + endDate + '&status=300' + '&perPage=0', function(experimentData) {
                totalComplete = parseInt(experimentData.itemCount);
                $('#box-complete').html(totalComplete);
                console.log('totalComplete = ' + totalComplete)
            });

            runningCheck();
            errorCheck();

            function runningCheck() {
                var runningStatus = [90,100,105,110,120,130,140,150,200];
                for (var i = 0; i < runningStatus.length; i++) {
                    var runningCode = runningStatus[i];
                    $.getJSON(apiLink + '/experiments/json' + '?afterTime=' + startDate + '&beforeTime=' + endDate + '&status=' + runningCode + '&perPage=0', function(experimentData) {
                        totalRunning = parseInt(totalRunning) + parseInt(experimentData.itemCount);
                    });
                }
            }

            function errorCheck() {
                var errorStatus = [
                    1000, 1001, 1002, 1003, 1100, 1150, 1201, 1202, 1203, 1204, 1205, 1301, 1302, 1303, 2100, 2101, 2102, 2103, 2200, 2201, 2204, 2300, 2301, 2302, 2400, 2401, 2402, 2403,
                    2415, 2000, 3000, 3100, 3110, 3111, 3112, 3120, 3121, 3122, 3123, 3130, 3131, 3132, 3134, 3135, 3140, 3141, 3143, 3150, 3160, 3161, 3162, 3200, 3210, 3220, 3500, 3601,
                    3602, 3603, 3604, 3740, 3750, 3751, 3801, 3901, 4000, 4400, 4401, 4403, 4404, 4405, 4406, 4407, 4408, 4409, 4410, 4411, 4412, 4413, 4414, 4415, 4416, 4417, 4500, 4501,
                    4502, 4503, 4504, 4505, 5000, 5100, 5101, 5102, 5103, 5200, 5201, 5202, 5203, 5300, 5301, 5302, 5303, 6000, 6001, 6100, 6110, 6111, 6112, 6113, 6120, 6121, 6122, 6123,
                    6130, 6131, 6132, 6133, 6200, 6210, 6211, 6212, 6213, 6220, 6221, 6222, 6223, 6230, 6231, 6232, 6233, 6300, 6301, 6302, 6303, 6400, 6401, 6402, 6403, 6500, 6501, 6502,
                    6503, 6600, 6601, 6602, 6603, 7000, 7100, 8000, 8100, 8110, 8200, 8300, 8312, 8400, 8410, 8500, 8510, 8600, 8601, 8610, 301100, 301112, 301121, 301130, 301141, 301143, 302150
                ];
                for (var i = 0; i < errorStatus.length; i++) {
                    var errorCode = errorStatus[i];
                    $.getJSON(apiLink + '/experiments/json' + '?afterTime=' + startDate + '&beforeTime=' + endDate + '&status=' + errorCode + '&perPage=0&algorithmCode=BIOCLIM', function(experimentData) {
                        totalErrorBIOCLIM = parseInt(totalErrorBIOCLIM) + parseInt(experimentData.itemCount);
                        totalError = parseInt(totalError) + parseInt(experimentData.itemCount);
                    });

                    $.getJSON(apiLink + '/experiments/json' + '?afterTime=' + startDate + '&beforeTime=' + endDate + '&status=' + errorCode + '&perPage=0&algorithmCode=ATT_MAXENT', function(experimentData) {
                        totalErrorATT = parseInt(totalErrorATT) + parseInt(experimentData.itemCount);
                        totalError = parseInt(totalError) + parseInt(experimentData.itemCount);
                    });
                }
            }

            $(document).ajaxStop(function() { //after get all data
                $('#box-running').html(totalRunning);
                $('#box-error').html(totalError);
                console.log(totalRunning);
                genGraph();
            });

            function genGraph() {
                google.charts.load("current", {
                    packages: ["corechart"]
                });
                google.charts.setOnLoadCallback(drawChart);
                google.charts.setOnLoadCallback(drawVisualization);

                function drawChart() {
                    var data = google.visualization.arrayToDataTable([
                        ['Algorithm', 'error per day'],
                        ['ATT_MAXENT', totalErrorATT],
                        ['BIOCLIM', totalErrorBIOCLIM]
                    ]);

                    var options = {
                        title: 'ERROR BY ALGORITHM',
                        width: 500,
                        colors: ['#e2a8ae', '#df253a'],
                        chartArea: {
                            left: 20,
                            top: 6,
                            width: 500,
                            height: 500
                        },
                        pieHole: 0.4,
                        titleTextStyle: {
                            color: 'white',
                            fontName: 'Arial',
                            fontSize: '18',
                            fontWidth: 'normal'
                        }
                    };

                    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                    chart.draw(data, options);
                }

                function drawVisualization() {
                    // Create and populate the data table.
                    var data = google.visualization.arrayToDataTable([
                        ['', 'Intetial', 'Runtime', 'Complete', 'Error'],
                        ['', totalIntitial, totalRunning, totalComplete, totalError]
                    ]);
                    // Create and draw the visualization.
                    new google.visualization.ColumnChart(document.getElementById('chart')).
                    draw(data, {
                        title: "",
                        width: 200,
                        height: 624,
                        colors: ['#2cb0d7', '#f9bb58', '#15bd9e', '#e14355'],
                        backgroundColor: '#464646',
                        vAxis: {
                            title: ""
                        },
                        isStacked: true,
                        hAxis: {
                            title: ""
                        }
                    });
                }

            }

        </script>
    </body>

</html>

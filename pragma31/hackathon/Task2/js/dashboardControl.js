
//begin main information
var names=[];
var latitude=[];
var longitude=[];
var description=[];
var entEnable=[];
var allCPU=[]; 
var allMemory=[];
//begin extra information
var locations = [];
var notes=[];
var contact=[];
var statusID=[];
var pragmaBootPath=[];
var pragmaBootVersion=[];
var pythonPath=[];
var temporaryDirectory=[]; 
var deploymentType=[];
var siteHostname=[];

var resourcesNo;

var markers=[];

var myMap;
var countNum = 0;

var remainCPU=[];
var remainMemory=[];
var markerCluster;

function initMap() {
    var option = {
        center: {lat: 56.6075564, lng: -31.2048436},
        zoom: 2,
        backgroundColor: '#191E2C',
        mapTypeControl: false,
        styles: [
                {
                    featureType: 'water',
                    stylers: [{ color: '#191E2C' }]
                },
                {
                    featureType: 'landscape',
                    stylers: [{ color: '#3D4153' }]
                },
                {
                    featureType: 'poi',
                    stylers: [{ color: '#4E5265' }]
                },
                {
                    featureType: 'all',
                    elementsType: 'all',
                    stylers: [{ visibility: 'off'}]
                      
                },
                {
                    featureType: 'water',
                    elementsType: 'geometry',
                    stylers: [{ visibility: 'on'}]
                      
                },
                {
                    featureType: 'landscape',
                    elementsType: 'geometry',
                    stylers: [{ visibility: 'on'}]
                },
                {
                    featureType: 'administrative.country',
                    elementsType: 'geometry.stroke',
                    stylers: [{ visibility: 'off'}]
                }]
    };
    myMap = new google.maps.Map(document.getElementById('map'), option);
}

function setDescription(i){
 
    $('#1').text(notes[i]);
    $('#2').text(contact[i]);
    $('#3').text(locations[7]);
    $('#5').text(pragmaBootPath[i]);
    $('#6').text(pragmaBootVersion[i]);
    $('#7').text(pythonPath[i]);
    $('#8').text(temporaryDirectory[i]);
//    $('#9').text(names[i]);Username
    $('#10').text(deploymentType[i]);
    $('#11').text(siteHostname[i]);
    $('#12').text(latitude[i]);
    $('#13').text(longitude[i]);

   
}


function getDescription(){
    $.ajax({
          url: 'js/api/getResource.php',
          type: 'POST',
          datatype: 'json',
          crossDomain: true ,
          success:  function(result){
              
              var obj = JSON.parse(result);
              console.log(obj);

              resourcesNo=0;

              //get resource descriptions
              for(var i=0; i<obj.resources.length; i++){
                  //main information
                  names[i] = obj.resources[i].name;
                  console.log(names[i]);
                  latitude[i] = obj.resources[i].customAttributes[10].value;
                  longitude[i] = obj.resources[i].customAttributes[11].value;
                  description[i] = obj.resources[i].description;
                  entEnable[i] = obj.resources[i].customAttributes[8].value;
                  allCPU[i] = obj.resources[i].customAttributes[5].value;
                  allMemory[i] = obj.resources[i].customAttributes[6].value;

                  //begin extra information
                  locations[i] = obj.resources[i].location;
                  notes[i] = obj.resources[i].notes;
                  contact[i] = obj.resources[i].contact;
                  statusID[i] = obj.resources[i].statusId;
                  pragmaBootPath[i] = obj.resources[i].customAttributes[0].value;
                  pragmaBootVersion[i] = obj.resources[i].customAttributes[1].value;
                  pythonPath[i] = obj.resources[i].customAttributes[2].value;
                  temporaryDirectory[i] = obj.resources[i].customAttributes[3].value;
                  deploymentType[i] = obj.resources[i].customAttributes[7].value;
                  siteHostname[i] = obj.resources[i].customAttributes[11].value;

                  resourcesNo++;
              }
              getReservation();
              createMarker();
          },
          error:function(xhr,status){
              console.log(status);
          }
        }); 
}

function createMarker(){
        console.log("resources amount : "+ resourcesNo);
        var image;
        for(var i=0;i<resourcesNo;i++){

            if (entEnable[i]=='yes') {
                image = {
                    url: 'img/group3.png',
                };
            }else{
                image = {
                    url: 'img/group1.png',
                };
            }

            myLatLng = {lat: parseFloat(latitude[i]), lng: parseFloat(longitude[i])};
            markers[i] = new google.maps.Marker({
                  id: i,
                  position: myLatLng ,
                  map: myMap,
                  icon: image,
                  info: new google.maps.InfoWindow({
                        content: names[i]
                  })
                });

            
            markers[i].addListener('click', function() {
                countNum = countNum+1;
                count = "num"+countNum;
                console.log(count);
                if(entEnable[this.id]=="yes"){
                    colorEnt="#76FF03";
                }else{
                    colorEnt="#6E717E";
                }
                if(description[this.id]==null){
                    des = "-"; 
                }else{
                    des = description[this.id];
                }
                setDescription(this.id);
                
                $("#status").prepend("<section id='card-one' class='card "+count+"'><article class='article-bar'><p class='card-title'>"+names[this.id]+"</p><img class='btn_close' src='img/close.png' onclick=\"$('."+count+"').remove();$('.more_detail').hide();\"></article><section><p class='card-title-mini'>Available Resource</p><span class='chart-div' id='"+count+"1'></span><span class='chart-div chart_memory' id='"+count+"2'></span><div class=\"label-chart-big cpu-type\">"+remainCPU[this.id]+"</div><div class=\"label-chart-big mem-type\">"+remainMemory[this.id]+"</div><div class=\"label-chart-small cpu-type\">CPUs</div><div class=\"label-chart-small mem-type\">GB</div><span id='chart-cpu-lable'>CPU</span><span id='chart-memory-lable'>Memory</span><section id='resource'><span class='indicatior' id='indicatior-cpu'></span><span class='resource-detail'>CPU Available</span></br><span class='indicatior' id='indicatior-mem'></span><span class='resource-detail'>Memory Available</span></section></section><section id='ENT-section'><span class='card-title-mini oneline-title'>ENT-enabled</span><span class='indicatior-light' style='background-color:"+colorEnt+";'></span></section><section id='des-section'><p class='card-title-mini'>Description</p></br><div class='card-des-mini'>"+des+"</div></section><section id='tn-section'><button class='btn-default' onclick=\"$('.more_detail').show();setDescription("+(this.id)+");$('.card-title').text('"+names[this.id]+"');\">MORE INFO</button></section></section><script>google.charts.setOnLoadCallback(drawChart);function drawChart() {var data_cpu = google.visualization.arrayToDataTable([['CPU Resource', 'resource'],['Available',     "+remainCPU[this.id]+"],['Used',     "+(allCPU[this.id]-remainCPU[this.id])+"],]);var options_cpu = {backgroundColor: '#3D4153',pieSliceBorderColor: 'none',pieHole: 0.75,chartArea: {left:6,top:6,width:92,height:92},pieSliceText: 'none',slices: [{color: '#EFA430'}, {color: '#6E717E'}],legend: 'none'};var data_mem = google.visualization.arrayToDataTable([['CPU Resource', 'resource'],['Available',     "+remainMemory[this.id]+"],['Used',     "+(allMemory[this.id]-remainMemory[this.id])+"],]);var options_mem = {backgroundColor: '#3D4153',pieSliceBorderColor: 'none',pieHole: 0.75,chartArea: {left:6,top:6,width:92,height:92},pieSliceText: 'none',slices: [{color: '#9CCBE5'}, {color: '#6E717E'}],legend: 'none'};var aa = new google.visualization.PieChart(document.getElementById('"+count+"1'));var bb = new google.visualization.PieChart(document.getElementById('"+count+"2'));aa.draw(data_cpu, options_cpu);bb.draw(data_mem, options_mem);}</script>");
                console.log(entEnable[this.id]);
            });

            google.maps.event.addListener(markers[i], 'mouseover', function() {
            
                  console.log('over');
                  this.info.open(myMap,this);
              
            });

            google.maps.event.addListener(markers[i], 'mouseout', function() {
            
                  console.log('out');
                  this.info.close();
              
            });

        } //end for 

        markerCluster = new MarkerClusterer(myMap, markers, {imagePath: 'img/m'});

} //end createMarker


function getReservation(){
      remainCPU = allCPU.slice();;
      remainMemory = allMemory.slice();;
      $.ajax({
          url: 'js/api/getReservations.php',
          type: 'POST',
          dataType: 'json',
          crossDomain: true ,
          success:  function(result){
              var obj = result;
              var refNumber = obj.reservations[0].referenceNumber;
              console.log(obj);
              var reservationSize = obj.reservations.length;

              for(var i=0;i<reservationSize;i++){
                  $.ajax({
                            url: 'js/api/getReservation.php', //get reservation by reference number
                            type: 'POST',
                            dataType: 'json',
                            crossDomain: true ,
                            data: {ref: refNumber},
                            success:  function(res){
                              console.log(res);
                              var n = res.resources[0].name;

                              for(var j=0;j<resourcesNo;j++){
                                  if(n==names[j]){
                                      remainCPU[j]=remainCPU[j]-parseInt(res.customAttributes[0].value);
                                      remainMemory[j]=remainMemory[j]-parseInt(res.customAttributes[1].value);
                                  }

                              }

                            },
                            error:function(xhr,status){
                                console.log(status);
                            }
                          }); 

              }

                        

          }, //end success
          error:function(xhr,status){
              console.log(status);
          }
        }); 
}

function filterMarker(cpu,mem,ent){
    console.log("cpuuuuuuuuu");
    
      var image;
      if(!cpu){
        cpu=0;
      }
      if(!mem){
        mem=0;
      }
      if(!ent){
        ent='all';
      }

      console.log(cpu);
    console.log(mem);
    console.log(ent);

      clearMarkers();
    
      for(var i=0;i<resourcesNo;i++){

          if(remainCPU[i]>=cpu && remainMemory[i]>=mem && (entEnable[i]==ent || ent=='all')){
              if (entEnable[i]==ent || ent=='all') {
                  var image;

                      if (entEnable[i]=='yes') {
                          image = {
                              url: 'img/group3.png',
                          };
                      }else{
                          image = {
                              url: 'img/group1.png',
                          };
                      }

                      myLatLng = {lat: parseFloat(latitude[i]), lng: parseFloat(longitude[i])};
                      markers[i] = new google.maps.Marker({
                            id : i,
                            position: myLatLng ,
                            map: myMap,
                            icon: image,
                            info: new google.maps.InfoWindow({
                                    content: names[i]
                            })
                          });

                    
                 markers[i].addListener('click', function() {
                countNum = countNum+1;
                count = "num"+countNum;
                console.log(count);
                if(entEnable[this.id]=="yes"){
                    colorEnt="#76FF03";
                }else{
                    colorEnt="#6E717E";
                }
                if(description[this.id]==null){
                    des = "-"; 
                }else{
                    des = description[this.id];
                }
                setDescription(this.id);
                
                $("#status").prepend("<section id='card-one' class='card "+count+"'><article class='article-bar'><p class='card-title'>"+names[this.id]+"</p><img class='btn_close' src='img/close.png' onclick=\"$('."+count+"').remove();$('.more_detail').hide();\"></article><section><p class='card-title-mini'>Available Resource</p><span class='chart-div' id='"+count+"1'></span><span class='chart-div chart_memory' id='"+count+"2'></span><div class=\"label-chart-big cpu-type\">"+remainCPU[this.id]+"</div><div class=\"label-chart-big mem-type\">"+remainMemory[this.id]+"</div><div class=\"label-chart-small cpu-type\">CPUs</div><div class=\"label-chart-small mem-type\">GB</div><span id='chart-cpu-lable'>CPU</span><span id='chart-memory-lable'>Memory</span><section id='resource'><span class='indicatior' id='indicatior-cpu'></span><span class='resource-detail'>CPU Available</span></br><span class='indicatior' id='indicatior-mem'></span><span class='resource-detail'>Memory Available</span></section></section><section id='ENT-section'><span class='card-title-mini oneline-title'>ENT-enabled</span><span class='indicatior-light' style='background-color:"+colorEnt+";'></span></section><section id='des-section'><p class='card-title-mini'>Description</p></br><div class='card-des-mini'>"+des+"</div></section><section id='tn-section'><button class='btn-default' onclick=\"$('.more_detail').show();setDescription("+(this.id)+");$('.card-title').text('"+names[this.id]+"');\">MORE INFO</button></section></section><script>google.charts.setOnLoadCallback(drawChart);function drawChart() {var data_cpu = google.visualization.arrayToDataTable([['CPU Resource', 'resource'],['Available',     "+remainCPU[this.id]+"],['Used',     "+(allCPU[this.id]-remainCPU[this.id])+"],]);var options_cpu = {backgroundColor: '#3D4153',pieSliceBorderColor: 'none',pieHole: 0.75,chartArea: {left:6,top:6,width:92,height:92},pieSliceText: 'none',slices: [{color: '#EFA430'}, {color: '#6E717E'}],legend: 'none'};var data_mem = google.visualization.arrayToDataTable([['CPU Resource', 'resource'],['Available',     "+remainMemory[this.id]+"],['Used',     "+(allMemory[this.id]-remainMemory[this.id])+"],]);var options_mem = {backgroundColor: '#3D4153',pieSliceBorderColor: 'none',pieHole: 0.75,chartArea: {left:6,top:6,width:92,height:92},pieSliceText: 'none',slices: [{color: '#9CCBE5'}, {color: '#6E717E'}],legend: 'none'};var aa = new google.visualization.PieChart(document.getElementById('"+count+"1'));var bb = new google.visualization.PieChart(document.getElementById('"+count+"2'));aa.draw(data_cpu, options_cpu);bb.draw(data_mem, options_mem);}</script>");
                console.log(entEnable[this.id]);
            });
                  
                  
            google.maps.event.addListener(markers[i], 'mouseover', function() {
            
                  console.log('over');
                  this.info.open(myMap,this);
              
            });

            google.maps.event.addListener(markers[i], 'mouseout', function() {
            
                  console.log('out');
                  this.info.close();
              
            });
            
              } //end if ent-enable

          }
          
      }

      markerCluster = new MarkerClusterer(myMap, markers, {imagePath: 'img/m'});
          
      
} //end filterMarker

function clearMarkers() {
      for (var i = 0; i < markers.length; i++) {
          // console.log("clear");
          if(markers[i]!=null){
            markers[i].setMap(null);
            markers[i]=null;
          }
          
      }
      markers = [];

      if(markerCluster!=null){
        markerCluster.clearMarkers();
        markerCluster=null;
      }
      

}

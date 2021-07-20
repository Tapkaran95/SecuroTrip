// let platform = new H.service.Platform({
//     'apikey': 'HEuzgGKmCt9e5IitIoL4'
//   });
  let platform = new H.service.Platform({
    'app_id': 'p4tl7vKAUzephz5HdTgm',
    'app_code': 'XcGd4b7LkvK4Rs5QLZXLxw'
});
// let defaultLayers = platform.createDefaultLayers();

// // Instantiate (and display) a map object:
// let map = new H.Map(
//     document.querySelector('.map '),
//     defaultLayers.normal.map,
//     {
//       zoom: 15,
//       center: { lat: 52.5 , lng: 13.4}
//     });
//     // 51.500863, lng:-0.124615

//     let ui = H.ui.UI.createDefault(map, defaultLayers);
var test;
function landmarkGeocode() {
    var title = document.querySelector('h1').textContent;
    if(title.startsWith("Eiffle")){
      test=1;
    }
     else
      test=0;
    let geocoder = platform.getGeocodingService(),
      landmarkGeocodingParameters = {
        searchtext: title,
        jsonattributes : 1
      };
  
    geocoder.search(
      landmarkGeocodingParameters,
      showMap,
      (e) => console.log(e)
    );
}
function showMap(result) {
  let location;
  if(test==1){
    location = result.response.view[0].result[0].location.displayPosition;
   // console.log(location);
  }
   else{
    location = result.response.view[0].result[0].place.locations[0].displayPosition;
   }
    console.log(location);
    let defaultLayers = platform.createDefaultLayers();
    let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.normal.map,
    {
        zoom: 15,
        center: { lat: location.latitude, lng: location.longitude}
    });
    let marker = new H.map.Marker({lat: location.latitude, lng: location.longitude});
    map.addObject(marker);
    let ui = H.ui.UI.createDefault(map, defaultLayers);
}

landmarkGeocode();
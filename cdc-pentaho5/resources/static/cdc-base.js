var cdcFunctions = cdcFunctions || {};

cdcFunctions.getGenericCdcServicesUrl = function(){
  return Dashboards.getWebAppPath() + "/plugin/cdc/api/services/";
};

cdcFunctions.getMondrianCacheCleanServiceUrl = function(){
  return cdcFunctions.getGenericCdcServicesUrl() + "MondrianCacheCleanService/";
};

cdcFunctions.getHazelcastConfigurationServiceUrl = function(){
  return cdcFunctions.getGenericCdcServicesUrl() + "HazelcastConfigurationService/";
};

cdcFunctions.getHazelcastMonitorServiceUrl = function(){
  return cdcFunctions.getGenericCdcServicesUrl() + "HazelcastMonitorService/";
};

cdcFunctions.getDashboardCacheCleanServiceUrl = function(){
  return cdcFunctions.getGenericCdcServicesUrl() + "DashboardCacheCleanService/";
};

cdcFunctions.makeRequest = function (url, params) {
    var returnValue = "";
    $.ajax({
      url: url,
      type: "GET",
      dataType: 'json',
      async: false,
      data: params,
      success: function(data, textStatus, jqXHR){
          
          if( data == undefined) {
            Dashboards.log("Found error: Empty Data");
            return;
          }
          returnValue = $.parseJSON(data);
          if (!returnValue) {
            returnValue = data;
          }
          return;
    
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {          
        Dashboards.log("Found error: " + XMLHttpRequest + " - " + textStatus + ", Error: " +  errorThrown,"error");
      }
    }
    );

    return returnValue;

};

cdcFunctions.cubeListing = function(callback) {
    $.getJSON("olap/getCubes", {} ,callback);
  };

  cdcFunctions.cubeStructure = function(catalog, cube, callback){
    $.getJSON("olap/getCubeStructure", {
        catalog: catalog,
        cube: cube
      }, callback);
  };
  
  cdcFunctions.memberStructure = function(catalog, cube, member, callback){
    $.getJSON("olap/getLevelMembersStructure", {
        catalog: catalog,
        cube: cube,
        member: member,
        direction: "down"
      }, callback);
  };

    cdcFunctions.extractResult = function(response){
      return response.result ? response.result : response;
  };

  cdcFunctions.parseResponse = function(response){
    return response.result ? response : JSON.parse(response);
  };
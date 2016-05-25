angular.module("Factories", [])

.factory('Country', Country)
.factory('Flag', Flag)

function Country($http, $q) {
    return {
        getCountries: function() {
            var deferred = $q.defer();
            $http.get('http://api.geonames.org/countryInfoJSON?username=billh')
            .then(function(response) {
                deferred.resolve(response.data.geonames);;
            });
            return deferred.promise;
        }
    }
}

function Flag() {
    return {
        getFlag: function(countryCodeArray) {
        	var urlArray = [];
        	for(var i = 0; i < countryCodeArray.length; i++) {
        		urlArray.push('http://www.geonames.org/flags/x/'+countryCodeArray[i]+'.gif');
        	}
            return urlArray;
        }
    }
}
// var quizApp = angular.module('app', [])
//     .factory('Country', Country)
//     .controller('mainController', mainController);

// function Country($http, $q) {
//     return {
//         getCountries: function() {
//             var deferred = $q.defer();
//             $http.get('http://api.geonames.org/countryInfoJSON?username=billh')
//                 .then(function(response) {
//                     deferred.resolve(response.data.geonames);
//                 });
//             return deferred.promise;
//         }
//     }
// }

// function mainController($scope, Country) {
//     $scope.quiz = {
//         active: false,
//         results: false,
//         correct: 0,
//         current: 0,
//         length: 10,
//         questions: []
//     };

//     $scope.startCapitalQuiz = function() {
// 		$scope.quiz.current = 0;
//         $scope.quiz.correct = 0;

//         Country.getCountries().then(function(data) {
//             var countries = _.sampleSize(data, 50);

//             $scope.quiz.questions = countries.splice(0, 10);

//             for (var i = 0; i < 10; i++) {
//                 var answers = countries.splice(0, 4);
//                 answers.push(_.clone($scope.quiz.questions[i]));
//                 $scope.quiz.questions[i].answers = _.shuffle(answers);
//             }
//             $scope.quiz.active = true;
//         });
//     }

// 	$scope.answerQuestion = function(answer) {
//     	if ($scope.quiz.questions[$scope.quiz.current].countryName === answer) {
//         	alert('correct!');
//             $scope.quiz.correct++;
//         } else {
//         	alert('wrong!');
//         }

//         if ($scope.quiz.current < 9) {
//         	$scope.quiz.current++;
//         } else {
//         	$scope.quiz.active = false;
//             $scope.quiz.results = true;
//         }
// 	}

// }


angular.module('app', ['Factories', 'Directives'])

.controller('mainController', mainController);

function mainController($scope, Country, Flag) {
    $scope.quiz = {
        active: false,
        results: false,
        correct: 0,
        current: 0,
        length: 10,
        questions: []
    };

    // $scope.country = {
    //     flag: ""
    // }

    $scope.startCapitalQuiz = function() {
        $scope.quiz.current = 0;
        $scope.quiz.correct = 0;

        Country.getCountries().then(function(data) {
            var countries = _.sampleSize(data, 50);
            // console.log(countries);
            // console.log(countries.splice(0,4));
            // console.log(data);
            // console.log(countries);

            $scope.quiz.questions = countries.splice(0, 10);

            for (var i = 0; i < 10; i++) {
                var answers = countries.splice(0, 4);
                answers.push(_.clone($scope.quiz.questions[i]));
                $scope.quiz.questions[i].answers = _.shuffle(answers);
            }
            $scope.quiz.active = true;
        });

    }

    $scope.startFlagQuiz = function() {
        $scope.quiz.current = 0;
        $scope.quiz.correct = 0;

        Country.getCountries().then(function(data) {
            var countries = _.sampleSize(data, 50);

            $scope.quiz.questions = countries.splice(0, 10);
            console.log($scope.quiz.questions);
            // console.log($scope.quiz.questions[0].countryCode);
            var urlArray = [];
            for(var i = 0; i < $scope.quiz.questions.length; i++) {
                urlArray.push($scope.quiz.questions[i].countryCode.toLowerCase());
            }

            // $scope.country.flag = "";

            console.log(urlArray);
            var urlAnswers = Flag.getFlag(urlArray);
            console.log(urlAnswers);

            // $scope.quiz.flag = "http://www.geonames.org/flags/x/"+country.countryCode.toLowerCase()+".gif";
            // $scope.quiz.flag = "http://www.geonames.org/flags/x/no.gif";



            for (var i = 0; i < 10; i++) {
                var answers = countries.splice(0, 4);
                answers.push(_.clone($scope.quiz.questions[i]));
                // console.log($scope.quiz.questions[i]);
                $scope.quiz.questions[i].answers = _.shuffle(answers);
            }
            $scope.quiz.active = true;
        });
    }
    
    $scope.$on('score', function(event, outcome) {
        if (outcome === 'correct') {
            $scope.quiz.correct++;
        }
        
        $scope.quiz.current++;
        
        if ($scope.quiz.current === $scope.quiz.length) {
            $scope.quiz.active = false;
            $scope.quiz.results = true;
        }
    })

}

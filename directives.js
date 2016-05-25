angular.module('Directives',[])

.directive('progressBar', ProgressBar)
.directive('capitalQuestion', CapitalQuestion)
.directive('flagQuestion', FlagQuestion)

function CapitalQuestion() {
    return {
        templateUrl: 'capital-question.html',
        type: 'E',
        scope: {
            country: '=',
            answers: '='
        },
        link: function(scope, elem, attrs) {
            scope.answerQuestion = function(answer) {
                if (scope.country.countryName === answer) {
                    alert('correct!');
                    scope.$emit('score', 'correct')
                } else {
                    alert('wrong!');
                    scope.$emit('score', 'incorrect')
                }
            }
        }
    }
}

function FlagQuestion() {
    return {
        templateUrl: 'flag-question.html',
        type: 'E',
        scope: {
            country: '=',
            answers: '='
        },
        link: function(scope, elem, attrs) {
            scope.answerQuestion = function(answer) {
                if (scope.country.countryName === answer) {
                    alert('correct!');
                    scope.$emit('score', 'correct')
                } else {
                    alert('wrong!');
                    scope.$emit('score', 'incorrect')
                }
            }
        }
    }
}

function ProgressBar() {
    return {
        template: '<h4>Question {{ current + 1 }}/{{ length }}</h4>' +
        '<h4>Score {{ correct/length * 100 }}%<h4>',
        type: 'E',
        scope: {
            current: '=',
            length: '=',
            correct: '='
        }
    }
}
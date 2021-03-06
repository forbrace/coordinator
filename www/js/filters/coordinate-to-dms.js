/**
 * Created by dm on 6/1/16.
 * TODO: Cover with tests
 */
(function () {
    'use strict';

    angular.module('compass')
        .filter('coordinateToDms', coordinateToDms)
    ;

    /*
     * 122˚45‘45“ = 122.7625
     * 122 + 45/60 + 45/3600 = 122.7625
     * */

    function coordinateToDms() {
        return function (coordinate, type) {

            var coord = coordinate;
            var hemisphere = '';

            if (type === 'lat') {
                hemisphere = coord > 0 ? 'N' : (coord < 0 ? 'S' : '');
            }
            if (type === 'lng') {
                hemisphere = coord > 0 ? 'E' : (coord < 0 ? 'W' : '');
            }

            var deg = parseInt(coord);
            var minutes = Math.abs( parseInt( 60 * (Math.abs(coord) - Math.abs(deg) ), 10) );
            var seconds = 3600 * ( Math.abs(coord) - Math.abs(deg) - Math.abs(minutes) / 60 );

            var roundedSec = Math.round(seconds * 100) / 100;

            var minutesFormatted = ('0'+minutes).slice(-2);
            var secondsFormatted = roundedSec < 10 ? '0'+roundedSec : ''+roundedSec;

            return Math.abs(parseInt(coord, 10)) + '˚' + minutesFormatted + '′' + secondsFormatted + '″' + hemisphere;

        }
    }

}());

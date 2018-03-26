import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'r-seat',
  template: `
<div class="wrapper">
  <div class="container">
    <div class="seatCharts-row"></div>
    <div id="seat-map">
      <div class="front-indicator">Front</div>

    </div>
    <div class="booking-details">
      <h2>Booking Details</h2>

      <h3> Selected Seats (<span id="counter">0</span>):</h3>
      <ul id="selected-seats"></ul>

      Total: <b>$<span id="total">0</span></b>

      <button class="checkout-button">Checkout &raquo;</button>

      <div id="legend"></div>
    </div>
  </div>
</div>

  `
})
export class SetSeatComponent implements OnInit {
    constructor() {
    }
    ngOnInit() {
        let firstSeatLabel = 1;
        const  sc = $('#seat-map').seatCharts({
                map: [
                    'ff_ff',
                    'ff_ff',
                    'ee_ee',
                    'ee_ee',
                    'ee___',
                    'ee_ee',
                    'ee_ee',
                    'ee_ee',
                    'eeeee',
                ],
                seats: {
                    f: {
                        price   : 100,
                        classes : 'first-class',
                        category: 'First Class'
                    },
                    e: {
                        price   : 40,
                        classes : 'economy-class',
                        category: 'Economy Class'
                    }

                },
                naming : {
                    top : false,
                    getLabel : function (character, row, column) {
                        return firstSeatLabel++;
                    },
                },
                legend : {
                    node : $('#legend'),
                    items : [
                        [ 'f', 'available',   'First Class' ],
                        [ 'e', 'available',   'Economy Class'],
                        [ 'f', 'unavailable', 'Already Booked']
                    ]
                }
            });
    }
}
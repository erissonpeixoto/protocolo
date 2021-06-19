import Vue from 'vue'
import moment from 'moment';

const DateMoment = Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(new Date(value)).format('DD/MM/YYYY hh:mm')
  }
});

export default DateMoment;

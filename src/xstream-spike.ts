import { createDomEvent$ } from './xstream-dom';

createDomEvent$('#checkButton', 'click').addListener({
  next: () => {
    console.log('Check!');
  },
  complete: () => console.log('completed'),
  error: err => console.error(err),
});

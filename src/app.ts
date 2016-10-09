import * as Rx from 'rxjs/Rx';

type AppEvent = 'start' | 'checkButton';

const checkButton = document.querySelector('#checkButton');

const appStartEvent$ = Rx.Observable.of('start');
const checkButtonEvent$ = Rx.Observable.fromEvent(checkButton, 'click').mapTo('checkButton');

const appEvents: Rx.Observable<AppEvent> = Rx.Observable.merge(appStartEvent$, checkButtonEvent$);

const extractedEvent$ = new Rx.Subject();
const checkSuccessEvent$ = new Rx.Subject();

const extractEvent$ = appEvents.filter(ev => ev === 'start');


// const checkButtonState$ = che


/**
 * Simulating extraction by plugin
 */

extractEvent$.subscribe(ev => {
  console.log('start extracting');
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  setTimeout(() => {
    extractedEvent$.next(editor.value);
  }, 500);
});

/**
 * Simulating checking
 */
extractedEvent$.subscribe(ev => {
  console.log('start checking');
  setTimeout(() => {
    checkSuccessEvent$.next({});
  }, 500);
});

checkSuccessEvent$.subscribe(ev => {
  console.log('check success');
});


import * as Rx from 'rxjs/Rx';

/**
 * UI Elements
 */
const checkButton = document.querySelector('#checkButton') as HTMLButtonElement;

/**
 * Input Events
 */
const appStartInput$ = Rx.Observable.of('start');
const checkButtonInput$ = Rx.Observable.fromEvent(checkButton, 'click').mapTo('checkButton');

/**
 * Events when something is done.
 */
const extractionDone$ = new Rx.Subject();
const checkDone$ = new Rx.Subject();

/**
 * Commands
 */
const extractCommand$ = appStartInput$.merge(checkButtonInput$);




/**
 * States
 */

type CheckingState = 'canCheck' | 'checking' | 'extracting';
const checkButtonState$: Rx.Observable<CheckingState> = extractCommand$.mapTo('extracting')
  .merge(extractionDone$.mapTo('checking'))
  .merge(checkDone$.mapTo('canCheck'));


/**
 * Simulating extraction by plugin
 */

extractCommand$.subscribe(ev => {
  console.log('start extracting');
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  setTimeout(() => {
    console.log('ExtractionDone: ', editor.value);
    extractionDone$.next(editor.value);
  }, 500);
});

/**
 * Simulating checking
 */
extractionDone$.subscribe(ev => {
  console.log('start checking');
  setTimeout(() => {
    checkDone$.next();
  }, 500);
});




/**
 * Update UI
 */

checkDone$.subscribe(ev => {
  console.log('check success');
});

checkButtonState$.subscribe(checkingState => {
  checkButton.disabled = checkingState !== 'canCheck';
  const labelByState: {[key: string]: string} =  {
    canCheck: 'Check',
    checking: 'Checking',
    extracting: 'Extracting'
  };
  checkButton.innerText = labelByState[checkingState];
});




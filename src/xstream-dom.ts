import { Producer, Listener } from 'xstream';
import xs from 'xstream';

function createDomEventProducer(selector: string, eventName: string): Producer<Event> {
  let nodes: NodeList;
  let listener: Listener<Event>;

  function forwardEvent(event: Event) {
    listener.next(event);
  }

  return {
    start: function (listenerArg: Listener<Event>) {
      listener = listenerArg;
      nodes = document.querySelectorAll(selector);
      for (let i = 0, n = nodes.length; i < n; i++) {
        nodes[i].addEventListener(eventName, forwardEvent);
      }
    },

    stop: function () {
      for (let i = 0, n = nodes.length; i < n; i++) {
        nodes[i].removeEventListener(eventName, forwardEvent);
      }
    },
  };
}

export function createDomEvent$(selector: string, eventName: string) {
  return xs.create(createDomEventProducer(selector, eventName));
}



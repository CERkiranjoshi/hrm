import {
    trigger, animateChild, group,
    transition, animate, style, query, state
} from '@angular/animations';

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('login <=> hospitals', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('500ms ease-out', style({ left: '100%' }))
                ]),
                query(':enter', [
                    animate('500ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ])
    ]);

export const inOutAnimation = 
    trigger('flyInOut', [
        state('in', style({ transform: 'translate(0,0)' })),
        transition('void => *', [
          style({ transform: 'translate(0,-100%)' }),
          animate(500)
        ]),
        transition('* => void', [
          animate(500, style({ transform: 'translateX(100%)' }))
        ])
      ]);

export const inOutXYAnimation = 
      trigger('InOut', [
        state('in', style({ transform: 'translateX(0)' })),
        transition('void => *', [
          style({ transform: 'translateX(-100%)' }),
          animate(500)
        ]),
        transition('* => void', [
          animate(500, style({ transform: 'translateX(100%)' }))
        ])
      ])
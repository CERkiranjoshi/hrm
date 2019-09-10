import { HttpClientApp } from './common/service/httpclient.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, ObservableInput, of } from 'rxjs';

// export const userConfigLoad = function userConfigLoad(httpclientapp: HttpClientApp): (() => Promise<boolean>) {
//     return (): Promise<boolean> => {
//         return new Promise<boolean>((resolve: (a: boolean) => void): void => {
//             httpclientapp.get('api/me/')
//                 .pipe(
//                     map((x: HttpClientApp) => {
//                         httpclientapp.get('api/lookup_profiles/?offset=0&limit=20&profile_type=PARAS')
//                             .pipe(
//                                 map((y: HttpClientApp) => {
//                                     let data = { ...x, ...y };
//                                     sessionStorage.setItem('user', JSON.stringify(data));
//                                     resolve(true);
//                                 }),
//                                 catchError((y: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
//                                     if (y.status !== 404) {
//                                         resolve(true);
//                                     }
//                                     sessionStorage.setItem('user', JSON.stringify(x));
//                                     resolve(true);
//                                     return of({});
//                                 })
//                             ).subscribe();
//                     }),
//                     catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
//                         if (x.status !== 404) {
//                             resolve(false);
//                         }
//                         resolve(false);
//                         return of({});
//                     })
//                 ).subscribe();
//         });
//     };
// }

export const organisationConfigLoad = function load(httpclientapp: HttpClientApp): (() => Promise<boolean>) {
    return (): Promise<boolean> => {
        return new Promise<boolean>((resolve: (a: boolean) => void): void => {
            httpclientapp.get('assets/data/config.json')
                .pipe(
                    map((x: HttpClientApp) => {
                        //local json call start
                        httpclientapp.get('assets/data/local_config.json')
                            .pipe(
                                map((y: HttpClientApp) => {
                                    httpclientapp.organisationData = { ...x, ...y };
                                    sessionStorage.setItem('organisation', JSON.stringify(httpclientapp.organisationData));
                                    resolve(true);
                                }),
                                catchError((y: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
                                    if (y.status !== 404) {
                                        resolve(true);
                                    }
                                    httpclientapp.organisationData = { ...x };
                                    sessionStorage.setItem('organisation', JSON.stringify(httpclientapp.organisationData));
                                    resolve(true);
                                    return of({});
                                })
                            ).subscribe();
                        //local json call end
                    }),
                    catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
                        if (x.status !== 404) {
                            resolve(false);
                        }
                        resolve(true);
                        return of({});
                    })
                ).subscribe();
        });
    };
}
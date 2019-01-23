import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/Http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInteceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        return throwError(error.statusText);
                    }
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        console.error(applicationError);
                        return throwError(applicationError);
                    }
                    const serverError = error.error;
                    let modalStateErrors = '';
                    if (serverError && typeof serverError === 'object') {
                        for (const key in serverError) {
                            if (serverError[key]) {
                                modalStateErrors += serverError[key] + '\n';
                            }
                        }
                    }
                    return throwError(modalStateErrors || serverError || 'Server Error');
                }
            })
        );
    }
}

export const ErrorInteceptorProvider = {
    provider: HTTP_INTERCEPTORS,
    useClass: ErrorInteceptor,
    multi: true
};

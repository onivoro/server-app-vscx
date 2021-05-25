
import { Injectable } from '@nestjs/common';
import { BrowserService } from '@onivoro/server-browser';
import { from, Subject } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { IAction } from '../interfaces/action.interface';

@Injectable()
export class ServerAppVscxService {
  browser: any;
  page: any;
  constructor(
    private readonly browserService: BrowserService,
  ) { }

  private readonly downStream$$ = new Subject<IAction>();
  public readonly actions$ = this.downStream$$.asObservable();

  dispatch$$ = (action) =>
    from(
      this.page.evaluate(
        (detail) =>
          window.dispatchEvent(
            new CustomEvent('up', {
              detail,
            })
          ),
        action
      )
    )

  getActions$$(url: string) {
    return from(this.browserService.createAppRuntime(url)).pipe(
      tap(({ page, browser }) => {
        this.browser = browser;
        this.page = page;
      }),
      concatMap(
        async ({ page }) =>
          await page.exposeFunction('down', (action: IAction) => {
            console.log('page.exposeFunction.down', action);
            this.downStream$$.next(action);
          })
      ),
      // map(() => new ApiEffects(this.repoSvc, this.actions$)),
      // concatMap((fx) =>
      //   merge(fx.localstack$, fx.detailRepoStarted$, fx.exec$$)
      // ),
      // tap((action) => console.log('upStream$$', action)),
      // tap((action) =>
      //   from(
      //     this.page.evaluate(
      //       (detail) =>
      //         window.dispatchEvent(
      //           new CustomEvent('up', {
      //             detail,
      //           })
      //         ),
      //       action
      //     )
      //   )
      // )
    );
  }
}
/// use the existing thing u wrote that does the IO trick if u can
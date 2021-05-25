import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { ServerBrowserModule } from '@onivoro/server-browser';
import { ServerAppVscxService } from '../services/server-app-vscx.service';

@Module({
  imports: [
    ServerBrowserModule.forRoot({
      headless: false,
      defaultViewport: { width: 1800, height: 1000 },
      executablePath: process.env.CHROME_BIN,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(process.cwd(), 'dist/apps/browser'),
    }),
  ],
  providers: [
    ServerAppVscxService,
  ],
  exports: [ServerAppVscxService]
})
export class ServerAppVscxModule { }

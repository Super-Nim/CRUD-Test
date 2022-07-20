import { Controller, Get } from '@nestjs/common'
import { AppService } from '../services/app.service'
@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}
  @Get()
  default(): string {
    return this._appService.default()
  }
}

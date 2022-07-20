import { Controller, Get } from '@nestjs/common'

import { HealthChkService } from '../services/healthchk.service'

@Controller('/healthchk')
export class HealthChkController {
  constructor(private readonly _healthChkService: HealthChkService) {}

  @Get('status')
  status(): string {
    return this._healthChkService.status()
  }
}

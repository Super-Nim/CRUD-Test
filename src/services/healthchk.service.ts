import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthChkService {
  status(): string {
    return 'Test OK'
  }
}

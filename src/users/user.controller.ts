import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @MessagePattern('add_scan_user_to_queue')
  scanUser(): Promise<string> {
    return this.service.scanUser();
  }
}

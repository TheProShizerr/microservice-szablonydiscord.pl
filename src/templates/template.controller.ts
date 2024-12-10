import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TemplateService } from './template.service';

@Controller()
export class TemplateController {
  constructor(private readonly template: TemplateService) {}

  @MessagePattern('add_element_to_queue')
  createQueue(): Promise<string> {
    return this.template.createQueue();
  }
}

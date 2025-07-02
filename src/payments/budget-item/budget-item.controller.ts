import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BudgetItemService } from './budget-item.service';
import { CreateBudgetItemsDto } from './dto/create-budget-item.dto';
import { UpdateBudgetItemDto } from './dto/update-budget-item.dto';

@Controller('budget-item')
export class BudgetItemController {
  constructor(private readonly budgetItemService: BudgetItemService) {}

  @Post()
  create(@Body() createBudgetItemsDto: CreateBudgetItemsDto) {
    return this.budgetItemService.createBulk(createBudgetItemsDto.items);
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.budgetItemService.findOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateBudgetItemDto: UpdateBudgetItemDto,
  ) {
    return this.budgetItemService.update(uuid, updateBudgetItemDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.budgetItemService.remove(uuid);
  }
}

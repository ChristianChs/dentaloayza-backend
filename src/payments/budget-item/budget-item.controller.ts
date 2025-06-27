import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BudgetItemService } from './budget-item.service';
import { CreateBudgetItemDto } from './dto/create-budget-item.dto';
import { UpdateBudgetItemDto } from './dto/update-budget-item.dto';

@Controller('budget-item')
export class BudgetItemController {
  constructor(private readonly budgetItemService: BudgetItemService) {}

  @Post()
  create(@Body() createBudgetItemDto: CreateBudgetItemDto) {
    return this.budgetItemService.create(createBudgetItemDto);
  }

  @Get()
  findAll() {
    return this.budgetItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetItemDto: UpdateBudgetItemDto) {
    return this.budgetItemService.update(+id, updateBudgetItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetItemService.remove(+id);
  }
}

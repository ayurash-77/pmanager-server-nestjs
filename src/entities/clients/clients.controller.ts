import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/entities/users/guards/auth.guard';
import { Client } from '@app/entities/clients/client.entity';
import { RoleDecorator } from '@app/entities/roles/decorators/role.decorator';
import { RolesGuard } from '@app/entities/roles/guards/roles.guard';

@ApiTags('Клиенты')
@UseGuards(AuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // Создать нового клиента
  @Post()
  @ApiOperation({ summary: 'Создать нового клиента' })
  @ApiResponse({ status: 200, type: Client })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  // Получить всех клиентов
  @Get()
  @ApiOperation({ summary: 'Получить всех клиентов' })
  @ApiResponse({ status: 200, type: [Client] })
  getAll() {
    return this.clientsService.getAll();
  }

  // Получить клиента по ID
  @Get(':id')
  @ApiOperation({ summary: 'Получить клиента по ID' })
  @ApiResponse({ status: 200, type: Client })
  getById(@Param('id') id: string) {
    return this.clientsService.getById(+id);
  }

  // Изменить клиента по ID
  @Patch(':id')
  @ApiOperation({ summary: 'Изменить клиента по ID' })
  @ApiResponse({ status: 200, type: Client })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  // Удалить клиента по ID
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить клиента по ID' })
  @ApiResponse({ status: 200, type: Client })
  @RoleDecorator('Producer', 'Art director', 'Manager')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}

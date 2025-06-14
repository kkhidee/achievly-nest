import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/auth.guard';
import { UsersService } from '@/users/users.service';
import { BadRequest, ExtendedRequest } from '@/app/types/common.type';
import { ProfileDto, UserDto } from '@/users/dto/user.dto';
import { USER_NOT_FOUND } from '@/app/constants/error.constant';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/user')
  @ApiOperation({ summary: 'Get user', operationId: 'getUser' })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiResponse({ status: 404, type: BadRequest })
  async getUser(@Req() request: ExtendedRequest) {
    const user = await this.usersService.getUserById(request.user.id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return new UserDto(user);
  }

  @Get('/profile')
  @ApiOperation({ summary: 'Get user profile', operationId: 'getProfile' })
  @ApiResponse({ status: 200, type: ProfileDto })
  @ApiResponse({ status: 404, type: BadRequest })
  async getProfile(@Req() request: ExtendedRequest) {
    const user = await this.usersService.getUserProfile(request.user.id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return new ProfileDto(user);
  }
}

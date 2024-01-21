import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { IUserService } from './user';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';

@Controller(Routes.USERS)
export class UserController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  @Get('search')
  searchUsers(@Query('query') query: string) {
    if (!query)
      throw new HttpException('Provide a valid query', HttpStatus.BAD_REQUEST);

    return this.userService.searchUsers(query);
  }

  @Post('profile')
  @UseInterceptors(FileInterceptor('file'))
  async completeProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() userProfile: UserProfileDto,
  ) {
    console.log(file);
    console.log(userProfile);
    return this.userService.completeOnboarding({ file, ...userProfile });
  }

  @Get('check')
  async checkUsername(@Query('username') username: string) {
    if (!username)
      throw new HttpException(
        'Invalid Query Parameter',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.userService.findUser({ username });
    if (user) throw new UserAlreadyExistException();
    return HttpStatus.OK;
  }
}

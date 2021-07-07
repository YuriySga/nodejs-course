import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Logger,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { LoggingInterceptor } from './common/logging.interceptor';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  private readonly lo = AppController;

  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /*   @UseInterceptors(LoggingInterceptor) */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    const { access_token } = result;
    return { token: access_token };
  }
}

/* Method: ${req.method}\n
Url: ${req.url}\n 

fullUrl: ${req.protocol}://${req.get('host')}${req.originalUrl}\n     Request params: ${JSON.stringify(req.params)}\n     Request body: ${JSON.stringify(req.body)}\n     Request query: ${JSON.stringify(req.query)}\n     Responded with status ${res.statusCode}\n     Agent: ${req.get("user-agent")}`; */

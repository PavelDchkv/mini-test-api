import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesDBService {
  constructor(private httpService: HttpService) {}

  async getSessionId() {
    const apiKey = 'c192a079094160716b3290cca2487a86';
    const result = await firstValueFrom(
      this.httpService.get(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`,
      ),
    );

    return result.data.guest_session_id;
  }
}

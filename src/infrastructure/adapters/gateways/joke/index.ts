import {injectable} from 'tsyringe';
import {JokeDto, JokeApiGateway} from '@core/gateways/joke';
import axios, {AxiosInstance} from 'axios';

const getJokesApiInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: 'https://v2.jokeapi.dev/joke',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

@injectable()
export class JokeApiGatewayAdapter implements JokeApiGateway {
  async findByJokeId(id: number): Promise<JokeDto | undefined> {
    const {data} = await getJokesApiInstance().get<JokeDto>(`/Any?idRange=${id}`);

    return {
      id: data.id,
      joke: data.joke,
    };
  }
}

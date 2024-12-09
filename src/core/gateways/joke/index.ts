export type JokeDto = {
  id: number;
  joke: string;
};

export interface JokeApiGateway {
  findByJokeId(id: number): Promise<JokeDto | undefined>;
}

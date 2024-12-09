import {Entity, randomUUID, UUID} from '@shared/core';

export class Joke extends Entity {
  private jokeId!: number;
  private description!: string;

  private constructor(props: JokeProps) {
    super(props.id);
    Object.assign(this, props);
  }

  public static create(props: CreateJokeProps): Joke {
    return new Joke({
      id: randomUUID(),
      ...props,
    });
  }

  public static restore(props: JokeProps): Joke {
    return new Joke({
      ...props,
    });
  }

  serialize(): JokeProps {
    return {
      id: this.getIdentity().toString(),
      jokeId: this.jokeId,
      description: this.description,
    };
  }
}

export type JokeProps = {
  id: UUID;
  jokeId: number;
  description: string;
};

export type CreateJokeProps = Omit<JokeProps, 'id'>;

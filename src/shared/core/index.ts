export type UUID = string;

export abstract class Entity {
  private readonly id: UUID;

  protected constructor(id: UUID) {
    this.id = id;
  }

  public getIdentity(): UUID {
    return this.id;
  }

  abstract serialize(): unknown;
}

export function randomUUID(): UUID {
  return crypto.randomUUID();
}

export interface ExecutableUseCase<I, O> {
  execute(input: I): Promise<O> | O;
}

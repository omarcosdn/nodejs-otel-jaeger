import {ExecutableUseCase} from '@shared/core';
import {injectable} from 'tsyringe';
import {RabbitMQPublisher} from '@infrastructure/adapters/amqp/rabbitmq.publisher';
import {connectToRabbitMQ} from '@infrastructure/adapters/amqp/rabbitmq.connector';

export type PubInput = {
  description: string;
};

@injectable()
export class PubUseCase implements ExecutableUseCase<PubInput, void> {
  async execute(input: PubInput): Promise<void> {
    const connection = await connectToRabbitMQ();
    const publisher = new RabbitMQPublisher(connection);
    await publisher.initialize();
    await publisher.publish('example-queue', input.description);
  }
}

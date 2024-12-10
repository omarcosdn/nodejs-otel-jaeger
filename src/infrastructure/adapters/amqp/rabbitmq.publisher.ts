import {Channel, Connection} from 'amqplib';
import {context, propagation, trace} from '@opentelemetry/api';
import {logger} from '@shared/logger';

export class RabbitMQPublisher {
  private channel: Channel | undefined;

  constructor(private connection: Connection) {}

  async initialize() {
    this.channel = await this.connection.createChannel();
  }

  async publish(queue: string, message: string) {
    if (!this.channel) {
      logger.error('amqp channel not initialized');
      throw new Error('amqp channel not initialized');
    }

    await this.channel.assertQueue(queue, {durable: true});

    const headers: Record<string, any> = {};
    propagation.inject(context.active(), headers);

    this.channel.sendToQueue(queue, Buffer.from(message), {headers});

    logger.info(`message was published to ${queue}`);
  }
}

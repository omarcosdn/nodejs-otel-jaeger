import {context, propagation, trace} from '@opentelemetry/api';
import {Channel, Connection} from 'amqplib';
import {logger} from '@shared/logger';

export class RabbitMQSubscriber {
  private channel: Channel | undefined;

  constructor(private connection: Connection) {}

  async initialize() {
    this.channel = await this.connection.createChannel();
  }

  async consume(queue: string, onMessage: (msg: string) => void) {
    if (!this.channel) {
      logger.error('amqp channel not initialized');
      throw new Error('amqp channel not initialized');
    }

    await this.channel.assertQueue(queue, {durable: true});

    await this.channel.consume(queue, (msg) => {
      if (!msg) return;

      const headers = msg.properties.headers || {};
      const extractedContext = propagation.extract(context.active(), headers);

      context.with(extractedContext, () => {
        const tracer = trace.getTracer('rabbitmq-subscriber');
        const span = tracer.startSpan('process-message', {attributes: {queue}});

        try {
          const messageContent = msg.content.toString();
          logger.info(`received message: ${messageContent}`);

          onMessage(messageContent);

          span.addEvent('message was processed', {content: messageContent});
        } catch (err) {
          if (err instanceof Error) {
            span.recordException(err);
          } else {
            span.recordException({message: String(err)});
          }
        } finally {
          span.end();
          this.channel!.ack(msg);
        }
      });
    });

    logger.info(`subscriber is listening ${queue}`);
  }
}

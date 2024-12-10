import amqp from 'amqplib';
import {logger} from '@shared/logger';

export const connectToRabbitMQ = async () => {
  const username = 'admin';
  const password = 'admin';
  const host = 'localhost';
  const port = 5672;
  const vhost = '/';

  try {
    const connection = await amqp.connect(`amqp://${username}:${password}@${host}:${port}${vhost}`);
    logger.info('rabbitmq connected successfully');
    return connection;
  } catch (error) {
    logger.error(error, 'an error occurred while connecting to rabbitmq');
    throw error;
  }
};

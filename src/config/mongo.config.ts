import { registerAs } from '@nestjs/config';

const namespace = 'mongo';

export const MONGO_CONFIG_KEYS = {
    URI : namespace + '.uri',
};

export const mongoConfig = registerAs(namespace, () => ({
    'uri':  process.env.MONGO_URI,
}));

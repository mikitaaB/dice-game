import { randomBytes, createHmac } from 'node:crypto';

const RANDOM_BYTES_LENGTH = 32;
const RANDOM_BUFFER_LENGTH = 4;

const generateSecretRandomKey = () => {
    return randomBytes(RANDOM_BYTES_LENGTH);
}

const calculateHMAC = (value, secret) => {
    return createHmac('sha3-256', secret)
            .update(value.toString())
            .digest('hex');
}

const generateRandomNumber = (max) => {
    const randomBuffer = randomBytes(RANDOM_BUFFER_LENGTH);
    const randomNumber = randomBuffer.readUInt32BE(0);
    return randomNumber % max;
}

const generateFairRandomValue = (max) => {
    const key = generateSecretRandomKey();
    const randomValue = generateRandomNumber(max);
    const hmac = calculateHMAC(randomValue, key);
    return { randomValue, key, hmac };
}

export {
    generateFairRandomValue,
    generateRandomNumber
};
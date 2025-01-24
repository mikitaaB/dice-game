import { randomBytes, createHmac, randomInt } from 'node:crypto';

const RANDOM_BYTES_LENGTH = 32;

const generateSecretRandomKey = () => {
    return randomBytes(RANDOM_BYTES_LENGTH);
}

const calculateHMAC = (value, secret) => {
    return createHmac('sha3-256', secret)
            .update(value.toString())
            .digest('hex');
}

const generateRandomNumber = (max) => {
    return randomInt(max);
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
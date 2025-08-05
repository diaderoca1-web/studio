'use server';
/**
 * @fileOverview Generates a PIX QR Code for deposits.
 *
 * - generatePixQRCode - A function that generates a PIX QR Code.
 * - GeneratePixQRCodeInput - The input type for the generatePixQRCode function.
 * - GeneratePixQRCodeOutput - The return type for the generatePixQRCode function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePixQRCodeInputSchema = z.object({
  amount: z.number().describe('The value of the transaction.'),
});
export type GeneratePixQRCodeInput = z.infer<typeof GeneratePixQRCodeInputSchema>;

const GeneratePixQRCodeOutputSchema = z.object({
  transactionId: z.string().describe('The unique ID for the transaction.'),
  qrCode: z.string().describe('The PIX QR Code string (copy-paste).'),
});
export type GeneratePixQRCodeOutput = z.infer<typeof GeneratePixQRCodeOutputSchema>;


export async function generatePixQRCode(input: GeneratePixQRCodeInput): Promise<GeneratePixQRCodeOutput> {
    console.log("Generating PIX QR Code for amount:", input.amount);

    // This is a mock implementation. In a real application, you would make a POST request
    // to the actual PIX API endpoint as shown in the documentation image.
    // The API key would be stored securely as an environment variable.

    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    const transactionId = `mock_tx_${Date.now()}`;
    // This is a mock QR code string. A real API would provide a valid one.
    // A valid PIX QR code needs to follow a specific format (EMV QRCPS-MPM).
    // This simplified version is for demonstration only and may not be scannable by all apps.
    const payloadFormatIndicator = '000201';
    const pointOfInitiationMethod = '010212'; // Static QR code
    const merchantAccountInformation = '26580014br.gov.bcb.pix0136' + (process.env.PIX_KEY || '123e4567-e89b-12d3-a456-426614174000').replace(/-/g, '');
    const merchantCategoryCode = '52040000'; // National Merchant
    const transactionCurrency = '5303986'; // BRL
    const transactionAmount = `54${input.amount.toFixed(2).length.toString().padStart(2, '0')}${input.amount.toFixed(2)}`;
    const countryCode = '5802BR';
    const merchantName = '5913' + 'Mock Payer';
    const merchantCity = '6009' + 'SAO PAULO';
    const additionalDataFieldTemplate = `62070503***`;
    
    const payload = `${payloadFormatIndicator}${pointOfInitiationMethod}${merchantAccountInformation}${merchantCategoryCode}${transactionCurrency}${transactionAmount}${countryCode}${merchantName}${merchantCity}${additionalDataFieldTemplate}`;

    const crc16 = (data: string) => {
        let crc = 0xFFFF;
        for (let i = 0; i < data.length; i++) {
            crc ^= data.charCodeAt(i) << 8;
            for (let j = 0; j < 8; j++) {
                crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
            }
        }
        return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    }
    
    const qrCode = `${payload}6304${crc16(payload)}`;
    
    const response: GeneratePixQRCodeOutput = {
        transactionId,
        qrCode,
    };

    return response;
}

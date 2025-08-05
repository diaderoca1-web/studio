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
  clientId: z.string().describe('The payment gateway client ID.'),
  clientSecret: z.string().describe('The payment gateway client secret.'),
  name: z.string().describe("The payer's full name."),
  document: z.string().describe("The payer's CPF document number."),
  email: z.string().describe("The payer's email address."),
});
export type GeneratePixQRCodeInput = z.infer<typeof GeneratePixQRCodeInputSchema>;

const GeneratePixQRCodeOutputSchema = z.object({
  transactionId: z.string().describe('The unique ID for the transaction.'),
  qrCode: z.string().describe('The PIX QR Code string (copy-paste).'),
});
export type GeneratePixQRCodeOutput = z.infer<typeof GeneratePixQRCodeOutputSchema>;


export async function generatePixQRCode(input: GeneratePixQRCodeInput): Promise<GeneratePixQRCodeOutput> {
    console.log("Generating PIX QR Code for amount:", input.amount);

    if (!input.clientId || !input.clientSecret) {
        throw new Error("Payment gateway credentials are not configured.");
    }
    
    // Step 1: Get Access Token
    const credentials = `${input.clientId}:${input.clientSecret}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');

    const tokenResponse = await fetch("https://api.pixupbr.com/v2/oauth/token", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${base64Credentials}`
        },
    });

    if (!tokenResponse.ok) {
        const errorBody = await tokenResponse.text();
        console.error("PIX Auth API Error:", errorBody);
        throw new Error(`PIX Auth API request failed with status ${tokenResponse.status}`);
    }
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
         throw new Error("Failed to retrieve access token from PIX API.");
    }
    
    // Step 2: Generate QR Code using the token
    const qrCodeResponse = await fetch("https://api.pixupbr.com/v2/pix/qrcode", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            amount: input.amount,
            payer: {
                name: input.name,
                document: input.document,
                email: input.email,
            },
        })
    });

    if (!qrCodeResponse.ok) {
        const errorBody = await qrCodeResponse.text();
        console.error("PIX QR Code API Error:", errorBody);
        throw new Error(`PIX QR Code API request failed with status ${qrCodeResponse.status}`);
    }

    const data = await qrCodeResponse.json();

    if (!data.qrcode || !data.transactionId) {
        console.error("Invalid response from PIX QR Code API:", data);
        throw new Error("Invalid response from PIX QR Code API.");
    }

    return {
        transactionId: data.transactionId,
        qrCode: data.qrcode,
    };
}

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
    
    // In a real application, you would make a POST request to the actual PIX API endpoint.
    // This mock simulates that call using the provided credentials.
    try {
        const response = await fetch("https://api.pixupbr.com/v2/pix/qrcode", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${input.clientSecret}` // Assuming Bearer token auth
            },
            body: JSON.stringify({
                amount: input.amount,
                payer_name: "Cliente Raspagreen", // Example data
                description: "Depósito Raspagreen",
                pix_key: input.clientId // Assuming the Client ID is the PIX key
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("PIX API Error:", errorBody);
            throw new Error(`PIX API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (!data.qr_code_text || !data.transaction_id) {
            throw new Error("Invalid response from PIX API");
        }

        return {
            transactionId: data.transaction_id,
            qrCode: data.qr_code_text,
        };

    } catch (error) {
        console.error("Error generating PIX QR Code:", error);
        // Fallback to a mock QR code for demonstration if API fails
        // This should be removed in a real production environment
        const transactionId = `fallback_tx_${Date.now()}`;
        const qrCode = `00020126580014br.gov.bcb.pix0136${input.clientId.replace(/[^0-9a-zA-Z]/g, '')}52040000530398654${input.amount.toFixed(2).length.toString().padStart(2, '0')}${input.amount.toFixed(2)}5802BR5913Mock Payer6009SAO PAULO62070503***6304`;
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
        const finalQrCode = `${qrCode}${crc16(qrCode)}`;
         return {
            transactionId,
            qrCode: finalQrCode,
        };
    }
}

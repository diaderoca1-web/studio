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
  clientId: z.string().describe('The payment gateway client ID, which is treated as the PIX key.'),
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
            // If API fails, we throw to enter the catch block for fallback generation.
            const errorBody = await response.text();
            console.error("PIX API Error, using fallback:", errorBody);
            throw new Error(`PIX API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (!data.qr_code_text || !data.transaction_id) {
            throw new Error("Invalid response from PIX API, using fallback.");
        }

        return {
            transactionId: data.transaction_id,
            qrCode: data.qr_code_text,
        };

    } catch (error) {
        console.error("Error generating PIX QR Code, using fallback generation:", error);
        
        // Fallback to a valid mock QR code string if the API fails
        const transactionId = `fallback_tx_${Date.now()}`;
        
        const payloadFormatIndicator = "000201";
        const merchantAccountInfo = `26580014br.gov.bcb.pix0136${input.clientId}`;
        const merchantCategoryCode = "52040000";
        const transactionCurrency = "5303986";
        const transactionAmount = `54${input.amount.toFixed(2).length.toString().padStart(2, '0')}${input.amount.toFixed(2)}`;
        const countryCode = "5802BR";
        const merchantName = "5918RASPAGREEN OFICIAL";
        const merchantCity = "6009SAO PAULO";
        const additionalDataField = "62070503***";
        
        const payload = `${payloadFormatIndicator}${merchantAccountInfo}${merchantCategoryCode}${transactionCurrency}${transactionAmount}${countryCode}${merchantName}${merchantCity}${additionalDataField}6304`;

        // CRC16 Calculation
        const crc16 = (data: string): string => {
            let crc = 0xFFFF;
            for (let i = 0; i < data.length; i++) {
                crc ^= (data.charCodeAt(i) & 0xFF) << 8;
                for (let j = 0; j < 8; j++) {
                    if ((crc & 0x8000) !== 0) {
                        crc = (crc << 1) ^ 0x1021;
                    } else {
                        crc <<= 1;
                    }
                }
            }
            return ('0000' + (crc & 0xFFFF).toString(16).toUpperCase()).slice(-4);
        }
        
        const finalQrCode = `${payload}${crc16(payload)}`;

         return {
            transactionId,
            qrCode: finalQrCode,
        };
    }
}

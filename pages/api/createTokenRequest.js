import Ably from "ably/promises";
import randomColor from 'randomcolor';

export default async function handler(req, res) {
    const client = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: randomColor() });
    res.status(200).json(tokenRequestData);
};
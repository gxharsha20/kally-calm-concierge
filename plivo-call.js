export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const PLIVO_ACCOUNT_ID = "MANWY5N2Y2YWYTODY1MS";
  const PLIVO_FLOW_ID = "460c7209-5192-4397-aacf-f1a498281318";
  const PLIVO_AUTH = "TUFOV1k1TjJZMllXWVRPRFkxTVM6TWpRMk9ERXhNek10TXpsak5DMDBPRGRtTFRZeFlUTXROVEUyWXpSag==";

  try {
    const { phone_number, script } = req.body;

    const plivoResponse = await fetch(
      `https://agentflow.plivo.com/v1/account/${PLIVO_ACCOUNT_ID}/flow/${PLIVO_FLOW_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${PLIVO_AUTH}`,
        },
        body: JSON.stringify({
          phone_number: phone_number || "+14084203256",
          script: script || "Hi, this is a reminder call from Kally.",
        }),
      }
    );

    const data = await plivoResponse.json();
    
    if (plivoResponse.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(plivoResponse.status).json(data);
    }
  } catch (error) {
    console.error('Plivo API error:', error);
    return res.status(500).json({ error: 'Failed to call Plivo API', details: error.message });
  }
}

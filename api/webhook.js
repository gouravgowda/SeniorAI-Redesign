export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email } = req.body;

        // Validate input
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        // Call AgentX API (server-to-server, no CORS issues)
        const response = await fetch('https://api.agentx.so/v1/agent/6942c185573fd82339f22c7c/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer AIzaSyCMfIBdosDTJqOVFr2HxvjAVI7BxP7EWl0'
            },
            body: JSON.stringify({
                message: `New user registered: Name: ${name}, Email: ${email}. Please send them a welcome email to ${email}.`
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('AgentX API error:', errorText);
            return res.status(response.status).json({
                error: 'Failed to send webhook to AgentX',
                details: errorText
            });
        }

        const data = await response.json();
        return res.status(200).json({
            success: true,
            message: 'Welcome email webhook triggered successfully',
            data
        });

    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}

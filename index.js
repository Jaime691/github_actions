const fetch = require( 'node-fetch' );

exports.handler = async ( event ) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const userMessage = event.queryStringParameters?.message;  // Get 'message' from query params

    if ( !userMessage ) {
        return {
            statusCode: 400,
            body: JSON.stringify( {
                error: "Missing 'message' query parameter"
            } )
        };
    }

    const url = "https://api.openai.com/v1/chat/completions";

    try {
        const response = await fetch( url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ apiKey }`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {
                model: "gpt-4",  // or "gpt-3.5-turbo"
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7
            } )
        } );

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify( {
                reply: data.choices[ 0 ].message.content  // Returning the assistant's reply
            } )
        };

    } catch ( error ) {
        console.error( "Error calling OpenAI API:", error );

        return {
            statusCode: 500,
            body: JSON.stringify( {
                error: "Failed to get response from OpenAI API"
            } )
        };
    }
};
const axios = require( 'axios' );

exports.handler = async ( event ) => {
    const apiKey = process.env.OPENAI_API_KEY;

    const userMessage = event.queryStringParameters?.message;

    if ( !userMessage ) {
        return {
            statusCode: 400,
            body: JSON.stringify( { error: "Missing 'message' query parameter" } )
        };
    }

    const url = "https://api.openai.com/v1/chat/completions";

    try {
        const response = await axios.post( url, {
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userMessage }
            ],
            temperature: 0.7
        }, {
            headers: {
                "Authorization": `Bearer ${ apiKey }`,
                "Content-Type": "application/json"
            }
        } );

        return {
            statusCode: 200,
            body: JSON.stringify( {
                reply: response.data.choices[ 0 ].message.content  // Return assistant's reply
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
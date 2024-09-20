// To check for available models check https://api.openai.com/v1/models with the Api key

exports.handler = async ( event ) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const userMessage = event.queryStringParameters?.message;

    if ( !userMessage ) {
        return {
            statusCode: 400,
            body: JSON.stringify( {
                error: "Missing 'message' query parameter"
            } )
        };
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${ apiKey }`;

    const data = {
        contents: [
            {
                parts: [
                    { text: userMessage }
                ]
            }
        ]
    };

    try {
        const response = await fetch( url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        } );

        const aiResponse = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify( {
                message: aiResponse
            } )
        };
    } catch ( error ) {
        console.error( "Error fetching data from Gemini API:", error );
        return {
            statusCode: 500,
            body: JSON.stringify( { message: "Error fetching data from Gemini API", error: error.toString() } ),
        };
    }
};

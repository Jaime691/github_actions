
exports.handler = async ( event ) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const userMessage = event.queryStringParameters?.message;

    if ( !userMessage ) {
        return {
            statusCode: 400,
            body: JSON.stringify( {
                error: "Missing 'message' query parameter"
            } )
        };
    }
    const url = "https://api.openai.com/v1/chat/completions";

    const response = await fetch( url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${ apiKey }`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: event.message }  // Using the event message passed to the Lambda
            ],
            temperature: 0.7
        } )
    } );

    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify( {
            message: data
        } )
    };
};
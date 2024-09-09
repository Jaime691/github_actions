// index.js
exports.handler = async ( event ) => {
    const name = event.queryStringParameters?.name || "World";  // Extract 'name' from query params
    console.log( `Hello, ${ name }` );

    return {
        statusCode: 200,
        body: JSON.stringify( `Hello, ${ name } from Lambda!` ),
    };
};


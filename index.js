// index.js
exports.handler = async (event) => {
    console.log("hello");
    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};


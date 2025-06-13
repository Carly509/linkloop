const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'LinkLoop',
        version: '1.0.0',
        description: 'API documentation for authentication, user, and profile management.',
    },
    host: 'localhost:3001',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Authentication',
            description: 'Operations related to user authentication',
        },
        {
            name: 'Users',
            description: 'Operations related to user management',
        },
        {
            name: 'Profiles',
            description: 'Operations related to user profiles',
        },
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in: 'header',
            name: 'Authorization'
        }
    },
    definitions: {
        User: {
            type: 'object',
            properties: {
                _id: {
                    type: 'string',
                    example: '507f1f77bcf86cd799439011'
                },
                email: {
                    type: 'string',
                    example: 'user@example.com'
                }
            }
        },
        Profile: {
            type: 'object',
            properties: {
                _id: {
                    type: 'string',
                    example: '507f1f77bcf86cd799439012'
                },
                userId: {
                    type: 'string',
                    example: '507f1f77bcf86cd799439011'
                },
                bio: {
                    type: 'string',
                    example: 'Software developer passionate about technology'
                },
                avatar: {
                    type: 'string',
                    example: 'https://example.com/avatar.jpg'
                }
            }
        },
        RegisterRequest: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    example: 'user@example.com'
                },
                password: {
                    type: 'string',
                    example: 'password123'
                }
            }
        },
        LoginRequest: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    example: 'user@example.com'
                },
                password: {
                    type: 'string',
                    example: 'password123'
                }
            }
        },
        ProfileUpdateRequest: {
            type: 'object',
            properties: {
                bio: {
                    type: 'string',
                    example: 'Updated bio description'
                },
                avatar: {
                    type: 'string',
                    example: 'https://example.com/new-avatar.jpg'
                }
            }
        },
        ProfileCreateRequest: {
            type: 'object',
            required: ['userId'],
            properties: {
                userId: {
                    type: 'string',
                    example: '507f1f77bcf86cd799439011'
                },
                bio: {
                    type: 'string',
                    example: 'New user bio'
                },
                avatar: {
                    type: 'string',
                    example: 'https://example.com/avatar.jpg'
                }
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js']; // Update this path to your main routes file

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('LinkLoop Swagger documentation generated successfully!');
});

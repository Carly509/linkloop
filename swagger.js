const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'LinkLoop',
        version: '1.0.0',
        description: 'API documentation for authentication, user, profile, post, and comment management.',
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
        {
            name: 'Posts',
            description: 'Operations related to posts',
        },
        {
            name: 'Comments',
            description: 'Operations related to comments',
        }
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
        },
        Post: {
            type: 'object',
            properties: {
                _id: { type: 'string', example: '507f1f77bcf86cd799439021' },
                content: { type: 'string', example: 'This is a post.' },
                author: { type: 'string', example: '507f1f77bcf86cd799439011' },
                createdAt: { type: 'string', example: '2025-06-15T14:57:00.000Z' }
            }
        },
        PostCreateRequest: {
            type: 'object',
            required: ['content'],
            properties: {
                content: { type: 'string', example: 'This is a new post.' }
            }
        },
        PostUpdateRequest: {
            type: 'object',
            properties: {
                content: { type: 'string', example: 'Updated post content.' }
            }
        },
        Comment: {
            type: 'object',
            properties: {
                _id: { type: 'string', example: '507f1f77bcf86cd799439031' },
                content: { type: 'string', example: 'Nice post!' },
                post: { type: 'string', example: '507f1f77bcf86cd799439021' },
                author: { type: 'string', example: '507f1f77bcf86cd799439011' },
                createdAt: { type: 'string', example: '2025-06-15T15:00:00.000Z' }
            }
        },
        CommentCreateRequest: {
            type: 'object',
            required: ['content', 'postId'],
            properties: {
                content: { type: 'string', example: 'Great post!' },
                postId: { type: 'string', example: '507f1f77bcf86cd799439021' }
            }
        },
        CommentUpdateRequest: {
            type: 'object',
            properties: {
                content: { type: 'string', example: 'Updated comment.' }
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = [
    './routes/index.js',
    './routes/postRoutes.js',
    './routes/commentRoutes.js'
];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('LinkLoop Swagger documentation generated successfully!');
});

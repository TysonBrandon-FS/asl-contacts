# ASL Contact Endpoint API

A RESTful API for managing contacts with filtering, sorting, and pagination capabilities.

## Project Structure

```
ASL-Contact-Endpoint/
├── controllers/
│   └── contactsController.js    # Business logic for contact operations
├── routes/
│   └── contacts.js              # Route definitions for contacts
├── models/                      # Data models (using @jworkman-fs/asl package)
├── server.js                    # Main server file
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```

## Features

- **CRUD Operations**: Create, Read, Update, Delete contacts
- **Filtering**: Filter contacts by field using custom headers
- **Sorting**: Sort contacts by any field in ascending or descending order
- **Pagination**: Navigate through large datasets with page controls
- **Error Handling**: Comprehensive error handling with proper HTTP status codes

## API Endpoints

### GET /contacts
List all contacts with optional filtering, sorting, and pagination.

**Query Parameters:**
- `sort`: Field to sort by (fname, lname, email, birthday)
- `direction`: Sort direction (asc, desc)
- `page`: Page number for pagination
- `size`: Number of items per page (max 20)

**Headers for Filtering:**
- `X-Filter-By`: Field to filter by (fname, lname, email, birthday)
- `X-Filter-Operator`: Comparison operator (eq, gt, gte, lt, lte)
- `X-Filter-Value`: Value to compare against

**Response Headers:**
- `X-Page-Total`: Total number of pages
- `X-Page-Next`: Next page number
- `X-Page-Prev`: Previous page number

### POST /contacts
Create a new contact.

**Request Body:**
```json
{
  "fname": "John",
  "lname": "Doe",
  "email": "john.doe@example.com",
  "phone": "555-123-4567",
  "birthday": "1990-01-01"
}
```

### GET /contacts/:id
Get a single contact by ID.

### PUT /contacts/:id
Update an existing contact.

### DELETE /contacts/:id
Delete a contact.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. For development with auto-restart:
```bash
npm run dev
```

## Testing

Run the test suite:
```bash
npm test
```

## Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **helmet**: Security middleware
- **morgan**: HTTP request logger
- **@jworkman-fs/asl**: Contact management library
- **jest**: Testing framework

## Error Handling

The API uses comprehensive error handling with proper HTTP status codes:

- `400 Bad Request`: Invalid input data
- `404 Not Found`: Contact not found
- `409 Conflict`: Duplicate contact
- `500 Internal Server Error`: Server errors

## Port Configuration

The server runs on port 8080 as required by the assignment specifications. 
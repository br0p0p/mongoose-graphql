/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Schema } from 'mongoose';

export const StoreModel = mongoose.model(
    'Store',
    new Schema({
        joinDate: Date,
        name: String,
        no: Number,
        placeId: String
    })
);

export const StoreType = `
  type Store {
    _id: String
    joinDate: Float
    name: String
    no: Float
    placeId: String
  }
`;

export const OrderModel = mongoose.model(
    'Order',
    new Schema({
        name: String,
        location: {
            deliveryInstructions: String,
            placeId: String
        },
        statusHistory: [
            {
                note: String,
                status: String
            }
        ],
        tags: [String]
    })
);

export const OrderTypes = `
  type OrderStatusHistory {
    _id: String
    note: String
    status: String
  }
  type OrderLocation {
    deliveryInstructions: String
    placeId: String
  }
  type Order {
    _id: String
    location: OrderLocation
    name: String
    statusHistory: [OrderStatusHistory]
    tags: [String]
  }
`;

const CategorySchema = new Schema({
    type: String
});

export const BookModel = mongoose.model(
    'Book',
    new Schema({
        category: CategorySchema,
        name: String
    })
);

export const BookTypes = `
  type BookCategory {
    _id: String
    type: String
  }
  type Book {
    _id: String
    category: BookCategory
    name: String
  }
`;

export const BookTypesExtended = `
  type BookCategory {
    _id: String
    genre: Genre
    type: String
  }
  type Book {
    _id: String
    category: BookCategory
    name: String
    publishers: [Publisher]
  }
`;

export const NotebookTypes = `
  type NotebookCategory {
    _id: String
    type: String
  }
  type Notebook {
    _id: String
    category: NotebookCategory
    name: String
  }
`;

export const AuthorModel = mongoose.model(
    'Author',
    new Schema({
        name: String,
        books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
        notebook: { type: Schema.Types.ObjectId, ref: 'Notebook' }
    })
);

export const AuthorType = `
  type Author {
    _id: String
    books: [Book]
    name: String
    notebook: Notebook
  }
`;

export const AuthorTypeExtended = `
type Author {
  _id: String
  books: [Notebook]
  name: String
  notebook: Notebook
}
`;

export const AuthorModelWithPrivateField = mongoose.model(
    'AuthorOmit',
    new Schema({
        name: String,
        books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
        hash: String
    })
);

export const AuthorTypeWithOmittedField = `
type AuthorOmit {
  _id: String
  books: [Book]
  name: String
}
`;

const bookSchema = new Schema({
    name: String,
    year: Number
});

const publisherSchema = new Schema({
    name: String,
    authors: [String]
});

export const AuthorWithNestedSchema = mongoose.model(
    'AuthorNested',
    new Schema({
        name: String,
        books: [bookSchema],
        publisher: publisherSchema
    })
);

export const AuthorTypeWithNestedSchema = `
type AuthorNestedPublisher {
  _id: String
  authors: [String]
  name: String
}

type AuthorNestedBook {
  _id: String
  name: String
  year: Float
}

type AuthorNested {
  _id: String
  books: [AuthorNestedBook]
  name: String
  publisher: AuthorNestedPublisher
}
`;

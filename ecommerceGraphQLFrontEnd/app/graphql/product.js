import { gql } from '@apollo/client';

export const getProducts = gql`
    query GetProducts{
        products{
            id
            name
            image
            price
            storage
        }
    }
`;

export const createProduct = gql`
    mutation CreateProduct($name: String!, $image: String!, $price: Float!, $storage: Int!) {
        createProduct(name: $name, image: $image, price: $price, storage: $storage) {
            id
            name
            image
            price
            storage
        }
    }
`;

export const deleteProduct = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
`;

export const updateProduct = gql`
    mutation UpdateProduct($id: ID!, $name: String!, $image: String!, $price: Float!, $storage: Int!) {
        updateProduct(id: $id, name: $name, image: $image, price: $price, storage: $storage) {
            id
            name
            image
            price
            storage
        }
    }
`;

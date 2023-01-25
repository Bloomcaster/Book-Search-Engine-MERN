import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String, $password: String) {
        login(email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation savebook(
        $bookId: String
        $authors: [String]
        $description: String
        $title: String
        $image: String
        $link: String
    ) {
        saveBook(
            bookId: $bookId
            authors: $authors
            description: $description
            titleL $title
            image: $image
            link: $link
        ) {
           _id
           username
           email
           bookCount
           savedBooks {
            bookId
            authors
            description
            title
            image
            link
           } 
        }
    }
`;
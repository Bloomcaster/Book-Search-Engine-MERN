import { gql } from '@apollo/client';

export const GET_LISTING = gql`
    query listing {
        listing {
            _id
            username
            email
            bookCount
            saveBooks {
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
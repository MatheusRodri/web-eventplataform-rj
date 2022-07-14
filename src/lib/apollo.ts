import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri:'https://api-sa-east-1.hygraph.com/v2/cl5li45hg47g301uibnsl47t6/master',
    cache: new InMemoryCache()
})
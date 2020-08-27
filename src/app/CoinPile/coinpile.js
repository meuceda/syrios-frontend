import React, { useState } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import GraphQLClient from './graphql-client';


const CoinPile = () => {

  const client = new ApolloClient({
    uri: "http://localhost:3002/graphql",
  });

  return (
    <div>
      <ApolloProvider client={client}>
        <div>
          <GraphQLClient />
        </div>
      </ApolloProvider>
    </div>
  );
};

export default CoinPile;
import React, { useState } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import GraphQLClient from './graphql-client';
import './coinpile.css';

const CoinPile = () => {

  const client = new ApolloClient({
    uri: "http://localhost:3002/graphql",
  });

  return (
    <div>
      <ApolloProvider client={client}>
        <div className="class-coinpile">
          <h2>Syrios Mongo Import 🚀</h2>
          <p>---------------------</p>
          <GraphQLClient />
        </div>
      </ApolloProvider>
    </div>
  );
};

export default CoinPile;
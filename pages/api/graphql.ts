import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import schema from '../../schema/schema';

const apolloServer = new ApolloServer({ schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'GraphQL endpoint is available.' });
  } else {
    await startServer
    await apolloServer.createHandler({
      path: '/api/graphql',
    })(req, res);
  }
}
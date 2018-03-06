import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import pagesRoutes from './pages/routes';
import graphqlRoutes from './graphql/routes';

const app = express();

app.use(bodyParser.json());
app.use('/', pagesRoutes);
app.use('/graphql', graphqlRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => process.stdout.write('Express app listening on localhost:3000\n'));

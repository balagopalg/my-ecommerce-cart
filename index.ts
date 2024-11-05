import express from 'express';
import helmet from 'helmet';
import connectDB from './src/config/db';
import itemRoutes from './src/routes/itemRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());

app.use('/api', itemRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

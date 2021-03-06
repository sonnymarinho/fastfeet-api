import { app } from './app';

const PORT = process.env.SERVER_PORT || 3333;

app.listen(PORT, () => {
  console.log('process env port: ', process.env.SERVER_PORT);

  console.log(`server started at port ${PORT} 🖥️`);
});

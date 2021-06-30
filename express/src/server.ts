import { app } from './app';
import { PORT } from './common/config'
import { TryDBConnect } from './helpers/db';
import { createAdmin } from './resources/users/user.service';

TryDBConnect(() => {
  createAdmin({
    name: 'admin',
    login: 'admin',
    password: 'admin',
  });

  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  )
});
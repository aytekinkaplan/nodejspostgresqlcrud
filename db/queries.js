const getAllUsers = (pool) => {
  return pool.query("SELECT * FROM users");
};

const getUserById = (pool, id) => {
  return pool.query("SELECT * FROM users WHERE id = $1", [id]);
};

const addUser = (pool, user) => {
  const { name, email } = user;
  return pool.query("INSERT INTO users (name, email) VALUES ($1, $2)", [
    name,
    email,
  ]);
};

const updateUser = (pool, id, user) => {
  const { name, email } = user;
  return pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [
    name,
    email,
    id,
  ]);
};

const deleteUser = (pool, id) => {
  return pool.query("DELETE FROM users WHERE id = $1", [id]);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};

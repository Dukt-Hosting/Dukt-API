CREATE TABLE IF NOT EXISTS login_data(
    username VARCHAR(20),
    password_hash VARCHAR(420)
);

CREATE TABLE IF NOT EXISTS client_tokens(
    username VARCHAR(20),
    key VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS admin_tokens(
    username VARCHAR(20),
    key VARCHAR(60)
);
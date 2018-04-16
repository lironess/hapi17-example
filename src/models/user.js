import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

import parameters from 'config/parameters';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    active: {
      type: DataTypes.BOOLEAN,
      validate: { notEmpty: true },
      defaultValue: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password_digest: {
      type: DataTypes.STRING,
      validate: { notEmpty: true }
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5]
      }
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() { return sign({ email: this.email, id: this.id }, parameters.JWT_SECRET, { algorithm: 'HS256' }); }
    }
  }, {
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['email'] }]
  });

  User.prototype.authenticate = function authenticate(value) {
    return (bcrypt.compareSync(value, this.password_digest) ? this : false);
  };

  /* eslint-disable no-param-reassign */
  const hashPassword = async (user) => {
    user.email = user.email.toLowerCase();
    const hash = await bcrypt.hash(user.password, 10);
    user.password_digest = hash;
  };

  User.beforeCreate(async (user) => { await hashPassword(user); });
  User.beforeUpdate(async (user) => { await hashPassword(user); });
  /* eslint-enable no-param-reassign */

  return User;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define(
    "Business",
    {
      ownerId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zipCode: DataTypes.STRING,
    },
    {}
  );
  Business.associate = function (models) {
    // associations can be defined here
    Business.belongsTo(models.User, { foreignKey: "ownerId" });
    Business.hasMany(models.Review, { foreignKey: "businessId", onDelete: "cascade", hooks: true });
  };
  return Business;
};

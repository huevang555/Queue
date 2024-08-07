const Sequelize= require('sequelize');

const sequelize = new Sequelize('bookingqueue', 'root', '', {
	host: '127.0.0.1',
	dialect: 'mysql',
	define: {
		timestamps: false // Disable timestamps for all tables
	},
	logging: false
});
sequelize.authenticate()
	.then(() => {
		console.log('Connected to MySQL database!');
	})
	.catch((err) => {
		console.error('Error connecting to MySQL database: ', err);
	});
    const Historybooking = sequelize.define('historybooking', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        customername: Sequelize.STRING,
        phonenumber: Sequelize.STRING,
        date: {
            type: Sequelize.DATE,
            allowNull: false
          },
      });
      
      const Booking = sequelize.define('booking', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        customername: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phonenumber: Sequelize.STRING,
        sdate: {
            type: Sequelize.DATE,
            allowNull: false
          },
          edate: {
            type: Sequelize.DATE,
            allowNull: false
          },
          status: Sequelize.STRING,
          queuenumber: Sequelize.INTEGER,
          id: {
            type: Sequelize.INTEGER,
            references: {
                model: Branch,
                key: 'id'
            }
        },
      });
      const Branch = sequelize.define('historybooking', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
       
        branchname: Sequelize.STRING,
      });
      
      sequelize.sync();
      
      module.exports = {
        sequelize,
        Historybooking,
        Booking,
        Branch
      };
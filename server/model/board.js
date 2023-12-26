function board(sequelize, DataTypes) {
    return sequelize.define(
        'board', {
            boardId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            stars: {
                type: DataTypes.INTEGER, 
            },
            email: {
                type: DataTypes.STRING(50), 
                allowNull: false,
            },
            writtenBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "member",
                    key: 'memberId',
                },
                onDelete: 'CASCADE',
            },
            category: {
                type: DataTypes.STRING(50)
            },
            isOnMarket: {
                type: DataTypes.ENUM('yes', 'no'),
            }
        },{
            tableName: 'board',
            freezeTableName: true,
            timestamps: true,
        }
    )
}

module.exports = board;
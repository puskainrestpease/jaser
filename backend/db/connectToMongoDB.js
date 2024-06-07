import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("Подкючился к манго ДБ");
	} catch (error) {
		console.log("Ошибка подключения к манго дб", error.message);
	}
};

export default connectToMongoDB;

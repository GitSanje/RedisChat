import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
    clientId: "chatRedis",
    brokers: ['192.168.18.8:9092'] , // kafka server
    logLevel: logLevel.ERROR
    
})

export const admin = kafka.admin();

export const adminInit = async () => {
    try {
        // Connect admin
        await admin.connect();
        console.log("Kafka Admin connected");

        // Ensure the topic exists
        const topics = await admin.listTopics();
        if (!topics.includes("chats")) {
            await admin.createTopics({
                topics: [
                    {
                        topic: "chats",
                        numPartitions: 1,
                    },
                ],
            });
            console.log("Topic 'chats' created successfully");
        } else {
            console.log("Topic 'chats' already exists");
        }
    } catch (error) {
        console.error("Error in Kafka Admin initialization:", error);
    } finally {
        await admin.disconnect();
        console.log("Kafka Admin disconnected");
    }
};

export const producer = kafka.producer();

export const consumer = kafka.consumer({ groupId:"chats"});

export const connectKafkaProducer = async () => {
    await producer.connect();
  console.log("Kafka Producer connected...");
}
import { producer,consumer } from "./config/kafka.config.js"
import prisma from "./config/db.config.js";


export const produceMessage = async ( topic:string,  message:any) => {
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(message)}],
    })
}

export const consumeMessages = async (topic: string) => {
    await consumer.connect();
  await consumer.subscribe({ topic: topic , fromBeginning:true});

  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
        const data = JSON.parse(message.value.toString());
        console.log({
            partition,
            offset: message.offset,
            value: data,
          },data,message);
          await prisma.chats.create({
            data: data,
          });
    }
  })
}
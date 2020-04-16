// Kafka configuration
var kafka = require('kafka-node')

var Producer = kafka.Producer
// instantiate client with as connectstring host:port for  the ZooKeeper for the Kafka cluster
const client = new kafka.KafkaClient();
producer = new Producer(client)

module.exports = producer
# nest-kafka-microservices

## How to run

Pull images from docker registery and run

```
git clone https://github.com/hsn0najafi/nest-kafka-microservices
```

```
cd nest-kafka-microservices
```

```
cp -r auth/.env.sample auth/.env
```

```
cp -r core/.env.sample core/.env
```

```
docker compose up --scale auth=4
```

Each member of a consumer group, consumes from a unique set of Kafka topic's partitions.
</br>
we have to create x partition for every topic.
</br>
x = consumers count in a kafka consumer group.
</br>
by default this bashScript creates 4 parition for every topic.

```
bash create-topics.sh
```

## How to use

Swagger documentation is avalibale here

```
localhost:3000/docs
```

## Additional notes

When a new consumer joins to consumer group, maybe it takes time to rebalance.
</br>
and when one of consumers goes off group rebalances again and works with current online consumers (Auth Microservice).

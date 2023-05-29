#!/bin/bash

docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --topic register        --partitions 4 --create --replication-factor 1 --if-not-exists'
docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --topic login           --partitions 4 --create --replication-factor 1 --if-not-exists'
docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --topic isAuthenticated --partitions 4 --create --replication-factor 1 --if-not-exists'
docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --topic me              --partitions 4 --create --replication-factor 1 --if-not-exists'

docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --topic register        --partitions 4 --alter'
docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --topic login           --partitions 4 --alter'
docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --topic isAuthenticated --partitions 4 --alter'
docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --topic me              --partitions 4 --alter'

docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --topic register        --describe'
docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --topic login           --describe'
docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --topic isAuthenticated --describe'
docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --topic me              --describe'

docker exec -it kafka /bin/bash -c 'kafka-topics --bootstrap-server 0.0.0.0:9092 --list'

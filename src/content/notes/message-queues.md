---
title: Message Queues
publishDate: 2024-11-21
---

# Message Queues

## Why use message queues?

[When to use/avoid queuing services like RabbitMQ or SQS?](https://www.reddit.com/r/node/comments/s7ytz0/when_to_useavoid_queuing_services_like_rabbitmq/)

Queues are mostly used between backend components, and not so much between frontend-backend.

Typically in larger organisations the individual microservices are developed by different teams, with their own scaling rules and resilience plans.

If one service needs to use another, it could overload it with tasks, and that other service may be unaware of the load placed upon them and not have scaled appropriately. Having a queue in between means that one can fire tasks into it, while the other can consume them at the rate that it can handle. Then when the other team sees the increased demand they can scale appropriately as they need to.

Similarly, as you note, the second service may be unavailable for any reason (network hiccups, downtime, actual problems) and having the queue in the middle means that the tasks or data isn't lost - it will remain there waiting until the service comes back. It also leaves the original service to keep processing tasks where it can.

Of course, queues can only get so large - so the system works as long as any issues are fixed before the queue's can no longer handle additional messages.

## Message Queues vs Event Streams

[Message Queues vs Event Streams in System Design](https://www.geeksforgeeks.org/message-queues-vs-event-streams-in-system-design/)

Functional differences:

- Primary use case: Message queues are for task distribution and asynchronous communication, while event streams is for real-time data processing and event-driven architectures
- Ordering: Message queues ensure order of messages within a single queue, while event streams may not ensure order within a partition or stream, but may not guarantee global order.
- Consumer model: Messages are consumed by one consumer and removed from the queue VS events are consumed by multiple subscribers and the stream remains available for replay
- Persistence: Messages are often persisted until they are consumed or expired, while events are typically persisted as part of an immutable log.
- Replay capability: Messages are gone once consumed, while events are designed for replay, that they can be re-read or processed from the beginning of the stream.
- Scalability: Adding more queues or consumers VS partitioning the stream and distributing it across multiple consumers

Use case of message queues:

- Background Job Processing
- Task scheduling
- Order processing systems
- Micro-services communication

Use case of event streams:

- Real-time analytics
- Event sourcing
- Log aggregation
- Fraud detection

## Message queues vs pub-sub

These are not mutually exclusive. Queues are for processing messages. Pub-sub is for broadcasting. [discussion](https://www.reddit.com/r/ExperiencedDevs/comments/1f4v3lj/comment/lkogsqh/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

Pub-sub is more about the sender than the recipient. Use pub/sub anywhere that:

- Events can have zero or more consumers
- Producer doesn't need to know anything about consumers, or even if it has consumers at all (for example, as a mechanism for insulating components from details of neighboring components)
- Processing outcomes don't matter (to the producer)

Queues are more about the recipient. Use them where:

- Processing success or failure matters
- Processing order matters
- Guaranteed delivery matters (e.g. at-least-once, at-most-once, exactly-once)
- The most-immediate sender of a message is not important (as in the machine or process that is literally transmitting the messages into to queue that the processor is working. Kafka message brokers are often not the same machine which originally received a message broadcast, for example)

When not to use pub-sub? When you want to spread the messages between multiple consumers, but each message be delivered to only one consumer, kind of like a load balancing. It could not be done by pub-sub.

## Real world examples

[What are some use cases for message queues in real life, and what are some architectures that achieve the same goal without using queues explicitly?](https://www.quora.com/What-are-some-use-cases-for-message-queues-in-real-life-and-what-are-some-architectures-that-achieve-the-same-goal-without-using-queues-explicitly)
Any time you have a task to do that is not part of the base task the user is having on your website. Here's a few examples of what this could mean:

- Picture resize: your user uploads pictures to your website. They need to be resized, or maybe you need to create thumbnails of those to show a preview somewhere. The user does not "care" about this, he has finished uploading his stuff, he should not have to wait for you to process them before having a response. So you queue that task to somewhere else. The result of the resizing task does not impact the response (meaning that on the contrary, validating that a pdf doc does not contain profanity before accepting it, should not be done in a queue because you need that info to generate your response).
- Video encoding: if you're building Youtube, you probably are not going to ask your user to wait until his video has been converted from avi to flash / x264 / webM before telling him his file was uploaded correctly.
- Sending emails
- Search engine indexing: say you're building a CRM, your user modifies the info of a client company. That the info is correctly saved in DB is enough to send a reply to the user. Integrating that new info in your search engine index can happen minutes later without it being an issue.
- Pushing a tweet: if your user has set that his account on your app (let's say a blog engine) has to be integrated with his twitter account, if his blog post has been saved and published, it's enough for you to tell him "everything went fine", and then put the tweet to be sent in a message queue so an other server will do that. Here it's no big deal if you run your blogs as single instances, but if this is part of the response generation, then what happens when twitter is down? Can you still save your post? If yes, then the tweet won't be sent... If it's in a message queue, even with twitter down (or you exceeding your twitter api limit), the message will stay there until it can actually be consumed. Also if your blog platform becomes the next tumblr, you'll have so many tweets to send that it's going to become a big deal and you'll need to completely have it separated from the base app.

So any time something is not part of the most basic transaction the user is trying to do, and the result does not impact the response you're sending to the user, there is a potential use case for a message queue!

UPDATE: I didn't see the second part of the question at first. For sending emails in the app we're building, the basic info regarding the email to be sent is saved into DB, then every X amount of time, we check the DB for new records and send emails accordingly. Doing it this way allows us to do some grouping of emails. For example if say a contract has been created for company XYZ, then the services A and B were added to that contract. Then later in the afternoon, B was removed and C was added. Then it went from a "proposal" contract to a "request for quotation". The guy who needs to approve it and decided to receive updates only once a day does not want to receive notifications about each of those steps. So having a DB where you'll store maybe the contract's id will allow you to group these, where on the opposite a message queue usually won't.

UPDATE 2:
Just read an article this morning that tells how it works in the case of Twitter for example.
When you connect to your twitter timeline, the timeline is not built everytime you connect by querying the tweets from people you were following and sorting them by time of tweet as this would not be efficient for response time.
Instead what they do is everytime someone posts a tweet, they will write this tweet to the timelines of all the followers. Timelines are kept in cache and this way they are always pre-built and available without much computing (less efficient on the storage side, more efficient on the computing needs side).

Now if you consider a user with about 1 million followers, that person does not want to wait until twitter has finished saving his tweet 1 million times. Therefore a message queue is used. Like a big pipe sending to different servers that "this tweet just happened, need to update the appropriate timelines now". The process could take half a millisecond or a minute, there would be no difference for the person who sent the tweet. The only person this could make a difference to are the 1 million followers because some of them will have the new tweet pushed to their timelines before others.

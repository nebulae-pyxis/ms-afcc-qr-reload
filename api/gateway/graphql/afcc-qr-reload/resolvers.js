const withFilter = require("graphql-subscriptions").withFilter;
const PubSub = require("graphql-subscriptions").PubSub;
const pubsub = new PubSub();
const Rx = require("rxjs");
const broker = require("../../broker/BrokerFactory")();
const superagent = require('superagent');

function getResponseFromBackEnd$(response) {
    return Rx.Observable.of(response)
        .map(resp => {
            if (resp.result.code != 200) {
                const err = new Error();
                err.name = 'Error';
                err.message = resp.result.error;
                // this[Symbol()] = resp.result.error;
                Error.captureStackTrace(err, 'Error');
                throw err;
            }
            return resp.data;
        });
}


module.exports = {

    //// QUERY ///////

    Query: {
        getSamData(root, args, context) {
            const timestamp = parseInt(new Date().getTime()/1000)
            return Rx.Observable.of(args)
                .mergeMap(data => {
                    return Rx.Observable.defer(() => {
                        const cardId = data.cardId;
                        const id = (Math.floor(Math.random() * (9000 - 0)) + 0);
                        return superagent
                            .post('http://websam.default.svc.cluster.local:8000/recharge/' + id)
                            .send({ "id":  id, "timestamp": timestamp, 
                            "tagid": parseInt(cardId), "value": args.value })
                            .set('accept', 'json')
                    })
                })
                .map(result => JSON.parse(result.res.text))
                .do(logTest => console.log('llega del del rest: ',logTest))
                .toPromise();
                //*/
            /*
                return Rx.Observable.of({id: args.cardId,
                    timeStamp: 1537601970000,
                    value: args.value,
                    tagId: 4334535,
                    sign: "00112233445566778899AABBCCDDEEFF"
                })
                    .toPromise();
                    */
        }
    },

    //// MUTATIONS ///////


    //// SUBSCRIPTIONS ///////
};



//// SUBSCRIPTIONS SOURCES ////

const eventDescriptors = [
    {
        backendEventName: 'AfccQrReloadHelloWorldEvent',
        gqlSubscriptionName: 'AfccQrReloadHelloWorldSubscription',
        dataExtractor: (evt) => evt.data,// OPTIONAL, only use if needed
        onError: (error, descriptor) => console.log(`Error processing ${descriptor.backendEventName}`),// OPTIONAL, only use if needed
        onEvent: (evt, descriptor) => console.log(`Event of type  ${descriptor.backendEventName} arraived`),// OPTIONAL, only use if needed
    },
];


/**
 * Connects every backend event to the right GQL subscription
 */
eventDescriptors.forEach(descriptor => {
    broker
        .getMaterializedViewsUpdates$([descriptor.backendEventName])
        .subscribe(
            evt => {
                if (descriptor.onEvent) {
                    descriptor.onEvent(evt, descriptor);
                }
                const payload = {};
                payload[descriptor.gqlSubscriptionName] = descriptor.dataExtractor ? descriptor.dataExtractor(evt) : evt.data
                pubsub.publish(descriptor.gqlSubscriptionName, payload);
            },

            error => {
                if (descriptor.onError) {
                    descriptor.onError(error, descriptor);
                }
                console.error(
                    `Error listening ${descriptor.gqlSubscriptionName}`,
                    error
                );
            },

            () =>
                console.log(
                    `${descriptor.gqlSubscriptionName} listener STOPED`
                )
        );
});

